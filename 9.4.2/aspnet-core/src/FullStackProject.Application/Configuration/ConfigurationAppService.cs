using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using FullStackProject.Configuration.Dto;

namespace FullStackProject.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : FullStackProjectAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
