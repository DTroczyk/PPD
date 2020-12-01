using Api.BLL.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Api.Services.Interfaces
{
    public interface IClientService
    {
        public Task<IEnumerable<Warehouse>> FollowParcel(long parcelId); //sledzenie paczki
        public void SendParcel(Parcel parcel); //nadanie paczki
    }
}
