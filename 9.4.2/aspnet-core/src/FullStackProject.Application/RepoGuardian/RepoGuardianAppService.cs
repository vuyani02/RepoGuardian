using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using Abp.UI;
using FullStackProject.Authorization.Roles;
using FullStackProject.Domains.RepoGuardian;
using FullStackProject.RepoGuardian.AI;
using FullStackProject.RepoGuardian.Dto;
using FullStackProject.RepoGuardian.GitHub;
using FullStackProject.RepoGuardian.Rules;

namespace FullStackProject.RepoGuardian
{
    /// <summary>
    /// Orchestrates repository registration and compliance scanning for the current user.
    /// Business logic (scoring, persistence) is delegated to RepoGuardianManager.
    /// </summary>
    [AbpAuthorize]
    public class RepoGuardianAppService : FullStackProjectAppServiceBase, IRepoGuardianAppService
    {
        private readonly RepoGuardianManager _repoGuardianManager;
        private readonly GithubService _githubService;
        private readonly RuleEngine _ruleEngine;
        private readonly AiExplanationService _aiExplanationService;
        private readonly IActiveRuleRepository _activeRuleRepo;
        private readonly IRepository<GithubRepository, Guid> _repositoryRepo;
        private readonly IRepository<ScanRun, Guid> _scanRunRepo;
        private readonly IRepository<ComplianceScore, Guid> _complianceScoreRepo;
        private readonly IRepository<RuleResult, Guid> _ruleResultRepo;
        private readonly IRepository<RuleDefinition, string> _ruleDefinitionRepo;

        public RepoGuardianAppService(
            RepoGuardianManager repoGuardianManager,
            GithubService githubService,
            RuleEngine ruleEngine,
            AiExplanationService aiExplanationService,
            IActiveRuleRepository activeRuleRepo,
            IRepository<GithubRepository, Guid> repositoryRepo,
            IRepository<ScanRun, Guid> scanRunRepo,
            IRepository<ComplianceScore, Guid> complianceScoreRepo,
            IRepository<RuleResult, Guid> ruleResultRepo,
            IRepository<RuleDefinition, string> ruleDefinitionRepo)
        {
            _repoGuardianManager = repoGuardianManager;
            _githubService = githubService;
            _ruleEngine = ruleEngine;
            _aiExplanationService = aiExplanationService;
            _activeRuleRepo = activeRuleRepo;
            _repositoryRepo = repositoryRepo;
            _scanRunRepo = scanRunRepo;
            _complianceScoreRepo = complianceScoreRepo;
            _ruleResultRepo = ruleResultRepo;
            _ruleDefinitionRepo = ruleDefinitionRepo;
        }

        /// <summary>
        /// Registers a GitHub repository for the current tenant.
        /// Throws a UserFriendlyException if the URL is already registered, unless AllowExisting is true.
        /// </summary>
        public async Task<RepositoryDto> AddRepositoryAsync(AddRepositoryRequest request)
        {
            var (owner, name) = _repoGuardianManager.ParseGithubUrl(request.GithubUrl);
            var userId = AbpSession.GetUserId();
            var normalized = request.GithubUrl.TrimEnd('/').ToLowerInvariant();

            // ABP's IMustHaveTenant filter already scopes this query to the current tenant.
            var existing = await _repositoryRepo.FirstOrDefaultAsync(
                r => r.GithubUrl.ToLower() == normalized);

            if (existing != null)
            {
                if (!request.AllowExisting)
                    throw new Abp.UI.UserFriendlyException("This repository has already been added.");

                return MapToRepositoryDto(existing);
            }

            var repo = await _repositoryRepo.InsertAsync(new GithubRepository
            {
                GithubUrl = request.GithubUrl.TrimEnd('/'),
                Owner = owner,
                Name = name,
                UserId = userId
            });

            return MapToRepositoryDto(repo);
        }

        /// <summary>Returns all repositories registered under the current tenant.</summary>
        public async Task<List<RepositoryDto>> GetRepositoriesAsync()
        {
            var repos = await _repositoryRepo.GetAllListAsync();
            return repos.Select(MapToRepositoryDto).ToList();
        }

