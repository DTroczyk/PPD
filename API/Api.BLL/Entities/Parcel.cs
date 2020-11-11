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

        public string SenderName { get; set; }
        [ForeignKey("SenderAddress")]
        public int SenderAddressId { get; set; }
        public Address SenderAddress { get; set; }
        public string SenderEmail { get; set; }
        public string SenderPhoneNumber { get; set; }

        public string ReceiverName { get; set; }

        [ForeignKey("ReceiverAddress")]
        public int ReceiverAddressId { get; set; }
        public Address ReceiverAddress { get; set; }
        public string ReceiverEmail { get; set; }
        public string ReceiverPhoneNumber { get; set; }
    }
}
