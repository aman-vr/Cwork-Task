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
        private readonly IUserAccessor _user;

        public ManufacturerRepository(DataContext data, IUserAccessor user)
        {
            _data = data;
            _user = user;
        }
        public int CreateManufacturer(ManufacturerModel model)
        {
            if(_user.GetUserRole() == "Admin"){
                var manufacturer = new ManufacturerModel
                {
                    ManufacturerName = model.ManufacturerName
                };
                _data.Manufacturers.Add(manufacturer);
                return _data.SaveChanges();
            }
            return 0;
        }

        public List<ManufacturerModel> GetAllManufacturer()
        {
            var manufacturer = _data.Manufacturers.ToList();
            return manufacturer;
        }
    }
}
