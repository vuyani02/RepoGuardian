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
            Logger.Debug($"RuleEngine: evaluating {filePaths.Count} paths for scan {scanRunId}");
            var paths = filePaths.Select(p => p.ToLowerInvariant()).ToList();

            return new List<RuleResult>
            {
                // ── Documentation ────────────────────────────────────────────
                Check(scanRunId, "DOC_001", "README", RuleCategory.Documentation,
                    paths.Any(p => p == "readme.md" || p == "readme.txt" || p == "readme"
                                   || p.EndsWith("/readme.md") || p.EndsWith("/readme.txt"))),

                Check(scanRunId, "DOC_002", "LICENSE", RuleCategory.Documentation,
                    paths.Any(p => p == "license" || p == "license.md" || p == "license.txt"
                                   || p.EndsWith("/license") || p.EndsWith("/license.md") || p.EndsWith("/license.txt"))),

                Check(scanRunId, "DOC_003", "CONTRIBUTING guide", RuleCategory.Documentation,
                    paths.Any(p => p.Contains("contributing"))),

                // ── Testing ───────────────────────────────────────────────────
                Check(scanRunId, "TEST_001", "Test files or test directory", RuleCategory.Testing,
                    paths.Any(p => p.Contains("/test/") || p.Contains("/tests/") || p.Contains("/__tests__/")
                                   || p.Contains(".test.") || p.Contains(".spec.")
                                   || p.StartsWith("test/") || p.StartsWith("tests/"))),

                // ── CI/CD ─────────────────────────────────────────────────────
                Check(scanRunId, "CICD_001", "CI/CD pipeline configuration", RuleCategory.CiCd,
                    paths.Any(p => p.StartsWith(".github/workflows/")
                                   || p.Contains(".gitlab-ci")
                                   || p.Contains("jenkinsfile")
                                   || p.StartsWith(".circleci/")
                                   || p.Contains("azure-pipelines")
                                   || p.Contains(".travis.yml"))),

                Check(scanRunId, "CICD_002", "Linting or formatting configuration", RuleCategory.CiCd,
                    paths.Any(p => p.Contains(".eslintrc") || p.Contains("eslint.config.")
                                   || p.Contains(".pylintrc") || p.Contains(".rubocop")
                                   || p.Contains(".editorconfig") || p.Contains("stylecop")
                                   || p.Contains(".flake8") || p.Contains("prettierrc")
                                   || p.Contains(".stylelintrc"))),

                // ── Dependencies ──────────────────────────────────────────────
                Check(scanRunId, "DEP_001", "Dependency lock file", RuleCategory.Dependencies,
                    paths.Any(p => p == "package-lock.json" || p.EndsWith("/package-lock.json")
                                   || p == "yarn.lock" || p.EndsWith("/yarn.lock")
                                   || p == "pipfile.lock" || p.EndsWith("/pipfile.lock")
                                   || p == "poetry.lock" || p.EndsWith("/poetry.lock")
                                   || p == "gemfile.lock" || p.EndsWith("/gemfile.lock")
                                   || p == "packages.lock.json" || p.EndsWith("/packages.lock.json")
                                   || p == "composer.lock" || p.EndsWith("/composer.lock"))),

                // ── Security ──────────────────────────────────────────────────
                Check(scanRunId, "SEC_001", ".gitignore", RuleCategory.Security,
                    paths.Any(p => p == ".gitignore" || p.EndsWith("/.gitignore"))),

                Check(scanRunId, "SEC_002", "No .env files committed", RuleCategory.Security,
                    !HasCommittedEnvFile(paths)),

                Check(scanRunId, "SEC_003", "Security policy or CODEOWNERS", RuleCategory.Security,
                    paths.Any(p => p.Contains("security.md") || p.Contains("codeowners"))),

                Check(scanRunId, "SEC_004", ".env.example documents environment variables", RuleCategory.Security,
                    paths.Any(p => p == ".env.example" || p.EndsWith("/.env.example")
                                   || p == ".env.sample" || p.EndsWith("/.env.sample")
                                   || p == ".env.template" || p.EndsWith("/.env.template"))),

                // ── Documentation (extended) ──────────────────────────────────
                Check(scanRunId, "DOC_004", "Changelog", RuleCategory.Documentation,
                    paths.Any(p => p.Contains("changelog"))),

                Check(scanRunId, "DOC_005", "Code of conduct", RuleCategory.Documentation,
                    paths.Any(p => p.Contains("code_of_conduct") || p.Contains("code-of-conduct"))),

                // ── Testing (extended) ────────────────────────────────────────
                Check(scanRunId, "TEST_002", "Test coverage configuration", RuleCategory.Testing,
                    paths.Any(p => p.Contains("codecov.yml") || p.Contains(".coveragerc")
                                   || p.Contains("jest.config.") || p.Contains("coverage.xml")
                                   || p.Contains(".nycrc") || p.Contains("coverlet"))),

                // ── CI/CD (extended) ──────────────────────────────────────────
                Check(scanRunId, "CICD_003", "Containerisation (Docker)", RuleCategory.CiCd,
                    paths.Any(p => p == "dockerfile" || p.EndsWith("/dockerfile")
                                   || p.Contains("docker-compose"))),

                Check(scanRunId, "CICD_004", "PR or issue templates", RuleCategory.CiCd,
                    paths.Any(p => p.Contains(".github/pull_request_template")
                                   || p.Contains(".github/issue_template")
                                   || p.Contains(".github/issuetemplate"))),

                // ── Dependencies (extended) ───────────────────────────────────
                Check(scanRunId, "DEP_002", "Dependency update automation", RuleCategory.Dependencies,
                    paths.Any(p => p.Contains(".github/dependabot.yml")
                                   || p.Contains("renovate.json") || p.Contains(".renovaterc"))),
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

        /// <summary>
        /// Returns true if any committed file looks like a real .env file.
        /// Explicitly ignores safe template variants (.env.example, .env.sample, .env.template)
        /// so that repos that document their environment variables are not penalised.
        /// </summary>
        private static bool HasCommittedEnvFile(List<string> paths)
        {
            var safePatterns = new[] { ".env.example", ".env.sample", ".env.template" };

            return paths.Any(p =>
            {
                // Must look like a .env file
                var isEnvFile = p == ".env" || p.EndsWith("/.env") ||
                                p.StartsWith(".env.") || p.Contains("/.env.");

                if (!isEnvFile) return false;

                // Exclude safe template variants regardless of directory depth
                return !safePatterns.Any(safe => p == safe || p.EndsWith("/" + safe));
            });
        }
    }
}
