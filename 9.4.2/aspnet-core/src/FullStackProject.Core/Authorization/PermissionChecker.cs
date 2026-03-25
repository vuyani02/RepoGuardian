using Abp.Authorization;
using FullStackProject.Authorization.Roles;
using FullStackProject.Authorization.Users;

namespace FullStackProject.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
