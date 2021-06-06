using System.Linq;
using System.Security.Claims;
using Cwork.Persistance;
using Cwork.Service.Interface;
using Microsoft.AspNetCore.Http;

namespace Cwork.API.Security
{
    public class UserAccessor : IUserAccessor
    {
        private readonly IHttpContextAccessor _http;
        private readonly DataContext _data;
        public UserAccessor(IHttpContextAccessor http, DataContext data)
        {
            _data = data;
            _http = http;
            UserId = _http.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);
        }

        public string UserId { get; }

        public string GetCurrentUser()
        {
            var username = _http.HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
            return username;
        }
        public string GetUserRole()
        {
            var role = _data.UserLoginDetails.Where(u => u.UserName == GetCurrentUser()).FirstOrDefault();
            return role.UserRole ;
        }
    }
}