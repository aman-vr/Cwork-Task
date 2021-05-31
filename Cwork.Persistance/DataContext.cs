using Cwork.Domain.Models.Input;
using Microsoft.EntityFrameworkCore;

namespace Cwork.Persistance
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<CategoryModel> Categories { get; set; }
        public DbSet<ManufacturerModel> Manufacturers { get; set; }
        public DbSet<VehicleModel> Vehicles { get; set; }
    }
}
