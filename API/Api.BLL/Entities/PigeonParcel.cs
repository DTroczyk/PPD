using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Api.BLL.Entities
{
    public class PigeonParcel
    {
        public string PigeonLogin { get; set; }
        public string ParcelId { get; set; }

        //[ForeignKey("ParcelId")]
        public Parcel Parcel { get; set; }

        //[ForeignKey("PigeonLogin")]
        public Pigeon Pigeon { get; set; }
    }
}
