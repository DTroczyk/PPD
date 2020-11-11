using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

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
