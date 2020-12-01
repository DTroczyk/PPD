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
    }
}
