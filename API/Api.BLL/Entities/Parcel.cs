using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.BLL.Entities
{
    public class Parcel
    {
        [Key]
        public uint Id { get; set; } // Barcode
        public ParcelStatus ParcelStatus { get; set; }
        public IList<WarehouseParcel> Warehouses { get; set; }

        [ForeignKey("Pigeon")]
        public string PigeonId { get; set; }
        public Pigeon Pigeon { get; set; }

        [ForeignKey("ParcelType")]
        [Required]
        public string ParcelTypeId { get; set; }
        public ParcelType ParcelType { get; set; }

        public DateTime SendDate { get; set; }
        public DateTime? ReceivedDate { get; set; }

        [Required]
        public string SenderName { get; set; }
        [Required]
        public string SenderCity { get; set; }
        [Required]
        public string SenderStreet { get; set; }
        [Required]
        public string SenderPostalCode { get; set; }
        [Required]
        public string SenderHouseNumber { get; set; }
        [Required]
        public string SenderEmail { get; set; }
        [Required]
        public string SenderPhoneNumber { get; set; }

        [Required]
        public string ReceiverName { get; set; }
        [Required]
        public string ReceiverCity { get; set; }
        [Required]
        public string ReceiverStreet { get; set; }
        [Required]
        public string ReceiverPostalCode { get; set; }
        [Required]
        public string ReceiverHouseNumber { get; set; }
        [Required]
        public string ReceiverEmail { get; set; }
        [Required]
        public string ReceiverPhoneNumber { get; set; }
    }
}
