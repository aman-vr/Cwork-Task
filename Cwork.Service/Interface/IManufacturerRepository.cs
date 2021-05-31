using System.Collections.Generic;
using Cwork.Domain.Models.Input;

namespace Cwork.Service.Interface
{
    public interface IManufacturerRepository
    {
        int CreateManufacturer(ManufacturerModel model);
        List<ManufacturerModel> GetAllManufacturer();
    }
}