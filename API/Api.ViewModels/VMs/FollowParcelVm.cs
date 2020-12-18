using Api.BLL.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Api.ViewModels.VMs
{
    public class FollowParcelVm
    {
        public long Id { get; set; }
        public string ParcelStatus { get; set; }
        public IList<Warehouse> Warehouses { get; set; }
        public DateTime SendDate { get; set; }
        public DateTime? ReceivedDate { get; set; }
    }
}
