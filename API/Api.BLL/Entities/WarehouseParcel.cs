﻿using System;

namespace Api.BLL.Entities
{
    public class WarehouseParcel
    {
        public int WarehouseId { get; set; }
        public long ParcelId { get; set; }
        public DateTime DateOfArrival { get; set; }

        public Warehouse Warehouse { get; set; }
        public Parcel Parcel { get; set; }
    }
}
