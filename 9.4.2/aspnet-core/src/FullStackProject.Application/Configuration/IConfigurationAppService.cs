using System.Threading.Tasks;
using FullStackProject.Configuration.Dto;

namespace FullStackProject.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
