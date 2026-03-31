namespace FullStackProject.RepoGuardian.Dto
{
    /// <summary>Average compliance score across all repos for a single calendar day.</summary>
    public class DailyAverageDto
    {
        /// <summary>Calendar date in ISO 8601 format (yyyy-MM-dd).</summary>
        public string Date { get; set; }

        /// <summary>Average of each repo's latest-known compliance score on this date.</summary>
        public double AverageScore { get; set; }
    }
}
