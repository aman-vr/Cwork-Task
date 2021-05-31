using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cwork.Domain.Models.Input
{
    public class CategoryModel
    {
        [Key]
        public int CategoryId { get; set; }
        [Required]
        public string CategoryName { get; set; }
        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal MinWeight { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        [Required]
        public decimal MaxWeight { get; set; }
        public string Icon { get; set; }
        public List<VehicleModel> VehicleModels { get; set; }

    }
}
