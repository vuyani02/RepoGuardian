using System;
using System.Collections.Generic;
using System.Linq;
using Abp.Dependency;
using Castle.Core.Logging;
using FullStackProject.Domains.RepoGuardian;

namespace FullStackProject.RepoGuardian.Rules
{
    /// <summary>
    /// Evaluates a set of best-practice rules against a repository's file tree.
    /// Each rule checks for the presence or absence of specific files/patterns.
    /// </summary>
    public class RuleEngine : ITransientDependency
    {
        public ILogger Logger { get; set; } = NullLogger.Instance;

        /// <summary>
        /// Runs all best-practice rules against the provided file paths and returns a result per rule.
        /// </summary>
        public List<RuleResult> Evaluate(Guid scanRunId, List<string> filePaths)
        {
            var paths = filePaths.Select(p => p.ToLowerInvariant()).ToList();

            return new List<RuleResult>
            {
                // ── Documentation ────────────────────────────────────────────
                Check(scanRunId, "DOC_001", "README exists", RuleCategory.Documentation,
                    paths.Any(p => p == "readme.md" || p == "readme.txt" || p == "readme"
                                   || p.EndsWith("/readme.md") || p.EndsWith("/readme.txt"))),

                Check(scanRunId, "DOC_002", "LICENSE exists", RuleCategory.Documentation,
                    paths.Any(p => p == "license" || p == "license.md" || p == "license.txt"
                                   || p.EndsWith("/license") || p.EndsWith("/license.md") || p.EndsWith("/license.txt"))),
            };
        }

        private static RuleResult Check(Guid scanRunId, string ruleId, string ruleName, RuleCategory category, bool passed)
        {
            return new RuleResult
            {
                ScanRunId = scanRunId,
                RuleId = ruleId,
                RuleName = ruleName,
                Category = category,
                Passed = passed,
                Details = passed ? $"{ruleName} detected." : $"{ruleName} not found."
            };
        }
    }
}
