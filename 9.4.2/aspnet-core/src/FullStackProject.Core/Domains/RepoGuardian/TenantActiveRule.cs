using System.ComponentModel.DataAnnotations;

namespace FullStackProject.Domains.RepoGuardian
{
    /// <summary>
    /// Tracks which compliance rules are active for a specific tenant.
    /// All 17 rules are inserted when a tenant registers; deactivating a rule deletes the row.
    /// </summary>
    public class TenantActiveRule
    {
        public int TenantId { get; set; }

        [MaxLength(20)]
        public string RuleId { get; set; }
    }
}
