using Abp.Application.Services;
using FullStackProject.MultiTenancy.Dto;

namespace FullStackProject.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

