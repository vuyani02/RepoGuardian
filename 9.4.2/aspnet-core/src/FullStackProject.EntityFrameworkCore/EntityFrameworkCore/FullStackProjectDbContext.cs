using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using FullStackProject.Authorization.Roles;
using FullStackProject.Authorization.Users;
using FullStackProject.MultiTenancy;

namespace FullStackProject.EntityFrameworkCore
{
    public class FullStackProjectDbContext : AbpZeroDbContext<Tenant, Role, User, FullStackProjectDbContext>
    {
        /* Define a DbSet for each entity of the application */
        
        public FullStackProjectDbContext(DbContextOptions<FullStackProjectDbContext> options)
            : base(options)
        {
        }
    }
}
