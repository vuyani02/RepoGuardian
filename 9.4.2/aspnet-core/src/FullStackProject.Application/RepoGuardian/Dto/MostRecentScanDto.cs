using System;

namespace FullStackProject.RepoGuardian.Dto
{
    /// <summary>Summary of the most recently completed scan run.</summary>
    public class MostRecentScanDto
    {
        /// <summary>Display name of the repository that was scanned.</summary>
        public string RepositoryName { get; set; }

        /// <summary>GitHub owner (org or user) of the repository.</summary>
        public string Owner { get; set; }

        /// <summary>UTC timestamp when the scan was triggered.</summary>
        public DateTime TriggeredAt { get; set; }

        /// <summary>Overall compliance score of this scan, if completed.</summary>
        public double? OverallScore { get; set; }
    }
}