        /// <summary>
        /// Runs the full scan pipeline: fetches the GitHub file tree, evaluates rules,
        /// calculates compliance scores, generates AI recommendations, and returns the result.
        /// </summary>
        public async Task<ScanResultDto> StartScanAsync(StartScanRequest request)
        {
            var scanRun = await _repoGuardianManager.CreateScanRunAsync(request.RepositoryId);

            try
            {
                await _repoGuardianManager.UpdateScanStatusAsync(scanRun.Id, ScanRunStatus.Running);

                var repository = await _repositoryRepo.GetAsync(request.RepositoryId);
                var filePaths = await _githubService.GetFileTreeAsync(repository.Owner, repository.Name);

                var tenantId = AbpSession.GetTenantId();
                var activeRuleIds = await _activeRuleRepo.GetActiveRuleIdsAsync(tenantId);
                var ruleResults = _ruleEngine.Evaluate(scanRun.Id, filePaths, activeRuleIds);
                await _repoGuardianManager.SaveRuleResultsAsync(ruleResults);
                await _repoGuardianManager.CalculateAndSaveScoresAsync(scanRun.Id, ruleResults);

                await GenerateAndSaveRecommendationsAsync(ruleResults, repository.Owner, repository.Name);

                await _repoGuardianManager.UpdateScanStatusAsync(scanRun.Id, ScanRunStatus.Completed);

                return await GetScanResultAsync(scanRun.Id);
            }
            catch (Exception ex)
            {
                await _repoGuardianManager.UpdateScanStatusAsync(scanRun.Id, ScanRunStatus.Failed, ex.Message);
                throw;
            }
        }

        /// <summary>Returns the current state of a scan run including scores, rule results, and recommendations.</summary>
        public async Task<ScanResultDto> GetScanResultAsync(Guid scanRunId)
        {
            var (scanRun, ruleResults, scores, recommendations) =
                await _repoGuardianManager.GetScanDataAsync(scanRunId);

            return new ScanResultDto
            {
                ScanRunId = scanRun.Id,
                Status = scanRun.Status.ToString(),
                OverallScore = scanRun.OverallScore,
                TriggeredAt = scanRun.TriggeredAt,
                CompletedAt = scanRun.CompletedAt,
                ErrorMessage = scanRun.ErrorMessage,
                CategoryScores = scores.Select(s => new ComplianceScoreDto
                {
                    Category = s.Category.ToString(),
                    Score = s.Score
                }).ToList(),
                RuleResults = ruleResults.Select(r => new RuleResultDto
                {
                    RuleId = r.RuleId,
                    RuleName = r.RuleName,
                    Category = r.Category.ToString(),
                    Passed = r.Passed,
                    Details = r.Details
                }).ToList(),
                Recommendations = recommendations.Select(r => new RecommendationDto
                {
                    RuleResultId = r.RuleResultId,
                    RuleId = ruleResults.FirstOrDefault(rr => rr.Id == r.RuleResultId)?.RuleId,
                    IssueDescription = r.IssueDescription,
                    Explanation = r.Explanation,
                    SuggestedFix = r.SuggestedFix
                }).ToList()
            };
        }

        // Repos scoring below this threshold are considered non-compliant.
        private const int PassingScoreThreshold = 50;

        /// <summary>Returns aggregated stats for the dashboard, filtered by date range and scan scope.</summary>
        public async Task<DashboardStatsDto> GetDashboardStatsAsync(DashboardStatsRequest request)
        {
            var totalRepositories = await _repositoryRepo.CountAsync();
            var allScanRuns = await _scanRunRepo.GetAllListAsync();
            var repositories = await _repositoryRepo.GetAllListAsync();
            var repoMap = repositories.ToDictionary(r => r.Id);

            var dateFiltered = ApplyDateFilter(allScanRuns, request.DaysBack);
            var filtered = ApplyScopeFilter(dateFiltered, request.LatestPerRepo);

            var completedScores = filtered
                .Where(s => s.Status == ScanRunStatus.Completed && s.OverallScore.HasValue)
                .Select(s => (double)s.OverallScore.Value)
                .ToList();

            var filteredIds = filtered.Select(s => s.Id).ToHashSet();
            var categoryScores = await _complianceScoreRepo.GetAllListAsync(s => filteredIds.Contains(s.ScanRunId));
            var failedRuleResults = await _ruleResultRepo.GetAllListAsync(r => filteredIds.Contains(r.ScanRunId) && !r.Passed);

            var categoryAverages = categoryScores
                .GroupBy(s => s.Category)
                .Select(g => new CategoryAverageDto
                {
                    Category = g.Key.ToString(),
                    AverageScore = Math.Round(g.Average(s => (double)s.Score), 1)
                })
                .OrderBy(c => c.Category)
                .ToList();

            return new DashboardStatsDto
            {
                TotalRepositories = totalRepositories,
                TotalScans = dateFiltered.Count,
                AverageComplianceScore = completedScores.Count > 0
                    ? Math.Round(completedScores.Average(), 1)
                    : null,
                CategoryAverages = categoryAverages,
                ReposBelowThreshold = ComputeReposBelowThreshold(allScanRuns),
                MostRecentScan = ComputeMostRecentScan(allScanRuns, repoMap),
                MostFailingRule = ComputeMostFailingRule(failedRuleResults),
                TrendData = ComputeTrendData(allScanRuns, request.DaysBack)
            };
        }

