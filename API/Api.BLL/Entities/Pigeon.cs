using System.Collections.Generic;

namespace Api.BLL.Entities
{
    public class Pigeon : Worker
    {
        public IList<PigeonParcel> Parcels { get; set; }
    }
}
