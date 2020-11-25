using System.ComponentModel.DataAnnotations.Schema;

namespace Api.BLL.Entities
{
    public abstract class Worker : User
    {
        [ForeignKey("Warehouse")]
        public int WarehouseId { get; set; }
        public Warehouse Warehouse { get; set; }
    }
}
