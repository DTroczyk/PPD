using System.ComponentModel.DataAnnotations.Schema;

namespace Api.BLL.Entities
{
    public class PigeonParcel
    {
        public string PigeonLogin { get; set; }
        public uint ParcelId { get; set; }

        [ForeignKey("ParcelId")]
        public Parcel Parcel { get; set; }

        [ForeignKey("PigeonLogin")]
        public Pigeon Pigeon { get; set; }
    }
}
