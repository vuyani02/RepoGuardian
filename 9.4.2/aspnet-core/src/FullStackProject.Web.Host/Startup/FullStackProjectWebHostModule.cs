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

        public FullStackProjectWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(FullStackProjectWebHostModule).GetAssembly());
        }
    }
}
