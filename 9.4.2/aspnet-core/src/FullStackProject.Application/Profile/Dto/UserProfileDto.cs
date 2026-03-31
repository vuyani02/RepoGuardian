namespace FullStackProject.UserProfile.Dto
{
    /// <summary>Basic details about the currently authenticated user.</summary>
    public class UserProfileDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string UserName { get; set; }
        public string EmailAddress { get; set; }
    }
}
