using Api.BLL.Entities;
using Api.DAL.EF;
using Api.Services.Interfaces;
using Api.ViewModels.VMs;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Api.Services.Services
{
    public class SparrowService : BaseService, ISparrowService
    {
        private readonly IUserService _userService;

        public SparrowService(ApplicationDbContext dbContext, IUserService userService) : base(dbContext)
        {
            _userService = userService;
        }

        public async Task<FollowParcelVm> FollowParcel(long parcelId)
        {
            var parcel = await _dbContext.Parcels
                .Include(p => p.Warehouses)
                    .ThenInclude(wp => wp.Warehouse)
                .FirstOrDefaultAsync(p => p.Id == parcelId);

            if (parcel == null)
            {
                throw new Exception("Parcel not found");
            }

            FollowParcelVm followParcel = new FollowParcelVm()
            {
                Id = parcel.Id,
                ParcelStatus = parcel.ParcelStatus.ToString(),
                SendDate = parcel.SendDate,
                ReceivedDate = parcel.ReceivedDate,
                Warehouses = new List<WarehouseVm>()
            };

            foreach (var item in parcel.Warehouses)
            {
                item.Warehouse.Histories = null;
                followParcel.Warehouses.Add(new WarehouseVm { Warehouse = item.Warehouse, DateOfArrival = item.DateOfArrival });
            }

            followParcel.Warehouses = followParcel.Warehouses.OrderBy(w => w.DateOfArrival).ToList();

            return followParcel;
        }

        public async Task<IEnumerable<Parcel>> GetParcels()
        {
            var sparrow = await _userService.GetUser();
            var parcels = await _dbContext.Parcels
                .Include(a => a.ParcelType)
                .Where(p => p.SenderLogin == sparrow.Login)
                .ToListAsync();

            return parcels;
        }

        public IList<ParcelType> GetParcelTypes()
        {
            var parcelTypes = _dbContext.ParcelTypes.ToList();
            return parcelTypes;
        }

        public long SendParcel(Parcel parcel)
        {
            // Można przypisać paczkę do odpowiedniego Clienta

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
                throw new Exception("SenderEmail is incorrect");

            
            Match match3 = regexPhone.Match(parcel.SenderPhoneNumber);
            if (!match3.Success)
                throw new Exception("SenderPhoneNumber is incorrect");

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
                throw new Exception("ReceiverEmail is incorrect");

            Match match6 = regexPhone.Match(parcel.ReceiverPhoneNumber);
            if (!match6.Success)
                throw new Exception("ReceiverPhoneNumber is incorrect");

            var warehouse = _dbContext.Warehouses
                .FirstOrDefault(w => w.PostalCode.Substring(0, 2) == parcel.SenderPostalCode.Substring(0, 2));
            if (warehouse != null)
            {
                parcel.DestinationId = warehouse.Id;
            }
            else
            {
                var warehouses = _dbContext.Warehouses.ToList();
                int min = 100;
                int minId = 0;
                int parcelPostalNumber = int.Parse(parcel.SenderPostalCode.Substring(0, 2));
                foreach (var item in warehouses)
                {
                    int warehousePostalNumber = int.Parse(item.PostalCode.Substring(0, 2));
                    if (Math.Abs(parcelPostalNumber - warehousePostalNumber) < min)
                    {
                        min = Math.Abs(parcelPostalNumber - warehousePostalNumber);
                        minId = item.Id;
                    }
                }
                parcel.DestinationId = minId;
            }

            _dbContext.Parcels.Add(parcel);
            _dbContext.SaveChanges();
            return parcel.Id;
        }
    }
}
