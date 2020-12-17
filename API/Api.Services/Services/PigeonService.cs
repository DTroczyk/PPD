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
        public PigeonService(ApplicationDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<Parcel> SetStatus(string login, long parcelId, ParcelStatus parcelStatus)
        {
            var parcelEntity = await _dbContext.Parcels
                .Where(p => p.Id == parcelId)
                .Where(p => p.PigeonId == login)
                .FirstOrDefaultAsync();

            if (parcelEntity == null)
            {
                throw new Exception("Parcel not exists.");
            }

            parcelEntity.ParcelStatus = parcelStatus;

            _dbContext.Update(parcelEntity);
            await _dbContext.SaveChangesAsync();

            return parcelEntity;
        }

        public async Task<IEnumerable<Pigeon>> GetPigeons()
        {
            var pigeonEntities = await _dbContext.Pigeons
                .ToListAsync();

            return pigeonEntities;
        }

        public async Task<IEnumerable<Parcel>> GetParcels(string login)
        {
            var parcelEntities = await _dbContext.Parcels
                .Where(p => p.PigeonId == login).ToListAsync();

            return parcelEntities;
        }
    }
}
