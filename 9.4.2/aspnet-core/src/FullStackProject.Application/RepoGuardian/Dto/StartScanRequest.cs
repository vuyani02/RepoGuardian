using System;
using System.ComponentModel.DataAnnotations;

namespace FullStackProject.RepoGuardian.Dto
{
    public class StartScanRequest
    {
        [Required]
        public Guid RepositoryId { get; set; }
    }
}
