using Api.BLL.Entities;
using Api.DAL.EF;
using Api.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Api.Services.Services
{
    public class PigeonService : BaseService, IPigeonService
    {
        private readonly IUserService _userService;

        public PigeonService(ApplicationDbContext dbContext, IUserService userService) : base(dbContext)
        {
            _userService = userService;
        }

        public async Task<Parcel> SetStatus(long parcelId, ParcelStatus parcelStatus)
        {
            var user = await _userService.GetPigeon();
            var parcelEntity = await _dbContext.Parcels
                .Where(p => p.Id == parcelId)
                .Where(p => p.PigeonId == user.Login)
                .FirstOrDefaultAsync();

            if (parcelEntity == null)
            {
                throw new Exception("Parcel not exists.");
            }

            if (parcelStatus == ParcelStatus.InWarehouse)
            {
                _dbContext.Add(new WarehouseParcel() { ParcelId = parcelId, WarehouseId = (int)parcelEntity.DestinationId, DateOfArrival = DateTime.Now});
                parcelEntity.PigeonId = null;
            }
            if (parcelStatus == ParcelStatus.Delivered)
            {
                parcelEntity.PigeonId = null;
                parcelEntity.ReceivedDate = DateTime.Now;
            }

            parcelEntity.ParcelStatus = parcelStatus;

            _dbContext.Update(parcelEntity);
            await _dbContext.SaveChangesAsync();

            return parcelEntity;
        }

        public async Task<IEnumerable<Parcel>> GetParcels()
        {
            var user = await _userService.GetPigeon();

            var parcelEntities = await _dbContext.Parcels
                .Include(p => p.Destination)
                .Where(p => p.PigeonId == user.Login).ToListAsync();

            return parcelEntities;
        }
    }
}
