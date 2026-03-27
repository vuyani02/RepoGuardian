using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using FullStackProject.Authorization.Users;

namespace FullStackProject.Domains.RepoGuardian
{
    public class GithubRepository : FullAuditedEntity<System.Guid>
    {
        public long UserId { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }

        [Required]
        [MaxLength(500)]
        public string GithubUrl { get; set; }

        [Required]
        [MaxLength(200)]
        public string Name { get; set; }

        [Required]
        [MaxLength(200)]
        public string Owner { get; set; }
    }
}
