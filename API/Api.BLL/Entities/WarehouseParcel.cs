using System.ComponentModel.DataAnnotations.Schema;

namespace Api.BLL.Entities
{
    public class WarehouseParcel
    {
        public int WarehouseId { get; set; }
        public uint ParcelId { get; set; }

        public Warehouse Warehouse { get; set; }
        public Parcel Parcel { get; set; }
    }
}
