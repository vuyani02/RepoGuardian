using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using FullStackProject.Domains.RepoGuardian;
using NSubstitute;
using Shouldly;
using Xunit;

namespace FullStackProject.Tests.RepoGuardian
{
    /// <summary>
    /// Unit tests for RepoGuardianManager.CalculateAndSaveScoresAsync scoring logic.
    /// </summary>
    public class RepoGuardianManager_Scoring_Tests
    {
        private readonly RepoGuardianManager _manager;
        private readonly IRepository<ComplianceScore, Guid> _complianceScoreRepo;
        private readonly IRepository<ScanRun, Guid> _scanRunRepo;
        private readonly Guid _scanRunId = Guid.NewGuid();

        public RepoGuardianManager_Scoring_Tests()
        {
            _complianceScoreRepo = Substitute.For<IRepository<ComplianceScore, Guid>>();
            _scanRunRepo = Substitute.For<IRepository<ScanRun, Guid>>();

            var uowManager = Substitute.For<IUnitOfWorkManager>();
            var uow = Substitute.For<IActiveUnitOfWork>();
            uowManager.Current.Returns(uow);

            _complianceScoreRepo
                .InsertAsync(Arg.Any<ComplianceScore>())
                .Returns(x => x.Arg<ComplianceScore>());

            _scanRunRepo
                .GetAsync(Arg.Any<Guid>())
                .Returns(new ScanRun());

            _scanRunRepo
                .UpdateAsync(Arg.Any<ScanRun>())
                .Returns(x => x.Arg<ScanRun>());

            _manager = new RepoGuardianManager(
                Substitute.For<IRepository<GithubRepository, Guid>>(),
                _scanRunRepo,
                Substitute.For<IRepository<RuleResult, Guid>>(),
                _complianceScoreRepo,
                Substitute.For<IRepository<Recommendation, Guid>>(),
                uowManager);
        }

        [Fact]
        public async Task Score_Should_Be_100_When_All_Rules_In_Category_Pass()
        {
            var results = new List<RuleResult>
            {
                Pass("DOC_001", RuleCategory.Documentation),
                Pass("DOC_002", RuleCategory.Documentation),
                Pass("DOC_003", RuleCategory.Documentation)
            };

            var scores = await _manager.CalculateAndSaveScoresAsync(_scanRunId, results);

            ScoreFor(scores, RuleCategory.Documentation).ShouldBe(100);
        }

        [Fact]
        public async Task Score_Should_Be_0_When_All_Rules_In_Category_Fail()
        {
            var results = new List<RuleResult>
            {
                Fail("DOC_001", RuleCategory.Documentation),
                Fail("DOC_002", RuleCategory.Documentation),
                Fail("DOC_003", RuleCategory.Documentation)
            };

            var scores = await _manager.CalculateAndSaveScoresAsync(_scanRunId, results);

            ScoreFor(scores, RuleCategory.Documentation).ShouldBe(0);
        }

        [Fact]
        public async Task Score_Should_Be_50_When_Half_Rules_Pass()
        {
            var results = new List<RuleResult>
            {
                Pass("DOC_001", RuleCategory.Documentation),
                Fail("DOC_002", RuleCategory.Documentation)
            };

            var scores = await _manager.CalculateAndSaveScoresAsync(_scanRunId, results);

            ScoreFor(scores, RuleCategory.Documentation).ShouldBe(50);
        }

        [Fact]
        public async Task Score_Should_Round_Correctly_When_Not_Exact_Percentage()
        {
            // 2 out of 3 = 66.67% → rounds to 67
            var results = new List<RuleResult>
            {
                Pass("DOC_001", RuleCategory.Documentation),
                Pass("DOC_002", RuleCategory.Documentation),
                Fail("DOC_003", RuleCategory.Documentation)
            };

            var scores = await _manager.CalculateAndSaveScoresAsync(_scanRunId, results);

            ScoreFor(scores, RuleCategory.Documentation).ShouldBe(67);
        }

        [Fact]
        public async Task OverallScore_Should_Be_Average_Of_Category_Scores()
        {
            // Documentation: 1/1 = 100, Security: 0/1 = 0 → overall = 50
            var results = new List<RuleResult>
            {
                Pass("DOC_001", RuleCategory.Documentation),
                Fail("SEC_001", RuleCategory.Security)
            };

            var scanRun = new ScanRun();
            _scanRunRepo.GetAsync(_scanRunId).Returns(scanRun);

            await _manager.CalculateAndSaveScoresAsync(_scanRunId, results);

            scanRun.OverallScore.ShouldBe(50);
        }

        [Fact]
        public async Task Categories_With_No_Rules_Should_Not_Appear_In_Scores()
        {
            var results = new List<RuleResult>
            {
                Pass("DOC_001", RuleCategory.Documentation)
            };

            var scores = await _manager.CalculateAndSaveScoresAsync(_scanRunId, results);

            scores.Count.ShouldBe(1);
            scores[0].Category.ShouldBe(RuleCategory.Documentation);
        }

        [Fact]
        public async Task Each_Category_Gets_Its_Own_Score()
        {
            var results = new List<RuleResult>
            {
                Pass("DOC_001", RuleCategory.Documentation),
                Pass("DOC_002", RuleCategory.Documentation),
                Fail("SEC_001", RuleCategory.Security),
                Pass("DEP_001", RuleCategory.Dependencies)
            };

            var scores = await _manager.CalculateAndSaveScoresAsync(_scanRunId, results);

            ScoreFor(scores, RuleCategory.Documentation).ShouldBe(100);
            ScoreFor(scores, RuleCategory.Security).ShouldBe(0);
            ScoreFor(scores, RuleCategory.Dependencies).ShouldBe(100);
        }

        // ── Helpers ───────────────────────────────────────────────────────────

        private static RuleResult Pass(string ruleId, RuleCategory category) =>
            new RuleResult { RuleId = ruleId, Category = category, Passed = true };

        private static RuleResult Fail(string ruleId, RuleCategory category) =>
            new RuleResult { RuleId = ruleId, Category = category, Passed = false };

        private static int ScoreFor(List<ComplianceScore> scores, RuleCategory category) =>
            scores.Find(s => s.Category == category).Score;
    }
}
