using Api.BLL.Entities;
using System.Security.Claims;
using System.Threading.Tasks;
using Api.ViewModels.VMs;

namespace Api.Services.Interfaces
{
    public interface IUserService
    {
        public Task<User> GetUser();
        public Task<SparrowVm> GetSparrow();
        public Task<Pigeon> GetPigeon();
        public Task<Stork> GetStork();
    }
}
