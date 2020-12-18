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

        public string City { get; set; }
        public string Street { get; set; }
        public string PostalCode { get; set; }
        public string Number { get; set; }
        public float Latidute { get; set; }
        public float Longitude { get; set; }
    }
}
