using System.Collections.Generic;

namespace FullStackProject.RepoGuardian.Dto
{
    /// <summary>Aggregated statistics shown on the dashboard for the current tenant.</summary>
    public class DashboardStatsDto
    {
        /// <summary>Total number of repositories registered under this tenant.</summary>
        public int TotalRepositories { get; set; }

        /// <summary>Total number of scan runs triggered under this tenant.</summary>
        public int TotalScans { get; set; }

        /// <summary>
        /// Average overall compliance score across all completed scans.
        /// Null when no completed scans exist yet.
        /// </summary>
        public double? AverageComplianceScore { get; set; }

        /// <summary>Per-category average scores across the filtered scans.</summary>
        public List<CategoryAverageDto> CategoryAverages { get; set; } = new();

        /// <summary>Number of repositories whose latest completed scan scored below the passing threshold.</summary>
        public int ReposBelowThreshold { get; set; }

        /// <summary>The most recently triggered scan run, or null if no scans exist.</summary>
        public MostRecentScanDto MostRecentScan { get; set; }

        /// <summary>The rule that failed most often across the filtered scans, or null if no failures exist.</summary>
        public MostFailingRuleDto MostFailingRule { get; set; }

        /// <summary>
        /// Daily average compliance scores for the trend chart.
        /// Each entry represents one calendar day; only days where at least one repo has a known score are included.
        /// </summary>
        public List<DailyAverageDto> TrendData { get; set; } = new();
    }
}
