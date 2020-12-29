using Api.ViewModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Api.BLL.Entities;
using Api.ViewModels.VMs;

namespace Api.Services.Interfaces
{
    public interface IParcelService
    {
        public Task<GetPriceDto> GetParcelPrice(long parcelId); //wyliczenie ceny paczki
        public Task<ParcelVm> GetParcel(long parcelId);
    }
}
