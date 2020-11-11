using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Api.BLL.Entities
{
    public class WarehouseParcel
    {
        public int WarehouseId { get; set; }
        public string ParcelId { get; set; }

        [ForeignKey("WarehouseId")]
        public Warehouse Warehouse { get; set; }

        [ForeignKey("ParcelId")]
        public Parcel Parcel { get; set; }
    }
}
