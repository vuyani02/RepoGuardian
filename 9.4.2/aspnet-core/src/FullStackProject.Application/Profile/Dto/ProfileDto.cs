using System.Collections.Generic;

namespace FullStackProject.UserProfile.Dto
{
    /// <summary>Full profile response: current user info, team name, and all team members.</summary>
    public class ProfileDto
    {
        public UserProfileDto User { get; set; }
        public string TeamName { get; set; }
        public List<TeamMemberDto> TeamMembers { get; set; }
        public bool CurrentUserIsAdmin { get; set; }
    }
}
