using System.ComponentModel.DataAnnotations;

namespace FullStackProject.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}