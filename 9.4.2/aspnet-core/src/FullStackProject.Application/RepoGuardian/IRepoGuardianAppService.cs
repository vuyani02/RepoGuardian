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

        /// <summary>Returns aggregated dashboard statistics for the current tenant.</summary>
        Task<DashboardStatsDto> GetDashboardStatsAsync();
    }
}