        /// <summary>
        /// Counts repos whose most recent completed scan scored below the passing threshold.
        /// Uses all scans (not the date-filtered set) to reflect current repo health.
        /// </summary>
        private static int ComputeReposBelowThreshold(List<ScanRun> allScanRuns)
        {
            return allScanRuns
                .Where(s => s.Status == ScanRunStatus.Completed && s.OverallScore.HasValue)
                .GroupBy(s => s.RepositoryId)
                .Count(g => (double)g.OrderByDescending(s => s.TriggeredAt).First().OverallScore.Value < PassingScoreThreshold);
        }

        /// <summary>Returns the most recently triggered scan across all scans, or null if none exist.</summary>
        private static MostRecentScanDto ComputeMostRecentScan(
            List<ScanRun> allScanRuns,
            Dictionary<Guid, GithubRepository> repoMap)
        {
            var latest = allScanRuns.OrderByDescending(s => s.TriggeredAt).FirstOrDefault();
            if (latest == null) return null;

            repoMap.TryGetValue(latest.RepositoryId, out var repo);
            return new MostRecentScanDto
            {
                RepositoryName = repo?.Name ?? "Unknown",
                Owner = repo?.Owner ?? string.Empty,
                TriggeredAt = latest.TriggeredAt,
                OverallScore = latest.OverallScore.HasValue ? (double)latest.OverallScore.Value : null
            };
        }

        /// <summary>Returns the rule that failed most often across the filtered scans, or null if no failures exist.</summary>
        private static MostFailingRuleDto ComputeMostFailingRule(List<RuleResult> failedRuleResults)
        {
            if (failedRuleResults.Count == 0) return null;

            return failedRuleResults
                .GroupBy(r => new { r.RuleId, r.RuleName })
                .Select(g => new MostFailingRuleDto
                {
                    RuleId = g.Key.RuleId,
                    RuleName = g.Key.RuleName,
                    FailCount = g.Count()
                })
                .OrderByDescending(r => r.FailCount)
                .First();
        }

        // Cap "all time" trend to this many days so the chart stays readable.
        private const int MaxTrendDays = 90;

        /// <summary>
        /// Builds a daily series of average compliance scores.
        /// Each day's score is the average of each repo's most recently known completed scan up to that date.
        /// Days before any repo has a scan are omitted.
        /// </summary>
        private static List<DailyAverageDto> ComputeTrendData(List<ScanRun> allScanRuns, int? daysBack)
        {
            var today = DateTime.UtcNow.Date;
            var windowDays = daysBack ?? MaxTrendDays;
            var startDate = today.AddDays(-(windowDays - 1));

            var completed = allScanRuns
                .Where(s => s.Status == ScanRunStatus.Completed && s.OverallScore.HasValue)
                .ToList();

            var trendData = new List<DailyAverageDto>();

            for (var day = startDate; day <= today; day = day.AddDays(1))
            {
                // For each repo find its latest scan up to this day
                var dayScores = completed
                    .Where(s => s.TriggeredAt.Date <= day)
                    .GroupBy(s => s.RepositoryId)
                    .Select(g => (double)g.OrderByDescending(s => s.TriggeredAt).First().OverallScore.Value)
                    .ToList();

                // Skip days where no repo has been scanned yet
                if (dayScores.Count == 0) continue;

                trendData.Add(new DailyAverageDto
                {
                    Date = day.ToString("yyyy-MM-dd"),
                    AverageScore = Math.Round(dayScores.Average(), 1)
                });
            }

            return trendData;
        }

