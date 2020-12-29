using Api.BLL.Entities;
using Api.DAL.EF;
using Api.Services.Interfaces;
using Api.ViewModels.DTOs;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Api.ViewModels.VMs;

namespace Api.Services.Services
{
    public class ParcelService : BaseService, IParcelService
    {
        public ParcelService(ApplicationDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<GetPriceDto> GetParcelPrice(long parcelId)
        {
            var parcel = await _dbContext.Parcels
                .Where(p => p.Id == parcelId)
                .Include(a => a.ParcelType)
                .FirstOrDefaultAsync();

            var priceDto = new GetPriceDto()
            {
                ParcelType = parcel.ParcelType.Name,
                ParcelDescription = parcel.ParcelType.Description,
                Price = parcel.ParcelType.Price
            };

            return priceDto;
        }

        public async Task<ParcelVm> GetParcel(long parcelId)
        {
            var parcelVm = await _dbContext.Parcels
                .Where(p => p.Id == parcelId)
                .Include(a => a.ParcelType)
                .Select(p=> new ParcelVm()
                {
                    Id = p.Id,
                    ParcelType = p.ParcelType,
                    SendDate = p.SendDate,

                    SenderName = p.SenderName,
                    SenderEmail = p.SenderEmail,
                    SenderStreet = p.SenderStreet,
                    SenderHouseNumber = p.SenderHouseNumber,
                    SenderPostalCode = p.SenderPostalCode,
                    SenderCity = p.SenderCity,
                    SenderPhoneNumber = p.SenderPhoneNumber,

                    ReceiverName = p.ReceiverName,
                    ReceiverEmail = p.ReceiverEmail,
                    ReceiverStreet = p.ReceiverStreet,
                    ReceiverHouseNumber = p.ReceiverHouseNumber,
                    ReceiverPostalCode = p.ReceiverPostalCode,
                    ReceiverCity = p.ReceiverCity,
                    ReceiverPhoneNumber = p.ReceiverPhoneNumber
                })
                .SingleOrDefaultAsync();

            return parcelVm;
        }
    }
}
