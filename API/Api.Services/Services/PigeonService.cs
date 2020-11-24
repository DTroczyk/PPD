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

        public async Task<Parcel> SetStatus(string parcelId, bool parcelStatus)
        {
            var parcelEntity = await _dbContext.Parcels
                .Where(p => p.Id == parcelId)
                .FirstOrDefaultAsync();

            parcelEntity.IsDelivered = parcelStatus;

            _dbContext.Update(parcelEntity);
            await _dbContext.SaveChangesAsync();

            return parcelEntity;
        }
    }
}
