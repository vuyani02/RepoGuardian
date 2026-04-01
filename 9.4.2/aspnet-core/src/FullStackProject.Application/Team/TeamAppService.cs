using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.UI;
using FullStackProject.Authorization.Roles;
using FullStackProject.Authorization.Users;

namespace FullStackProject.Team
{
    /// <summary>Handles team administration: role promotion and user removal.</summary>
    [AbpAuthorize]
    public class TeamAppService : FullStackProjectAppServiceBase, ITeamAppService
    {
        private readonly IRepository<User, long> _userRepo;

        public RoleManager RoleManager { get; set; }

        public TeamAppService(IRepository<User, long> userRepo)
        {
            _userRepo = userRepo;
        }

        /// <summary>Returns true if the current user has the Admin role in their tenant.</summary>
        public async Task<bool> IsAdminAsync()
        {
            var user = await GetCurrentUserAsync();
            return await UserManager.IsInRoleAsync(user, StaticRoleNames.Tenants.Admin);
        }

        /// <summary>Grants the Admin role to the specified tenant user. Caller must already be an admin.</summary>
        public async Task MakeAdminAsync(long userId)
        {
            await RequireAdminAsync();

            var target = await GetTenantUserOrThrowAsync(userId);
            if (await UserManager.IsInRoleAsync(target, StaticRoleNames.Tenants.Admin))
                return;

            // Tenants created before the role-feature was introduced may not have the Admin role row yet.
            var adminRole = await RoleManager.FindByNameAsync(StaticRoleNames.Tenants.Admin);
            if (adminRole == null)
                CheckErrors(await RoleManager.CreateAsync(new Role(AbpSession.TenantId, StaticRoleNames.Tenants.Admin, StaticRoleNames.Tenants.Admin) { IsStatic = true }));

            CheckErrors(await UserManager.AddToRoleAsync(target, StaticRoleNames.Tenants.Admin));
        }

        /// <summary>Permanently removes the specified user from the tenant. Caller must be an admin and cannot remove themselves.</summary>
        public async Task DeleteTenantUserAsync(long userId)
        {
            await RequireAdminAsync();

            if (AbpSession.UserId == userId)
                throw new UserFriendlyException("You cannot delete your own account.");

            var target = await GetTenantUserOrThrowAsync(userId);
            CheckErrors(await UserManager.DeleteAsync(target));
        }

        #region Helpers

        private async Task RequireAdminAsync()
        {
            var caller = await GetCurrentUserAsync();
            if (!await UserManager.IsInRoleAsync(caller, StaticRoleNames.Tenants.Admin))
                throw new AbpAuthorizationException("Only team admins can perform this action.");
        }

        private async Task<User> GetTenantUserOrThrowAsync(long userId)
        {
            var user = await _userRepo.FirstOrDefaultAsync(u => u.Id == userId && u.TenantId == AbpSession.TenantId);
            if (user == null)
                throw new UserFriendlyException("User not found.");
            return user;
        }

        #endregion
    }
}
