using System;
using System.Collections.Generic;
using System.Text;

namespace Api.BLL.Entities
{
    public class Sparrow : User
    {
        public IEnumerable<Parcel> Parcels { get; set; }
    }
}
