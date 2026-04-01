using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using FullStackProject.Authorization.Users;

namespace FullStackProject.Domains.RepoGuardian
{
    /// <summary>Represents a GitHub repository registered by a tenant for compliance scanning.</summary>
    public class GithubRepository : FullAuditedEntity<System.Guid>, IMustHaveTenant
    {
        public int TenantId { get; set; }

        /// <summary>The user who registered this repository. Kept for audit purposes only.</summary>
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
