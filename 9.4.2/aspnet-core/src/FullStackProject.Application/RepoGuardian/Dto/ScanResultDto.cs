using System;
using System.Collections.Generic;

namespace FullStackProject.RepoGuardian.Dto
{
    public class ScanResultDto
    {
        public Guid ScanRunId { get; set; }
        public string Status { get; set; }
        public int? OverallScore { get; set; }
        public DateTime TriggeredAt { get; set; }
        public DateTime? CompletedAt { get; set; }
        public string ErrorMessage { get; set; }
        public List<ComplianceScoreDto> CategoryScores { get; set; } = new();
        public List<RuleResultDto> RuleResults { get; set; } = new();
        public List<RecommendationDto> Recommendations { get; set; } = new();
    }
}
