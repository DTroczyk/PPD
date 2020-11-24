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
    public class ClientService : BaseService, IClientService
    {
        public ClientService(ApplicationDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<IEnumerable<Warehouse>> FollowParcel(string parcelId)
        {
            var warehousesEntity = await _dbContext.WarehouseParcels
                .Where(p => p.ParcelId == parcelId)
                .Include(a => a.Warehouse)
                .ToListAsync();

            var warehouses = new List<Warehouse>();

            foreach(var item in warehousesEntity)
            {
                warehouses.Add(item.Warehouse);
            }
            return warehouses;
        }
    }
}
