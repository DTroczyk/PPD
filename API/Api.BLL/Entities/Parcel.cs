using System;
using System.Collections.Generic;
using System.Text;

namespace Api.BLL.Entities
{
    public class Parcel
    {
        public string Id { get; set; } // Barcode
        public bool IsDelivered { get; set; }
        public IList<WarehouseParcel> Warehouses { get; set; }
        public int PigeonId { get; set; }
        public Pigeon Pigeon { get; set; }

        public string SenderName { get; set; }
        public int SenderAddressId { get; set; }
        public Address SenderAddress { get; set; }
        public string SenderEmail { get; set; }
        public string SenderPhoneNumber { get; set; }

        public string ReceiverName { get; set; }
        public int ReceiverAddressId { get; set; }
        public Address ReceiverAddress { get; set; }
        public string ReceiverEmail { get; set; }
        public string ReceiverPhoneNumber { get; set; }
    }
}
