using System.Linq;
using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Domain.Repositories;
using FullStackProject.Authorization.Users;
using FullStackProject.UserProfile.Dto;

namespace FullStackProject.UserProfile
{
    /// <summary>
    /// Returns profile information for the currently authenticated user and their team.
    /// </summary>
    [AbpAuthorize]
    public class ProfileAppService : FullStackProjectAppServiceBase, IProfileAppService
    {
        private readonly IRepository<User, long> _userRepository;

        public ProfileAppService(IRepository<User, long> userRepository)
        {
            _userRepository = userRepository;
        }

        /// <summary>Returns the current user's details, team name, and all team members.</summary>
        public async Task<ProfileDto> GetProfileAsync()
        {
            var currentUser = await GetCurrentUserAsync();
            var tenant = await GetCurrentTenantAsync();

            var allUsers = await _userRepository.GetAllListAsync(u => u.TenantId == AbpSession.TenantId);

            return new ProfileDto
            {
                User = new UserProfileDto
                {
                    Id = currentUser.Id,
                    Name = currentUser.Name,
                    Surname = currentUser.Surname,
                    UserName = currentUser.UserName,
                    EmailAddress = currentUser.EmailAddress
                },
                TeamName = tenant.Name,
                TeamMembers = allUsers
                    .Select(u => new TeamMemberDto
                    {
                        Id = u.Id,
                        Name = u.Name,
                        Surname = u.Surname,
                        UserName = u.UserName,
                        EmailAddress = u.EmailAddress,
                        JoinedAt = u.CreationTime
                    })
                    .OrderBy(m => m.Name)
                    .ToList()
            };
        }
    }
}
