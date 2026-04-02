using System.ComponentModel.DataAnnotations;

namespace FullStackProject.RepoGuardian.Dto
{
    /// <summary>Request body for the stateless QuickScan endpoint.</summary>
    public class QuickScanRequest
    {
        /// <summary>Full GitHub repository URL (e.g. https://github.com/owner/repo).</summary>
        [Required]
        public string GithubUrl { get; set; }

        /// <summary>Branch to scan. If null the repository's default branch is used.</summary>
        public string Branch { get; set; }
    }
}
