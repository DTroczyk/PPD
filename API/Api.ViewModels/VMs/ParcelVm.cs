using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using Api.BLL.Entities;

namespace Api.ViewModels.VMs
{
    public class ParcelVm
    {
        public long Id { get; set; }
        public ParcelType ParcelType { get; set; }
        public DateTime SendDate { get; set; }

        public string SenderName { get; set; }
        public string SenderCity { get; set; }
        public string SenderStreet { get; set; }
        public string SenderPostalCode { get; set; }
        public string SenderHouseNumber { get; set; }
        public string SenderEmail { get; set; }
        public string SenderPhoneNumber { get; set; }

        public string ReceiverName { get; set; }
        public string ReceiverCity { get; set; }
        public string ReceiverStreet { get; set; }
        public string ReceiverPostalCode { get; set; }
        public string ReceiverHouseNumber { get; set; }
        public string ReceiverEmail { get; set; }
        public string ReceiverPhoneNumber { get; set; }
    }
}
