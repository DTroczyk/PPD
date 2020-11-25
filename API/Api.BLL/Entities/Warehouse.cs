using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.BLL.Entities
{
    public class Warehouse
    {
        [Key]
        public int Id { get; set; }
        public IList<WarehouseParcel> Histories { get; set; }
        [ForeignKey("Address")]
        public int AddressId { get; set; }
        public Address Address { get; set; }
    }
}
