using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using FullStackProject.Authorization.Roles;
using FullStackProject.Authorization.Users;
using FullStackProject.MultiTenancy;
using FullStackProject.Domains.RepoGuardian;

namespace FullStackProject.EntityFrameworkCore
{
    public class FullStackProjectDbContext : AbpZeroDbContext<Tenant, Role, User, FullStackProjectDbContext>
    {
        public DbSet<GithubRepository> GithubRepositories { get; set; }
        public DbSet<ScanRun> ScanRuns { get; set; }
        public DbSet<RuleResult> RuleResults { get; set; }
        public DbSet<ComplianceScore> ComplianceScores { get; set; }
        public DbSet<Recommendation> Recommendations { get; set; }
        public DbSet<RuleDefinition> RuleDefinitions { get; set; }
        public DbSet<TenantActiveRule> TenantActiveRules { get; set; }

        public FullStackProjectDbContext(DbContextOptions<FullStackProjectDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Map Entity<string>.Id to the "RuleId" column in the DB.
            modelBuilder.Entity<RuleDefinition>()
                .Property(r => r.Id)
                .HasColumnName("RuleId")
                .HasMaxLength(20);

            // Composite PK: one row per tenant per rule.
            modelBuilder.Entity<TenantActiveRule>()
                .HasKey(t => new { t.TenantId, t.RuleId });
        }
    }
}
