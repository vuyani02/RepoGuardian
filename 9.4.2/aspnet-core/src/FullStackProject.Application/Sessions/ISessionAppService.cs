using System.Threading.Tasks;
using Abp.Application.Services;
using FullStackProject.Sessions.Dto;

namespace FullStackProject.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
