namespace Cwork.Domain.Models.Output
{
    public class CategoryUpdateDTO
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public decimal MinWeight { get; set; }
        public decimal MaxWeight { get; set; }
        public string Icon { get; set; }
    }
}