using Api.BLL.Entities;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Api.Services.Interfaces
{
    public interface IUserService
    {
        public Task<User> GetUser(ClaimsIdentity identity);
    }
}