        /// <summary>Returns metadata and full scan history for a single repository.</summary>
        public async Task<RepositoryDetailDto> GetRepositoryDetailAsync(Guid id)
        {
            var repository = await _repositoryRepo.GetAsync(id);
            var scans = await _scanRunRepo.GetAllListAsync(s => s.RepositoryId == id);

            return new RepositoryDetailDto
            {
                Repository = MapToRepositoryDto(repository),
                Scans = scans
                    .OrderByDescending(s => s.TriggeredAt)
                    .Select(s => new ScanSummaryDto
                    {
                        ScanRunId = s.Id,
                        RepositoryId = s.RepositoryId,
                        RepositoryName = repository.Name,
                        Owner = repository.Owner,
                        Status = s.Status.ToString(),
                        OverallScore = s.OverallScore,
                        TriggeredAt = s.TriggeredAt,
                        CompletedAt = s.CompletedAt
                    })
                    .ToList()
            };
        }

        private static List<ScanRun> ApplyDateFilter(List<ScanRun> scanRuns, int? daysBack)
        {
            if (!daysBack.HasValue)
                return scanRuns;

            var cutoff = DateTime.UtcNow.AddDays(-daysBack.Value);
            return [..scanRuns.Where(s => s.TriggeredAt >= cutoff)];
        }

        private static List<ScanRun> ApplyScopeFilter(List<ScanRun> scanRuns, bool latestPerRepo)
        {
            if (!latestPerRepo)
                return scanRuns;

            return [..scanRuns
                .GroupBy(s => s.RepositoryId)
                .Select(g => g.OrderByDescending(s => s.TriggeredAt).First())];
        }

        /// <summary>
        /// Runs a full scan against any public GitHub URL without writing anything to the database.
        /// Intended for external callers who want scan results without registering a repository.
        /// </summary>
        [Abp.Authorization.AbpAllowAnonymous]
        public async Task<ScanResultDto> QuickScanAsync(QuickScanRequest request)
        {
            var (owner, name) = _repoGuardianManager.ParseGithubUrl(request.GithubUrl);
            var filePaths = await _githubService.GetFileTreeAsync(owner, name);

            // Use a transient ID — results are never persisted so this ID is meaningless
            var transientId = Guid.NewGuid();
            var ruleResults = _ruleEngine.Evaluate(transientId, filePaths);

            var categoryScores = ComputeInMemoryScores(ruleResults);
            var overallScore = categoryScores.Any()
                ? (int)Math.Round(categoryScores.Average(s => s.Score))
                : 0;

            var recommendations = await GenerateRecommendationsInMemoryAsync(ruleResults, owner, name);

            return new ScanResultDto
            {
                ScanRunId = transientId,
                Status = ScanRunStatus.Completed.ToString(),
                OverallScore = overallScore,
                TriggeredAt = DateTime.UtcNow,
                CompletedAt = DateTime.UtcNow,
                CategoryScores = categoryScores.Select(s => new ComplianceScoreDto
                {
                    Category = s.Category.ToString(),
                    Score = s.Score
                }).ToList(),
                RuleResults = ruleResults.Select(r => new RuleResultDto
                {
                    RuleId = r.RuleId,
                    RuleName = r.RuleName,
                    Category = r.Category.ToString(),
                    Passed = r.Passed,
                    Details = r.Details
                }).ToList(),
                Recommendations = recommendations
            };
        }

        /// <summary>
        /// Returns all rule definitions with their active/inactive status for the current tenant.
        /// </summary>
        public async Task<List<RuleDefinitionDto>> GetRuleDefinitionsAsync()
        {
            var tenantId = AbpSession.GetTenantId();
            var definitions = await _ruleDefinitionRepo.GetAllListAsync();
            var activeIds = (await _activeRuleRepo.GetActiveRuleIdsAsync(tenantId)).ToHashSet();

            return definitions
                .OrderBy(d => d.Category)
                .ThenBy(d => d.Id)
                .Select(d => new RuleDefinitionDto
                {
                    RuleId = d.Id,
                    RuleName = d.RuleName,
                    Category = d.Category.ToString(),
                    WhatIsIt = d.WhatIsIt,
                    WhyItMatters = d.WhyItMatters,
                    HowToAdd = d.HowToAdd,
                    IsActive = activeIds.Contains(d.Id)
                })
                .ToList();
        }

