using Api.BLL.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Api.Services.Interfaces
{
    public interface IStorkService
    {
        public Task<IEnumerable<Parcel>> GetParcels();
        public Task<Parcel> SetPigeon(long parcelId, string pigeonLogin);
    }
}
