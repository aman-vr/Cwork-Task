using System;
using System.Collections.Generic;
using System.Text;

namespace Cwork.Domain.Models.Output
{
 public   class VehicleListDTO
    {
        public string OwnerName { get; set; }
        public string Year { get; set; }
        public decimal Weight { get; set; }
        public string CategoryName { get; set; }
        public string CategoryIcon { get; set; }
        public string ManufacturerName { get; set; }

    }
}
