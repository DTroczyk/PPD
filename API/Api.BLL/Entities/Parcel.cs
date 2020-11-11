using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Api.BLL.Entities
{
    public class Parcel
    {
        [Key]
        public string Id { get; set; } // Barcode
        public bool IsDelivered { get; set; }
        public IList<WarehouseParcel> Warehouses { get; set; }

        [ForeignKey("Pigeon")]
        public string PigeonId { get; set; }
        public Pigeon Pigeon { get; set; }

        [ForeignKey("ParcelType")]
        public string ParcelTypeId { get; set; }
        public ParcelType ParcelType { get; set; }


        public string SenderName { get; set; }
        public string SenderCity { get; set; }
        public string SenderStreet { get; set; }
        public string SenderPostalCode { get; set; }
        public string SenderNumber { get; set; }
        public string SenderEmail { get; set; }
        public string SenderPhoneNumber { get; set; }

        public string ReceiverName { get; set; }
        public string ReceiverCity { get; set; }
        public string ReceiverStreet { get; set; }
        public string ReceiverPostalCode { get; set; }
        public string ReceiverNumber { get; set; }
        public string ReceiverEmail { get; set; }
        public string ReceiverPhoneNumber { get; set; }
    }
}
