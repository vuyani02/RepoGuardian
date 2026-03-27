using System;

namespace FullStackProject.RepoGuardian.Dto
{
    public class RecommendationDto
    {
        public Guid RuleResultId { get; set; }
        public string IssueDescription { get; set; }
        public string Explanation { get; set; }
        public string SuggestedFix { get; set; }
    }
}
