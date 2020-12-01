using Api.BLL.Entities;
using Api.DAL.EF;
using Api.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Api.Services.Services
{
    public class ClientService : BaseService, IClientService
    {
        public ClientService(ApplicationDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<IEnumerable<Warehouse>> FollowParcel(long parcelId)
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

        public void SendParcel(Parcel parcel)
        {
            Regex regexPostalCode = new Regex(@"^([0-9]{2})(-[0-9]{3})?$");
            Regex regexEmail = new Regex(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$");
            Regex regexPhone = new Regex(@"^(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)");

            parcel.SendDate = DateTime.Now;

            //sender
            if (string.IsNullOrWhiteSpace(parcel.SenderName))
                throw new Exception("SenderName is required");

            if (string.IsNullOrWhiteSpace(parcel.SenderCity))
                throw new Exception("SenderCity is required");

            if (string.IsNullOrWhiteSpace(parcel.SenderStreet))
                throw new Exception("SenderStreet is required");

            
            Match match = regexPostalCode.Match(parcel.SenderPostalCode);
            if (!match.Success)
                throw new Exception("SenderPostalCode is incorrect");

            if (string.IsNullOrWhiteSpace(parcel.SenderHouseNumber))
                throw new Exception("SenderHouseNumber is required");

            
            Match match2 = regexEmail.Match(parcel.SenderEmail);
            if (!match2.Success)
                throw new Exception("SenderEmail is required");

            
            Match match3 = regexPhone.Match(parcel.SenderPhoneNumber);
            if (!match3.Success)
                throw new Exception("SenderPhoneNumber is required");

            //receiver
            if (string.IsNullOrWhiteSpace(parcel.ReceiverName))
                throw new Exception("ReceiverName is required");

            if (string.IsNullOrWhiteSpace(parcel.ReceiverCity))
                throw new Exception("ReceiverCity is required");

            if (string.IsNullOrWhiteSpace(parcel.ReceiverStreet))
                throw new Exception("ReceiverStreet is required");

            Match match4 = regexPostalCode.Match(parcel.ReceiverPostalCode);
            if (!match4.Success)
                throw new Exception("SenderPostalCode is incorrect");

            if (string.IsNullOrWhiteSpace(parcel.ReceiverHouseNumber))
                throw new Exception("ReceiverHouseNumber is required");

            Match match5 = regexEmail.Match(parcel.ReceiverEmail);
            if (!match5.Success)
                throw new Exception("ReceiverEmail is required");

            Match match6 = regexPhone.Match(parcel.ReceiverPhoneNumber);
            if (!match6.Success)
                throw new Exception("ReceiverPhoneNumber is required");

            _dbContext.Parcels.Add(parcel);
            _dbContext.SaveChanges();
        }
    }
}
