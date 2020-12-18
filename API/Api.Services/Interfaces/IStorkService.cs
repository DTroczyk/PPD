using Api.BLL.Entities;
using Api.ViewModels.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Api.Services.Interfaces
{
    public interface IStorkService
    {
        public Task<IEnumerable<Parcel>> GetParcels();
        public Task<Parcel> SetPigeon(SetPigeonDto setPigeon);
        public Task<IEnumerable<Pigeon>> GetPigeons();
        public Task<IEnumerable<Warehouse>> GetWarehouses();
    }
}
