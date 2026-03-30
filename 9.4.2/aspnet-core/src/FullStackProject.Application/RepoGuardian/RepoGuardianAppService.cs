using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
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
        private readonly IRepository<GithubRepository, Guid> _repositoryRepo;
        private readonly IRepository<ScanRun, Guid> _scanRunRepo;

        public RepoGuardianAppService(
            RepoGuardianManager repoGuardianManager,
            GithubService githubService,
            RuleEngine ruleEngine,
            AiExplanationService aiExplanationService,
            IRepository<GithubRepository, Guid> repositoryRepo,
            IRepository<ScanRun, Guid> scanRunRepo)
        {
            _repoGuardianManager = repoGuardianManager;
            _githubService = githubService;
            _ruleEngine = ruleEngine;
            _aiExplanationService = aiExplanationService;
            _repositoryRepo = repositoryRepo;
            _scanRunRepo = scanRunRepo;
        }

        /// <summary>
        /// Registers a GitHub repository for the current user.
        /// If the same URL is already registered by this user, returns the existing record.
        /// </summary>
        public async Task<RepositoryDto> AddRepositoryAsync(AddRepositoryRequest request)
        {
            var (owner, name) = _repoGuardianManager.ParseGithubUrl(request.GithubUrl);
            var userId = AbpSession.GetUserId();
            var normalized = request.GithubUrl.TrimEnd('/').ToLowerInvariant();

            var existing = await _repositoryRepo.FirstOrDefaultAsync(
                r => r.GithubUrl.ToLower() == normalized && r.UserId == userId);

            if (existing != null)
                return MapToRepositoryDto(existing);

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

                var ruleResults = _ruleEngine.Evaluate(scanRun.Id, filePaths);
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

        /// <summary>Returns aggregated stats for the dashboard, filtered by date range and scan scope.</summary>
        public async Task<DashboardStatsDto> GetDashboardStatsAsync(DashboardStatsRequest request)
        {
            var totalRepositories = await _repositoryRepo.CountAsync();
            var allScanRuns = await _scanRunRepo.GetAllListAsync();

            var filtered = ApplyDateFilter(allScanRuns, request.DaysBack);
            filtered = ApplyScopeFilter(filtered, request.LatestPerRepo);

            var completedScores = filtered
                .Where(s => s.Status == ScanRunStatus.Completed && s.OverallScore.HasValue)
                .Select(s => (double)s.OverallScore.Value)
                .ToList();

            return new DashboardStatsDto
            {
                TotalRepositories = totalRepositories,
                TotalScans = filtered.Count,
                AverageComplianceScore = completedScores.Count > 0
                    ? Math.Round(completedScores.Average(), 1)
                    : null
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
