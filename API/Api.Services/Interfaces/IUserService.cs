using Api.BLL.Entities;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Api.Services.Interfaces
{
    public interface IUserService
    {
        public Task<User> GetUser();
        public Task<Sparrow> GetSparrow();
        public Task<Pigeon> GetPigeon();
        public Task<Stork> GetStork();
    }
}
