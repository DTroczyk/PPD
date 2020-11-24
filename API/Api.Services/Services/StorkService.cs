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

        public async Task<IEnumerable<Parcel>> GetParcels(int warehouseId)
        {
            var entities = await _dbContext.Parcels
                .Include(p => p.Warehouses)
                    .ThenInclude(wp => wp.Warehouse)
                .Where(p => p.Warehouses.Last().WarehouseId == warehouseId)
                .ToListAsync();

            return entities;
        }

        public async Task<Parcel> SetPigeon(string parcelId, string pigeonLogin)
        {
            var parcelEntity = await _dbContext.Parcels
                .Include(p => p.Pigeon)
                .Where(p => p.PigeonId == pigeonLogin)
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
