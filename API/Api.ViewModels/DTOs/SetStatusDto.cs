using Api.BLL.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Api.ViewModels.DTOs
{
    public class SetStatusDto
    {
        public long ParcelId { get; set; }
        public ParcelStatus ParcelStatus { get; set; }
    }
}
