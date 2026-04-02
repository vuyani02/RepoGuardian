using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using Abp.Domain.Uow;
using Abp.UI;
using Castle.Core.Logging;

namespace FullStackProject.Domains.RepoGuardian
{
    public class RepoGuardianManager : IDomainService
    {
        public ILogger Logger { get; set; } = NullLogger.Instance;

        private readonly IRepository<GithubRepository, Guid> _repositoryRepo;
        private readonly IRepository<ScanRun, Guid> _scanRunRepo;
        private readonly IRepository<RuleResult, Guid> _ruleResultRepo;
        private readonly IRepository<ComplianceScore, Guid> _complianceScoreRepo;
        private readonly IRepository<Recommendation, Guid> _recommendationRepo;
        private readonly IUnitOfWorkManager _unitOfWorkManager;

        public RepoGuardianManager(
            IRepository<GithubRepository, Guid> repositoryRepo,
            IRepository<ScanRun, Guid> scanRunRepo,
            IRepository<RuleResult, Guid> ruleResultRepo,
            IRepository<ComplianceScore, Guid> complianceScoreRepo,
            IRepository<Recommendation, Guid> recommendationRepo,
            IUnitOfWorkManager unitOfWorkManager)
        {
            _repositoryRepo = repositoryRepo;
            _scanRunRepo = scanRunRepo;
            _ruleResultRepo = ruleResultRepo;
            _complianceScoreRepo = complianceScoreRepo;
            _recommendationRepo = recommendationRepo;
            _unitOfWorkManager = unitOfWorkManager;
        }

        public (string owner, string name) ParseGithubUrl(string githubUrl)
        {
            var uri = new Uri(githubUrl.TrimEnd('/'));
            var segments = uri.AbsolutePath.Split('/', StringSplitOptions.RemoveEmptyEntries);

            if (segments.Length < 2)
                throw new UserFriendlyException("Invalid GitHub URL. Expected format: https://github.com/owner/repo");

            return (segments[0], segments[1].Replace(".git", ""));
        }

        public async Task<GithubRepository> GetOrCreateRepositoryAsync(string githubUrl)
        {
            var normalized = githubUrl.TrimEnd('/').ToLower();
            var existing = await _repositoryRepo.FirstOrDefaultAsync(r => r.GithubUrl.ToLower() == normalized);

            if (existing != null)
                return existing;

            var (owner, name) = ParseGithubUrl(githubUrl);

            return await _repositoryRepo.InsertAsync(new GithubRepository
            {
                GithubUrl = githubUrl.TrimEnd('/'),
                Owner = owner,
                Name = name
            });
        }

        public async Task<ScanRun> CreateScanRunAsync(Guid repositoryId, string branch = null)
        {
            Logger.InfoFormat("Creating scan run for repository {0} (branch: {1})", repositoryId, branch ?? "default");
            var scanRun = await _scanRunRepo.InsertAsync(new ScanRun
            {
                RepositoryId = repositoryId,
                Branch = branch,
                Status = ScanRunStatus.Pending,
                TriggeredAt = DateTime.UtcNow
            });

            // Flush to DB immediately so subsequent GetAsync calls within the same
            // Unit of Work can find the record by ID.
            await _unitOfWorkManager.Current.SaveChangesAsync();

            return scanRun;
        }

        public async Task UpdateScanStatusAsync(Guid scanRunId, ScanRunStatus status, string errorMessage = null)
        {
            Logger.InfoFormat("Scan {0} status → {1}", scanRunId, status);
            var scanRun = await _scanRunRepo.GetAsync(scanRunId);
            scanRun.Status = status;

            if (status == ScanRunStatus.Completed || status == ScanRunStatus.Failed)
                scanRun.CompletedAt = DateTime.UtcNow;

            if (errorMessage != null)
                scanRun.ErrorMessage = errorMessage;

            await _scanRunRepo.UpdateAsync(scanRun);
        }

        public async Task SaveRuleResultsAsync(List<RuleResult> results)
        {
            Logger.InfoFormat("Saving {0} rule results", results.Count);
            foreach (var result in results)
                await _ruleResultRepo.InsertAsync(result);

            await _unitOfWorkManager.Current.SaveChangesAsync();
        }

        public async Task<List<ComplianceScore>> CalculateAndSaveScoresAsync(Guid scanRunId, List<RuleResult> results)
        {
            var scores = new List<ComplianceScore>();

            foreach (RuleCategory category in Enum.GetValues(typeof(RuleCategory)))
            {
                var categoryResults = results.Where(r => r.Category == category).ToList();
                if (!categoryResults.Any()) continue;

                var passed = categoryResults.Count(r => r.Passed);
                var score = (int)Math.Round((double)passed / categoryResults.Count * 100);

                var complianceScore = await _complianceScoreRepo.InsertAsync(new ComplianceScore
                {
                    ScanRunId = scanRunId,
                    Category = category,
                    Score = score
                });

                scores.Add(complianceScore);
            }

            var overallScore = scores.Any()
                ? (int)Math.Round(scores.Average(s => s.Score))
                : 0;

            var scanRun = await _scanRunRepo.GetAsync(scanRunId);
            scanRun.OverallScore = overallScore;
            await _scanRunRepo.UpdateAsync(scanRun);
            Logger.InfoFormat("Scan {0} overall score: {1}", scanRunId, overallScore);

            await _unitOfWorkManager.Current.SaveChangesAsync();

            return scores;
        }

        public async Task SaveRecommendationsAsync(List<Recommendation> recommendations)
        {
            foreach (var rec in recommendations)
                await _recommendationRepo.InsertAsync(rec);

            await _unitOfWorkManager.Current.SaveChangesAsync();
        }

        /// <summary>
        /// Fetches all data needed to build a ScanResultDto for the given scan run.
        /// </summary>
        public async Task<(ScanRun ScanRun, List<RuleResult> RuleResults, List<ComplianceScore> Scores, List<Recommendation> Recommendations)> GetScanDataAsync(Guid scanRunId)
        {
            var scanRun = await _scanRunRepo.GetAsync(scanRunId);
            var ruleResults = await _ruleResultRepo.GetAllListAsync(r => r.ScanRunId == scanRunId);
            var scores = await _complianceScoreRepo.GetAllListAsync(s => s.ScanRunId == scanRunId);
            var ruleResultIds = ruleResults.Select(r => r.Id).ToList();
            var recommendations = await _recommendationRepo.GetAllListAsync(r => ruleResultIds.Contains(r.RuleResultId));

            return (scanRun, ruleResults, scores, recommendations);
        }
    }
}
