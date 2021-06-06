using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Cwork.Domain.Models.Input
{
    public class VehicleModel
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string OwnerName { get; set; }
        [Required]
        public DateTime CreatedOn { get; set; } = DateTime.Now.Date;
        public string EmailId { get; set; }
        [Required]

        public string Year { get; set; }
        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal Weight { get; set; }
        [Required]
        [ForeignKey("ManufacturerModel")]
        public int ManufacturingId { get; set; }
        [Required]
        [ForeignKey("CategoryModel")]

        public int CategoryId { get; set; }

        public ManufacturerModel ManufacturerModel { get; set; }
        public CategoryModel CategoryModel { get; set; }
    }
}
