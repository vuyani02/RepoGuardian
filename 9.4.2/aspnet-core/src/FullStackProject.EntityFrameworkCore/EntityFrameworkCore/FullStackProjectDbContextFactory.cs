using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using FullStackProject.Configuration;
using FullStackProject.Web;

namespace FullStackProject.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class FullStackProjectDbContextFactory : IDesignTimeDbContextFactory<FullStackProjectDbContext>
    {
        public FullStackProjectDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<FullStackProjectDbContext>();
            
            /*
             You can provide an environmentName parameter to the AppConfigurations.Get method. 
             In this case, AppConfigurations will try to read appsettings.{environmentName}.json.
             Use Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") method or from string[] args to get environment if necessary.
             https://docs.microsoft.com/en-us/ef/core/cli/dbcontext-creation?tabs=dotnet-core-cli#args
             */
            var environmentName = System.Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder(), environmentName);

            FullStackProjectDbContextConfigurer.Configure(builder, configuration.GetConnectionString(FullStackProjectConsts.ConnectionStringName));

            return new FullStackProjectDbContext(builder.Options);
        }
    }
}
