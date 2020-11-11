using System;
using System.Collections.Generic;
using System.Text;

namespace Api.BLL.Entities
{
    public class Pigeon : User
    {
        public IList<PigeonParcel> Parcels { get; set; }
    }
}
