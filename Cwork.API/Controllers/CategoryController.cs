using Cwork.Domain.Models.Input;
using Cwork.Domain.Models.Output;
using Cwork.Service.Implimentation;
using Cwork.Service.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Cwork.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _repo;

        public CategoryController(ICategoryRepository repo)
        {
            _repo = repo;
        }

        [HttpPost]
        [Route("createCategory")]

        public IActionResult CreateNewCategory(CategoryModel model)
        {
            return Ok(_repo.CreateCategory(model));
        }

        [HttpPost]
        [Route("listCategories")]
        public IActionResult ListCategories()
        {
            return Ok(_repo.GetAllCategories());
        }
        [HttpPost]
        [Route("recentCategory")]
        public IActionResult RecentCategories()
        {
            return Ok(_repo.GetRecentCategory());
        }
        [HttpPost]
        [Route("deleteCategory")]
        public IActionResult DeleteCategory(int id)
        {
            return Ok(_repo.DeleteCategory(id));
        }
        [HttpPost]
        [Route("updateCategory")]
        public IActionResult UpdateCategory(int id, CategoryUpdateDTO category)
        {
            return Ok(_repo.UpdateCategory(id, category));
        }
        [HttpGet]
        [Route("categoryByWeight")]
        public IActionResult GetCategoryByWeight(decimal weight)
        {
            return Ok(_repo.GetCategoryByWeight(weight));
        }
        [HttpGet]
        [Route("categoryById")]
        public IActionResult GetCategoryById(int id)
        {
            return Ok(_repo.GetCategoryById(id));
        }

    }
}
