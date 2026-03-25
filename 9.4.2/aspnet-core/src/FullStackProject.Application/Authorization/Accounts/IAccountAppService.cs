using System.Threading.Tasks;
using Abp.Application.Services;
using FullStackProject.Authorization.Accounts.Dto;

namespace FullStackProject.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
