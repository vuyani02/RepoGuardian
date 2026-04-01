using System.Collections.Generic;
using System.Threading.Tasks;

namespace FullStackProject.Domains.RepoGuardian
{
    /// <summary>
    /// Provides read and write access to the set of compliance rules active for a given tenant.
    /// Implemented in the EntityFrameworkCore layer to keep EF out of the domain.
    /// </summary>
    public interface IActiveRuleRepository
    {
        /// <summary>Returns the rule IDs currently active for the given tenant.</summary>
        Task<List<string>> GetActiveRuleIdsAsync(int tenantId);

        /// <summary>Inserts all known rule IDs for the tenant, skipping any that already exist.</summary>
        Task SeedAllRulesForTenantAsync(int tenantId);

        /// <summary>Marks a rule as active for the tenant if it is not already.</summary>
        Task ActivateRuleAsync(int tenantId, string ruleId);

        /// <summary>Removes a rule from the tenant's active list, making it inactive.</summary>
        Task DeactivateRuleAsync(int tenantId, string ruleId);
    }
}
