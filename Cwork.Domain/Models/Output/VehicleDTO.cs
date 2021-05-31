
using System;
using System.Collections.Generic;
using System.Text;

namespace Cwork.Domain.Models.Output
{
    public class VehicleDTO
    {
        public string OwnerName { get; set; }
        public string EmailId { get; set; }
        public string Year { get; set; }
        public decimal Weight { get; set; }
        public int CategoryId { get; set; }
        public int ManufacturingId { get; set; }

    }
}
