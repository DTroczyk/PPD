using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Api.ViewModels.DTOs
{
    public class ParcelDto
    {
        public string ParcelTypeId { get; set; }

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
