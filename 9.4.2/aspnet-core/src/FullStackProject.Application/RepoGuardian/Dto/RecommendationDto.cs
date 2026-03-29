using System;

namespace FullStackProject.RepoGuardian.Dto
{
    public class RecommendationDto
    {
        public Guid RuleResultId { get; set; }
        /// <summary>Short rule identifier (e.g. SEC_003) — included so the frontend can label recommendations without a separate join.</summary>
        public string RuleId { get; set; }
        public string IssueDescription { get; set; }
        public string Explanation { get; set; }
        public string SuggestedFix { get; set; }
    }
}
