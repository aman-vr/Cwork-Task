﻿using Cwork.Domain.Models.Input;
using Cwork.Service.Implimentation;
using Cwork.Service.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cwork.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManufacturerController : ControllerBase
    {
        private readonly IManufacturerRepository _repo;

        public ManufacturerController(IManufacturerRepository repo)
        {
            _repo = repo;
        }

        [HttpPost]
        [Route("createManufacturer")]
        [Authorize]//Admin ONLY
        public IActionResult CreateNewManufacturer(ManufacturerModel model)
        {
            return Ok(_repo.CreateManufacturer(model));
        }

        [HttpPost]
        [Route("listManufacturers")]
        [AllowAnonymous]
        public IActionResult ListManufacturer()
        {
            return Ok(_repo.GetAllManufacturer());
        }
    }
}
