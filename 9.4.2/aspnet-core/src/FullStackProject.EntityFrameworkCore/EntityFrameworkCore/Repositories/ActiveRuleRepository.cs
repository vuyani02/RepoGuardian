using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Dependency;
using Abp.EntityFrameworkCore;
using FullStackProject.Domains.RepoGuardian;
using Microsoft.EntityFrameworkCore;

namespace FullStackProject.EntityFrameworkCore.Repositories
{
    /// <summary>EF Core implementation of IActiveRuleRepository, backed by the TenantActiveRules table.</summary>
    public class ActiveRuleRepository : IActiveRuleRepository, ITransientDependency
    {
        private readonly IDbContextProvider<FullStackProjectDbContext> _dbContextProvider;

        public ActiveRuleRepository(IDbContextProvider<FullStackProjectDbContext> dbContextProvider)
        {
            _dbContextProvider = dbContextProvider;
        }

        /// <inheritdoc/>
        public async Task<List<string>> GetActiveRuleIdsAsync(int tenantId)
        {
            var db = await _dbContextProvider.GetDbContextAsync();
            return await db.TenantActiveRules
                .Where(r => r.TenantId == tenantId)
                .Select(r => r.RuleId)
                .ToListAsync();
        }

        /// <inheritdoc/>
        public async Task SeedAllRulesForTenantAsync(int tenantId)
        {
            var db = await _dbContextProvider.GetDbContextAsync();

            var existing = await db.TenantActiveRules
                .Where(r => r.TenantId == tenantId)
                .Select(r => r.RuleId)
                .ToListAsync();

            var toAdd = RuleIds.All
                .Except(existing)
                .Select(ruleId => new TenantActiveRule { TenantId = tenantId, RuleId = ruleId });

            await db.TenantActiveRules.AddRangeAsync(toAdd);
            await db.SaveChangesAsync();
        }

        /// <inheritdoc/>
        public async Task ActivateRuleAsync(int tenantId, string ruleId)
        {
            var db = await _dbContextProvider.GetDbContextAsync();

            var exists = await db.TenantActiveRules
                .AnyAsync(r => r.TenantId == tenantId && r.RuleId == ruleId);

            if (exists) return;

            await db.TenantActiveRules.AddAsync(new TenantActiveRule { TenantId = tenantId, RuleId = ruleId });
            await db.SaveChangesAsync();
        }

        /// <inheritdoc/>
        public async Task DeactivateRuleAsync(int tenantId, string ruleId)
        {
            var db = await _dbContextProvider.GetDbContextAsync();

            var row = await db.TenantActiveRules
                .FirstOrDefaultAsync(r => r.TenantId == tenantId && r.RuleId == ruleId);

            if (row == null) return;

            db.TenantActiveRules.Remove(row);
            await db.SaveChangesAsync();
        }
    }
}
