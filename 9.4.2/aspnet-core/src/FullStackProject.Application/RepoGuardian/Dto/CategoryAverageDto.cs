namespace FullStackProject.RepoGuardian.Dto
{
    /// <summary>Average compliance score for a single rule category across the filtered scans.</summary>
    public class CategoryAverageDto
    {
        public string Category { get; set; }
        public double AverageScore { get; set; }
    }
}
