using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using FullStackProject.Configuration;

namespace FullStackProject.Web.Host.Startup
{
    [DependsOn(
       typeof(FullStackProjectWebCoreModule))]
    public class FullStackProjectWebHostModule: AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        /// <summary>Initialises the module with the hosting environment so configuration is available during startup.</summary>
        public FullStackProjectWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        /// <summary>Registers all types in this assembly with the ABP IoC container.</summary>
        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(FullStackProjectWebHostModule).GetAssembly());
        }
    }
}
