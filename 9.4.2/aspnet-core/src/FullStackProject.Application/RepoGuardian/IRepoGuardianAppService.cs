using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using FullStackProject.RepoGuardian.Dto;

namespace FullStackProject.RepoGuardian
{
    public interface IRepoGuardianAppService : IApplicationService
    {
        /// <summary>Registers a GitHub repository for the current user (idempotent).</summary>
        Task<RepositoryDto> AddRepositoryAsync(AddRepositoryRequest request);

        /// <summary>Returns all repositories registered by the current user.</summary>
        Task<List<RepositoryDto>> GetRepositoriesAsync();

        /// <summary>Triggers a full scan and returns the completed result.</summary>
        Task<ScanResultDto> StartScanAsync(StartScanRequest request);

        /// <summary>Returns the current state of a scan run, including scores and rule results.</summary>
        Task<ScanResultDto> GetScanResultAsync(Guid scanRunId);

        /// <summary>Returns a summary of all scan runs for the current tenant, sorted latest first.</summary>
        Task<List<ScanSummaryDto>> GetAllScansAsync();

        /// <summary>Returns aggregated dashboard statistics for the current tenant, filtered by date range and scan scope.</summary>
        Task<DashboardStatsDto> GetDashboardStatsAsync(DashboardStatsRequest request);

        /// <summary>Returns metadata and full scan history for a single repository.</summary>
        Task<RepositoryDetailDto> GetRepositoryDetailAsync(Guid id);

        /// <summary>
        /// Runs a full scan against any public GitHub URL without touching the database.
        /// No repository is registered and no scan run is persisted — results are returned directly.
        /// </summary>
        Task<ScanResultDto> QuickScanAsync(QuickScanRequest request);

        /// <summary>Returns all rule definitions with their active/inactive status for the current tenant.</summary>
        Task<List<RuleDefinitionDto>> GetRuleDefinitionsAsync();

        /// <summary>Activates or deactivates a compliance rule for the current tenant.</summary>
        Task ToggleRuleAsync(ToggleRuleRequest request);
    }
}
