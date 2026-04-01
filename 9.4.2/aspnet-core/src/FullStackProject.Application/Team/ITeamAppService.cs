using System.Threading.Tasks;
using Abp.Application.Services;

namespace FullStackProject.Team
{
    public interface ITeamAppService : IApplicationService
    {
        /// <summary>Returns true if the current user has the Admin role in their tenant.</summary>
        Task<bool> IsAdminAsync();

        /// <summary>Grants the Admin role to the specified user. Caller must be an admin.</summary>
        Task MakeAdminAsync(long userId);

        /// <summary>Removes the specified user from the tenant. Caller must be an admin and cannot delete themselves.</summary>
        Task DeleteTenantUserAsync(long userId);
    }
}
