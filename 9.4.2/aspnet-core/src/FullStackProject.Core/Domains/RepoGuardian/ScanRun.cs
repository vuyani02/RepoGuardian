using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace FullStackProject.Domains.RepoGuardian
{
    /// <summary>Represents a single scan execution against a GitHub repository.</summary>
    public class ScanRun : FullAuditedEntity<Guid>, IMustHaveTenant
    {
        public int TenantId { get; set; }

        public Guid RepositoryId { get; set; }

        [ForeignKey("RepositoryId")]
        public GithubRepository Repository { get; set; }

        public ScanRunStatus Status { get; set; }

        public DateTime TriggeredAt { get; set; }

        public DateTime? CompletedAt { get; set; }

        [MaxLength(1000)]
        public string ErrorMessage { get; set; }

        public int? OverallScore { get; set; }

        /// <summary>Branch that was scanned. Null for scans created before branch selection was introduced.</summary>
        [MaxLength(250)]
        public string Branch { get; set; }
    }
}
