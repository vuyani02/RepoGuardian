using System;

namespace FullStackProject.RepoGuardian.Dto
{
    /// <summary>Lightweight scan record for the Scans page list — no rule results or recommendations.</summary>
    public class ScanSummaryDto
    {
        public Guid ScanRunId { get; set; }
        public Guid RepositoryId { get; set; }
        public string RepositoryName { get; set; }
        public string Owner { get; set; }
        public string Status { get; set; }
        public int? OverallScore { get; set; }
        public DateTime TriggeredAt { get; set; }
        public DateTime? CompletedAt { get; set; }
        public string Branch { get; set; }
    }
}
