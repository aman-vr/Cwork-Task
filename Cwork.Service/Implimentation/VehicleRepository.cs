using Cwork.Domain.Models;
using Cwork.Domain.Models.Input;
using Cwork.Domain.Models.Output;
using Cwork.Persistance;
using Cwork.Service.Interface;
using Cwork.Service.Utils;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Cwork.Service.Implimentation
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly DataContext _data;
        private readonly SendEmail _sendEmail;
        private readonly IUserAccessor _user;
        public VehicleRepository(DataContext data, SendEmail sendEmail, IUserAccessor user)
        {
            _user = user;
            _sendEmail = sendEmail;
            _data = data;
        }
        public int CreateVehicle(VehicleDTO model)
        {
            var vehicle = new VehicleModel
            {
                OwnerName = model.OwnerName,
                EmailId = _user.GetCurrentUser(),
                Weight = model.Weight,
                Year = model.Year,
                CategoryId = model.CategoryId,
                ManufacturingId = model.ManufacturingId
            };
            _data.Vehicles.Add(vehicle);
            _data.SaveChanges();

            var emailObj = new EmailModel()
            {
                toname = vehicle.OwnerName,
                toemail = vehicle.EmailId,
                subject = $"Vehicle User Created",
                message = "Your record is created.",
                isHtml = false,

            };
            _sendEmail.SendEmailHelper(emailObj);
            return 1;
        }
        public List<VehicleListDTO> GetAllVehicles()
        {
            if(_user.GetUserRole() == "Admin"){
                var vehicles = _data.Vehicles.Include(c => c.CategoryModel).Include(m => m.ManufacturerModel).OrderByDescending(x => x.CategoryId).ToList();
                return vehicles.Select(c => new VehicleListDTO
                {
                    OwnerName = c.OwnerName,
                    Weight = c.Weight,
                    Year = c.Year,
                    CategoryName = c.CategoryModel.CategoryName,
                    CategoryIcon = c.CategoryModel.Icon,
                    ManufacturerName = c.ManufacturerModel.ManufacturerName

                }).ToList();
            }
            return null;
        }
        public List<VehicleListDTO> GetVehiclesByUser()
        {
            var vehicles = _data.Vehicles.Include(c => c.CategoryModel).Include(m => m.ManufacturerModel).Where(u => u.EmailId == _user.GetCurrentUser()).OrderByDescending(x => x.CategoryId).ToList();
            return vehicles.Select(c => new VehicleListDTO
            {
                OwnerName = c.OwnerName,
                Weight = c.Weight,
                Year = c.Year,
                CategoryName = c.CategoryModel.CategoryName,
                CategoryIcon = c.CategoryModel.Icon,
                ManufacturerName = c.ManufacturerModel.ManufacturerName
            }).ToList();
        }
        public int ReassignCategory(List<VehicleModel> vehiclesToUpdate, int newCategoryId)
        {
            foreach (var vehicle in vehiclesToUpdate)
            {
                vehicle.CategoryId = newCategoryId;
                _data.Vehicles.Update(vehicle);
            }
            _data.SaveChanges();
            return 1;
        }
    }
}

