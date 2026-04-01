using System.ComponentModel.DataAnnotations;
using Abp.Domain.Entities;

namespace FullStackProject.Domains.RepoGuardian
{
    /// <summary>
    /// Static definition of a compliance rule including AI-generated educational content.
    /// Seeded once at deployment; shared across all tenants.
    /// </summary>
    public class RuleDefinition : Entity<string>
    {
        /// <summary>Unique rule identifier, e.g. "DOC_001". Stored in the Id column mapped to RuleId.</summary>
        public string RuleId => Id;

        [Required]
        [MaxLength(200)]
        public string RuleName { get; set; }

        public RuleCategory Category { get; set; }

        /// <summary>AI-generated: one sentence describing what this rule checks for.</summary>
        [Required]
        [MaxLength(1000)]
        public string WhatIsIt { get; set; }

        /// <summary>AI-generated: why this rule matters for a healthy repository.</summary>
        [Required]
        [MaxLength(2000)]
        public string WhyItMatters { get; set; }

        /// <summary>AI-generated: concrete steps to satisfy this rule.</summary>
        [Required]
        [MaxLength(2000)]
        public string HowToAdd { get; set; }
    }
}
