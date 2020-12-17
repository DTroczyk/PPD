using Api.BLL.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Api.Services.Interfaces
{
    public interface IPigeonService
    {
        public Task<Parcel> SetStatus(string login, long parcelId, ParcelStatus parcelStatus);
        public Task<IEnumerable<Pigeon>> GetPigeons();
        public Task<IEnumerable<Parcel>> GetParcels(string login);
    }
}
