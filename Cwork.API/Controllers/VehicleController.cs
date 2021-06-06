using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cwork.Domain.Models.Input;
using Cwork.Domain.Models.Output;
using Cwork.Domain.Models.Authentication;
using Cwork.Persistance;
using Cwork.Service.Implimentation;
using Cwork.Service.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Cwork.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class VehicleController : ControllerBase
    {
        private readonly IVehicleRepository _repo;

        public VehicleController(IVehicleRepository repo)
        {
            _repo = repo;
        }

        [HttpPost]
        [Route("createVehicle")]
        public IActionResult CreateNewVehicle(VehicleDTO model)
        {
            return Ok(_repo.CreateVehicle(model));
        }

        [HttpPost]
        [Route("listVehicles")]
        //Authorize : Admin Only
        public IActionResult ListVehicles()
        {
            return Ok(_repo.GetAllVehicles());
        }
        [HttpPost]
        [Route("listVehiclesByUser")]
        public IActionResult ListVehiclesByUser(UserDTO user)
        {
            return Ok(_repo.GetVehiclesByUser());
        }
    }
}
