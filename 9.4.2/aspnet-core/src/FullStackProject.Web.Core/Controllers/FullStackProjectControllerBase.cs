using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace FullStackProject.Controllers
{
    public abstract class FullStackProjectControllerBase: AbpController
    {
        protected FullStackProjectControllerBase()
        {
            LocalizationSourceName = FullStackProjectConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
