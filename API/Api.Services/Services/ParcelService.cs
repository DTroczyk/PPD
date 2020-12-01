using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Api.BLL.Entities;
using Api.DAL.EF;
using Api.Services.Interfaces;

namespace Api.Services.Services
{
    public class ParcelService : BaseService, IParcelService
    {
        public ParcelService(ApplicationDbContext dbContext) : base(dbContext)
        {

        }

        public void SendParcel(Parcel parcel)
        {

            parcel.ParcelStatus = 0;
            parcel.SendDate = DateTime.Now;

            //sender
            if (string.IsNullOrWhiteSpace(parcel.SenderName))
                throw new Exception("SenderName is required");

            if (string.IsNullOrWhiteSpace(parcel.SenderCity))
                throw new Exception("SenderCity is required");

            if (string.IsNullOrWhiteSpace(parcel.SenderStreet))
                throw new Exception("SenderStreet is required");

            Regex regex = new Regex(@"/^([0-9]{2})(-[0-9]{3})?$/i");
            Match match = regex.Match(parcel.SenderPostalCode);
            if (!match.Success)
                throw new Exception("SenderPostalCode is incorrect");

            if (string.IsNullOrWhiteSpace(parcel.SenderHouseNumber))
                throw new Exception("SenderHouseNumber is required");

            Regex regex2 = new Regex(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$");
            Match match2 = regex2.Match(parcel.SenderEmail);
            if(!match2.Success)
                throw new Exception("SenderEmail is required");

            Regex regex3 = new Regex(@"^(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)");
            Match match3 = regex3.Match(parcel.SenderPhoneNumber);
            if(!match3.Success)
                throw new Exception("SenderPhoneNumber is required");

            //receiver
            if (string.IsNullOrWhiteSpace(parcel.ReceiverName))
                throw new Exception("ReceiverName is required");

            if (string.IsNullOrWhiteSpace(parcel.ReceiverCity))
                throw new Exception("ReceiverCity is required");

            if (string.IsNullOrWhiteSpace(parcel.ReceiverStreet))
                throw new Exception("ReceiverStreet is required");

            Regex regex4 = new Regex(@"/^([0-9]{2})(-[0-9]{3})?$/i");
            Match match4 = regex4.Match(parcel.ReceiverPostalCode);
            if (!match4.Success)
                throw new Exception("SenderPostalCode is incorrect");

            if (string.IsNullOrWhiteSpace(parcel.ReceiverHouseNumber))
                throw new Exception("ReceiverHouseNumber is required");

            Regex regex5 = new Regex(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$");
            Match match5 = regex5.Match(parcel.ReceiverEmail);
            if (!match2.Success)
                throw new Exception("ReceiverEmail is required");

            Regex regex6 = new Regex(@"^(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)");
            Match match6 = regex6.Match(parcel.ReceiverPhoneNumber);
            if (!match3.Success)
                throw new Exception("ReceiverPhoneNumber is required");

            _dbContext.Parcels.Add(parcel);
            _dbContext.SaveChanges();
        }
    }
}
