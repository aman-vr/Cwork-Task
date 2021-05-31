using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Cwork.Domain.Models.Input
{
    public class ManufacturerModel
    {
        [Key]
        public int ManufacturingId { get; set; }
        [Required]
        public string ManufacturerName { get; set; }
        public List<VehicleModel> VehicleModels { get; set; }

    }
}
