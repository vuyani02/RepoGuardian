using System.Threading.Tasks;
using Abp.Configuration;
using Abp.Domain.Uow;
using Abp.UI;
using Abp.Zero.Configuration;
using FullStackProject.Authorization.Accounts.Dto;
using FullStackProject.Authorization.Users;
using FullStackProject.MultiTenancy;

namespace FullStackProject.Authorization.Accounts
{
    /// <summary>Handles public account operations: tenant availability check and self-service registration.</summary>
    public class AccountAppService : FullStackProjectAppServiceBase, IAccountAppService
    {
        private readonly UserRegistrationManager _userRegistrationManager;
        private readonly IUnitOfWorkManager _unitOfWorkManager;

        public AccountAppService(
            UserRegistrationManager userRegistrationManager,
            IUnitOfWorkManager unitOfWorkManager)
        {
            _userRegistrationManager = userRegistrationManager;
            _unitOfWorkManager = unitOfWorkManager;
        }

        /// <summary>Checks whether a tenancy name is available and active.</summary>
        public async Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input)
        {
            var tenant = await TenantManager.FindByTenancyNameAsync(input.TenancyName);
            if (tenant == null)
                return new IsTenantAvailableOutput(TenantAvailabilityState.NotFound);

            if (!tenant.IsActive)
                return new IsTenantAvailableOutput(TenantAvailabilityState.InActive);

            return new IsTenantAvailableOutput(TenantAvailabilityState.Available, tenant.Id);
        }

        /// <summary>
        /// Registers a new user, creating or joining a tenant based on TeamAction.
        /// Runs tenant creation in host context (TenantId = null), then switches to
        /// the resolved tenant context before creating the user.
        /// </summary>
        public async Task<RegisterOutput> Register(RegisterInput input)
        {
            var tenantId = await ResolveOrCreateTenantAsync(input.TeamAction, input.TeamName);

            using (_unitOfWorkManager.Current.SetTenantId(tenantId))
            {
                var user = await _userRegistrationManager.RegisterAsync(
                    input.Name,
                    input.Surname,
                    input.EmailAddress,
                    input.UserName,
                    input.Password,
                    true
                );

                var requireConfirmation = await SettingManager.GetSettingValueAsync<bool>(
                    AbpZeroSettingNames.UserManagement.IsEmailConfirmationRequiredForLogin);

                return new RegisterOutput
                {
                    CanLogin = user.IsActive && (user.IsEmailConfirmed || !requireConfirmation)
                };
            }
        }

        /// <summary>
        /// Returns the TenantId to register under.
        /// For "create": creates a new tenant with the given name (runs as host).
        /// For "join": looks up an existing active tenant by name.
        /// </summary>
        private async Task<int> ResolveOrCreateTenantAsync(string teamAction, string teamName)
        {
            // Normalise to a valid ABP tenancy name: lowercase, alphanumeric + hyphens only.
            var tenancyName = teamName.Trim().ToLowerInvariant().Replace(" ", "-");

            using (_unitOfWorkManager.Current.SetTenantId(null))
            {
                if (teamAction == "create")
                    return await CreateTenantAsync(tenancyName, teamName.Trim());

                return await JoinTenantAsync(tenancyName);
            }
        }

        private async Task<int> CreateTenantAsync(string tenancyName, string displayName)
        {
            var existing = await TenantManager.FindByTenancyNameAsync(tenancyName);
            if (existing != null)
                throw new UserFriendlyException("A team with that name already exists. Please choose a different name or join the existing team.");

            var tenant = new Tenant(tenancyName, displayName);
            await TenantManager.CreateAsync(tenant);
            await CurrentUnitOfWork.SaveChangesAsync();

            return tenant.Id;
        }

        private async Task<int> JoinTenantAsync(string tenancyName)
        {
            var tenant = await TenantManager.FindByTenancyNameAsync(tenancyName);
            if (tenant == null)
                throw new UserFriendlyException("No team with that name was found. Check the name or create a new team.");

            if (!tenant.IsActive)
                throw new UserFriendlyException("That team's account is inactive. Please contact your team admin.");

            return tenant.Id;
        }
    }
}
