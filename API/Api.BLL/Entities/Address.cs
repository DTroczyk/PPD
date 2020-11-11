using System;
using System.Collections.Generic;
using System.Text;

namespace Api.BLL.Entities
{
    public class Address
    {
        public int Id { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string PostalCode { get; set; }
        public string Number { get; set; }
        public float Latidute { get; set; }
        public float Longitude { get; set; }
    }
}
