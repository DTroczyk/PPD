using System;
using System.Collections.Generic;
using System.Text;

namespace Api.BLL.Entities
{
    public class Warehouse
    {
        public int Id { get; set; }
        public Address Address { get; set; }
        public IList<WarehouseParcel> Histories { get; set; }
    }
}
