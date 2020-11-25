using Api.BLL.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Api.Services.Interfaces
{
    public interface IPigeonService
    {
        public Task<Parcel> SetStatus(string parcelId, ParcelStatus parcelStatus);
    }
}
