using Api.BLL.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Api.ViewModels.VMs
{
    public class WarehouseVm
    {
        public Warehouse Warehouse { get; set; }

        public DateTime DateOfArrival { get; set; }
    }
}
