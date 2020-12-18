using Api.BLL.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Api.Services.Interfaces
{
    public interface IPigeonService
    {
        public Task<Parcel> SetStatus(long parcelId, ParcelStatus parcelStatus);
        public Task<IEnumerable<Parcel>> GetParcels();
    }
}
