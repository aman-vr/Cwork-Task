using Cwork.Domain.Models;
using Cwork.Domain.Models.Input;
using Cwork.Domain.Models.Output;
using Cwork.Persistance;
using Cwork.Service.Interface;
using Cwork.Service.Utils;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Cwork.Service.Implimentation
{


    public class VehicleRepository : IVehicleRepository
    {
        private readonly DataContext _data;
        private readonly SendEmail _sendEmail;
        public VehicleRepository(DataContext data, SendEmail sendEmail)
        {
            _sendEmail = sendEmail;
            _data = data;
        }

        public int CreateVehicle(VehicleDTO model)
        {

            var vehicle = new VehicleModel
            {
                OwnerName = model.OwnerName,
                EmailId = model.EmailId,
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
            var vehicles = _data.Vehicles.Include(c => c.CategoryModel).Include(m => m.ManufacturerModel).OrderByDescending(x => x.CategoryId).ToList();
            Console.WriteLine(vehicles);
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
            foreach(var vehicle in vehiclesToUpdate)
            {
                vehicle.CategoryId = newCategoryId;
                _data.Vehicles.Update(vehicle);
            }
            _data.SaveChanges();
            return 1;
        }
    }
}

