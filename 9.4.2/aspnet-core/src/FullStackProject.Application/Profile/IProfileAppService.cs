using System.Threading.Tasks;
using Abp.Application.Services;
using FullStackProject.UserProfile.Dto;

namespace FullStackProject.UserProfile
{
    public interface IProfileAppService : IApplicationService
    {
        /// <summary>Returns the current user's details, team name, and all team members.</summary>
        Task<ProfileDto> GetProfileAsync();
    }
}
