using System;

namespace FullStackProject.Profile.Dto
{
    /// <summary>A single member of the current tenant's team.</summary>
    public class TeamMemberDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string UserName { get; set; }
        public string EmailAddress { get; set; }
        public DateTime JoinedAt { get; set; }
    }
}
