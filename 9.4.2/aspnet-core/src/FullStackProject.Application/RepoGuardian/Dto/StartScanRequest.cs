using System;
using System.ComponentModel.DataAnnotations;

namespace FullStackProject.RepoGuardian.Dto
{
    public class StartScanRequest
    {
        [Required]
        public Guid RepositoryId { get; set; }

        /// <summary>Branch to scan. If null the repository's default branch is used.</summary>
        public string Branch { get; set; }
    }
}
