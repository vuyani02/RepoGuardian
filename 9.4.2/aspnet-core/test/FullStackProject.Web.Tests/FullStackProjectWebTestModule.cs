using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using FullStackProject.EntityFrameworkCore;
using FullStackProject.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace FullStackProject.Web.Tests
{
    [DependsOn(
        typeof(FullStackProjectWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class FullStackProjectWebTestModule : AbpModule
    {
        public FullStackProjectWebTestModule(FullStackProjectEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(FullStackProjectWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(FullStackProjectWebMvcModule).Assembly);
        }
    }
}