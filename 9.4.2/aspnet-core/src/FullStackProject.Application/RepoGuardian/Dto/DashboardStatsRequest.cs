namespace FullStackProject.RepoGuardian.Dto
{
    /// <summary>Filter parameters for the dashboard stats endpoint.</summary>
    public class DashboardStatsRequest
    {
        /// <summary>
        /// Limits scans to those triggered within the last N days.
        /// Null means no date restriction (all time).
        /// </summary>
        public int? DaysBack { get; set; } = 7;

        /// <summary>
        /// When true, only the most recent scan per repository is included.
        /// When false, every scan run is included.
        /// Defaults to true.
        /// </summary>
        public bool LatestPerRepo { get; set; } = true;

        /// <summary>
        /// When true (default), only scans on the main or master branch are included.
        /// When false, scans on all branches are included.
        /// </summary>
        public bool DefaultBranchOnly { get; set; } = true;
    }
}
