namespace FullStackProject.RepoGuardian.Dto
{
    /// <summary>Represents a compliance rule definition together with its active status for the current tenant.</summary>
    public class RuleDefinitionDto
    {
        public string RuleId { get; set; }
        public string RuleName { get; set; }
        public string Category { get; set; }
        public string WhatIsIt { get; set; }
        public string WhyItMatters { get; set; }
        public string HowToAdd { get; set; }
        public bool IsActive { get; set; }
    }
}
