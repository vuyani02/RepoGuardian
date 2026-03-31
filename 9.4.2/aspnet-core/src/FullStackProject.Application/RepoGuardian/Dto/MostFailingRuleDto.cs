namespace FullStackProject.RepoGuardian.Dto
{
    /// <summary>The rule that failed most often across the filtered scan runs.</summary>
    public class MostFailingRuleDto
    {
        /// <summary>Machine-readable rule identifier (e.g. "DOC_001").</summary>
        public string RuleId { get; set; }

        /// <summary>Human-readable rule name (e.g. "README exists").</summary>
        public string RuleName { get; set; }

        /// <summary>Number of times this rule failed across the filtered scans.</summary>
        public int FailCount { get; set; }
    }
}
