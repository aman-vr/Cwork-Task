using Cwork.Domain.Models.Input;
using Cwork.Persistance;
using Cwork.Service.Interface;
using System.Collections.Generic;
using System.Linq;

namespace Cwork.Service.Implimentation
{


    public class ManufacturerRepository : IManufacturerRepository
    {
        private readonly DataContext _data;

        public ManufacturerRepository(DataContext data)
        {
            _data = data;
        }
        public int CreateManufacturer(ManufacturerModel model)
        {

            var manufacturer = new ManufacturerModel
            {
                ManufacturerName = model.ManufacturerName
            };
            _data.Manufacturers.Add(manufacturer);
            return _data.SaveChanges();

        }

        public List<ManufacturerModel> GetAllManufacturer()
        {
            var manufacturer = _data.Manufacturers.ToList();
            return manufacturer;
        }
    }
}
