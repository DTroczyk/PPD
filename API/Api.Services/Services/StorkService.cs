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
    public class StorkService : BaseService, IStorkService
    {
        private readonly IUserService _userService;

        public StorkService(ApplicationDbContext dbContext, IUserService userService) : base(dbContext)
        {
            _userService = userService;
        }

        public async Task<IEnumerable<Parcel>> GetParcels()
        {
            Stork stork = await _userService.GetStork();

            var entities = await _dbContext.Parcels
                .Include(p => p.Warehouses)
                .Include(p => p.Pigeon)
                .Where(p => p.DestinationId == stork.WarehouseId && 
                    (p.ParcelStatus == ParcelStatus.WaitingToBePosted || p.ParcelStatus == ParcelStatus.InWarehouse))
                .ToListAsync();

            var parcels = entities.Where(p => p.ParcelStatus != ParcelStatus.Delivered);

            return parcels;
        }

        public async Task<Parcel> SetPigeon(SetPigeonDto setPigeon)
        {
            var parcelEntity = await _dbContext.Parcels
                .Include(p => p.Pigeon)
                .FirstOrDefaultAsync(p => p.Id == setPigeon.ParcelId);

            var parcelPigeon = await _dbContext.PigeonParcels
                .Where(pp => pp.PigeonLogin == setPigeon.PigeonLogin)
                .Where(pp => pp.ParcelId == setPigeon.ParcelId)
                .FirstOrDefaultAsync();

            if (parcelEntity == null)
                return null;

            parcelEntity.PigeonId = setPigeon.PigeonLogin;
            if (setPigeon.WarehouseId != null && parcelEntity.ParcelStatus == ParcelStatus.InWarehouse)
            {
                parcelEntity.DestinationId = (int)setPigeon.WarehouseId;
            }

            if (setPigeon.WarehouseId == -1 && parcelEntity.ParcelStatus == ParcelStatus.InWarehouse)
            {
                parcelEntity.DestinationId = null;
            }

            if (parcelPigeon != null)
            {
                _dbContext.Update(parcelEntity);
                await _dbContext.SaveChangesAsync();
                return parcelEntity;
            }

            var pigeonParcel = new PigeonParcel()
            {
                ParcelId = parcelEntity.Id,
                PigeonLogin = setPigeon.PigeonLogin
            };

            _dbContext.Add(pigeonParcel);
            _dbContext.Update(parcelEntity);
            await _dbContext.SaveChangesAsync();

            return parcelEntity;
        }

        public async Task<IEnumerable<Pigeon>> GetPigeons()
        {
            var user = await _userService.GetStork();
            var pigeonEntities = await _dbContext.Pigeons
                .Where(p => p.WarehouseId == user.WarehouseId)
                .ToListAsync();

            return pigeonEntities;
        }

        public async Task<IEnumerable<Warehouse>> GetWarehouses()
        {
            var user = await _userService.GetStork();
            var warehouses = await _dbContext.Warehouses
                .Where(w => w.Id != user.WarehouseId)
                .ToListAsync();

            return warehouses;
        }
    }
}
