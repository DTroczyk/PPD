using Api.BLL.Entities;
using Api.ViewModels.VMs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Api.Services.Interfaces
{
    public interface ISparrowService
    {
        public Task<FollowParcelVm> FollowParcel(long parcelId); //sledzenie paczki
        public void SendParcel(Parcel parcel); //nadanie paczki
        public IList<ParcelType> GetParcelTypes();
    }
}
