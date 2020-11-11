using System;
using System.Collections.Generic;
using System.Text;

namespace Api.BLL.Entities
{
    public class Stork
    {
        public int WarehouseId { get; set; }
        public Warehouse Warehouse { get; set; }
    }
}
