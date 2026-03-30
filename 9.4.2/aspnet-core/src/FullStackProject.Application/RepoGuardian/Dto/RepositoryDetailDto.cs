using System.Collections.Generic;

namespace FullStackProject.RepoGuardian.Dto
{
    /// <summary>Full detail for a single repository: metadata plus its full scan history.</summary>
    public class RepositoryDetailDto
    {
        /// <summary>Core repository metadata.</summary>
        public RepositoryDto Repository { get; set; }

        /// <summary>All scan runs for this repository, sorted latest first.</summary>
        public List<ScanSummaryDto> Scans { get; set; } = new();
    }
}
