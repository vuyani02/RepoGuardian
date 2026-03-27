using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using Abp.Domain.Uow;
using Abp.UI;

namespace FullStackProject.Domains.RepoGuardian
{
    public class RepoGuardianManager : IDomainService
    {
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

            return (segments[0], segments[1]);
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

        public async Task<ScanRun> CreateScanRunAsync(Guid repositoryId)
        {
            var scanRun = await _scanRunRepo.InsertAsync(new ScanRun
            {
                RepositoryId = repositoryId,
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
            foreach (var result in results)
                await _ruleResultRepo.InsertAsync(result);
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

            return scores;
        }

        public async Task SaveRecommendationsAsync(List<Recommendation> recommendations)
        {
            foreach (var rec in recommendations)
                await _recommendationRepo.InsertAsync(rec);
        }
    }
}
