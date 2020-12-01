using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Api.BLL.Entities;

namespace Api.Services.Interfaces
{
    interface IParcelService
    {
        public void SendParcel(Parcel parcel);

    }
}
