using System.ComponentModel.DataAnnotations;

namespace FullStackProject.RepoGuardian.Dto
{
    /// <summary>Request body for the stateless QuickScan endpoint.</summary>
    public class QuickScanRequest
    {
        /// <summary>Full GitHub repository URL (e.g. https://github.com/owner/repo).</summary>
        [Required]
        public string GithubUrl { get; set; }
    }
}
