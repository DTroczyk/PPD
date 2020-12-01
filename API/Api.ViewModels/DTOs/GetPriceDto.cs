using System;
using System.Collections.Generic;
using System.Text;

namespace Api.ViewModels.DTOs
{
    public class GetPriceDto
    {
        public string ParcelType { get; set; }
        public string ParcelDescription { get; set; }
        public int Price { get; set; }
    }
}
