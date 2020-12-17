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
    public class StorkService : BaseService, IStorkService
    {
        public StorkService(ApplicationDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<IEnumerable<Parcel>> GetParcels()
        {
            var entities = await _dbContext.Parcels
                .Include(p => p.Warehouses)
                .ToListAsync();

            var parcels = entities.Where(p => p.ParcelStatus != ParcelStatus.Delivered);

            return parcels;
        }

        public async Task<Parcel> SetPigeon(long parcelId, string pigeonLogin)
        {
            var parcelEntity = await _dbContext.Parcels
                .Include(p => p.Pigeon)
                .FirstOrDefaultAsync(p => p.Id == parcelId);

            parcelEntity.PigeonId = pigeonLogin;

            var pigeonParcel = new PigeonParcel()
            {
                ParcelId = parcelEntity.Id,
                PigeonLogin = pigeonLogin
            };

            _dbContext.Add(pigeonParcel);
            _dbContext.Update(parcelEntity);
            await _dbContext.SaveChangesAsync();

            return parcelEntity;
        }
    }
}
