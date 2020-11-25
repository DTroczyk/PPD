using System.ComponentModel.DataAnnotations;

namespace Api.BLL.Entities
{
    public class ParcelType
    {
        [Key]
        public string Name { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
    }
}