        /// <summary>Activates or deactivates a compliance rule for the current tenant. Caller must be an admin.</summary>
        public async Task ToggleRuleAsync(ToggleRuleRequest request)
        {
            var caller = await GetCurrentUserAsync();
            if (!await UserManager.IsInRoleAsync(caller, StaticRoleNames.Tenants.Admin))
                throw new AbpAuthorizationException("Only team admins can change active rules.");

            var tenantId = AbpSession.GetTenantId();

            if (request.Activate)
                await _activeRuleRepo.ActivateRuleAsync(tenantId, request.RuleId);
            else
                await _activeRuleRepo.DeactivateRuleAsync(tenantId, request.RuleId);
        }

        /// <summary>Calculates per-category scores from in-memory rule results without touching the database.</summary>
        private static List<(RuleCategory Category, int Score)> ComputeInMemoryScores(List<RuleResult> results)
        {
            return Enum.GetValues(typeof(RuleCategory))
                .Cast<RuleCategory>()
                .Select(category =>
                {
                    var categoryResults = results.Where(r => r.Category == category).ToList();
                    if (!categoryResults.Any()) return (Category: category, Score: -1);
                    var score = (int)Math.Round((double)categoryResults.Count(r => r.Passed) / categoryResults.Count * 100);
                    return (Category: category, Score: score);
                })
                .Where(s => s.Score >= 0)
                .ToList();
        }

        /// <summary>Calls the AI service for each failed rule and returns DTOs — no DB writes.</summary>
        private async Task<List<RecommendationDto>> GenerateRecommendationsInMemoryAsync(
            List<RuleResult> ruleResults, string owner, string repo)
        {
            var recommendations = new List<RecommendationDto>();

            foreach (var failedRule in ruleResults.Where(r => !r.Passed))
            {
                var rec = await _aiExplanationService.GetRecommendationAsync(failedRule, owner, repo);
                if (rec == null) continue;

                recommendations.Add(new RecommendationDto
                {
                    RuleResultId = failedRule.Id,
                    RuleId = failedRule.RuleId,
                    IssueDescription = rec.IssueDescription,
                    Explanation = rec.Explanation,
                    SuggestedFix = rec.SuggestedFix
                });
            }

            return recommendations;
        }

        private async Task GenerateAndSaveRecommendationsAsync(
            List<RuleResult> ruleResults, string owner, string repo)
        {
            var failedRules = ruleResults.Where(r => !r.Passed).ToList();
            var recommendations = new List<Recommendation>();

            foreach (var failedRule in failedRules)
            {
                var recommendation = await _aiExplanationService.GetRecommendationAsync(failedRule, owner, repo);
                if (recommendation != null)
                    recommendations.Add(recommendation);
            }

            await _repoGuardianManager.SaveRecommendationsAsync(recommendations);
        }

        /// <summary>Returns a summary of all scan runs for the current tenant, sorted latest first.</summary>
        public async Task<List<ScanSummaryDto>> GetAllScansAsync()
        {
            var scanRuns = await _scanRunRepo.GetAllListAsync();
            var repositoryIds = scanRuns.Select(s => s.RepositoryId).Distinct().ToList();
            var repositories = await _repositoryRepo.GetAllListAsync(r => repositoryIds.Contains(r.Id));
            var repoMap = repositories.ToDictionary(r => r.Id);

            return scanRuns
                .OrderByDescending(s => s.TriggeredAt)
                .Select(s =>
                {
                    repoMap.TryGetValue(s.RepositoryId, out var repo);
                    return new ScanSummaryDto
                    {
                        ScanRunId = s.Id,
                        RepositoryId = s.RepositoryId,
                        RepositoryName = repo?.Name ?? "Unknown",
                        Owner = repo?.Owner ?? string.Empty,
                        Status = s.Status.ToString(),
                        OverallScore = s.OverallScore,
                        TriggeredAt = s.TriggeredAt,
                        CompletedAt = s.CompletedAt
                    };
                })
                .ToList();
        }

        private RepositoryDto MapToRepositoryDto(GithubRepository repo) => new RepositoryDto
        {
            Id = repo.Id,
            GithubUrl = repo.GithubUrl,
            Owner = repo.Owner,
            Name = repo.Name
        };
    }
}
