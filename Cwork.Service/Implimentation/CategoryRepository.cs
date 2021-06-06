using Cwork.Domain.Models.Input;
using Cwork.Persistance;
using Cwork.Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using Cwork.Domain.Models.Output;

namespace Cwork.Service.Implimentation
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly DataContext _data;
        private readonly IVehicleRepository _vehicle;
        private readonly IUserAccessor _user;
        public CategoryRepository(DataContext data, IVehicleRepository vehicle, IUserAccessor user)
        {
            _user = user;
            _data = data;
            _vehicle = vehicle;
        }
        public int CreateCategory(CategoryModel model)
        {
             if(_user.GetUserRole() == "Admin"){
            var category = new CategoryModel
            {
                CategoryName = model.CategoryName,
                MinWeight = model.MinWeight,
                MaxWeight = model.MaxWeight,
                Icon = model.Icon
            };
            _data.Categories.Add(category);
            return _data.SaveChanges();
             }
             return 0;
        }

        public List<CategoryModel> GetAllCategories()
        {
            var categories = _data.Categories.OrderBy(c => c.MinWeight).ToList();
            return categories;
        }

        public CategoryModel GetRecentCategory()
        {
            var categories = _data.Categories.OrderByDescending(x => x.MaxWeight).First();
            if (categories == null)
            {
                throw new Exception("Not Found");
            }
            return categories;
        }

        public CategoryModel GetCategoryById(int id)
        {
            var category = _data.Categories.Where(x => x.CategoryId == id).FirstOrDefault();
            return category;
        }

        public int DeleteCategory(int id)
        {
             if(_user.GetUserRole() == "Admin"){
            var category = _data.Categories.Where(x => x.CategoryId == id).FirstOrDefault();
            if (category.MinWeight == 0)
            {
                Console.WriteLine("1st row in DB, You cannot delete it, rather try updating the max weight.");
                return 0;
            }

            else
            {
                var minWeightOfDeletedRow = category.MinWeight;
                var maxWeightOfDeletedRow = category.MaxWeight;
                _data.Remove(category);
                Console.WriteLine("Category deleted");
                // now get next row
                var nextCategory = _data.Categories.Where(e => e.MinWeight == (maxWeightOfDeletedRow + 1)).FirstOrDefault();
                if (nextCategory == null)
                {
                    Console.WriteLine("Last Row Deleted", nextCategory);
                    _data.Remove(category);
                }
                else
                {
                    Console.WriteLine("THis should not come");
                    nextCategory.MinWeight = minWeightOfDeletedRow;
                    Console.WriteLine("Category deleted", nextCategory);
                    _data.Categories.Update(nextCategory);
                }
            }
            _data.SaveChanges();
            return 1;
             }
             return 0;

        }

        public CategoryModel GetCategoryByWeight(decimal weight)
        {
            var category = _data.Categories.Where(x => x.MaxWeight >= weight).FirstOrDefault();
            if (category == null)
            {
                throw new Exception("Not Found");
            }
            return category;
        }
        public string UpdateCategory(int id, CategoryUpdateDTO category)
        {
             if(_user.GetUserRole() == "Admin"){
            var categoryToUpdate = _data.Categories.Where(x => x.CategoryId == id).FirstOrDefault();
            var oldMinWeight = categoryToUpdate.MinWeight;
            var oldMaxWeight = categoryToUpdate.MaxWeight;

            categoryToUpdate.CategoryName = category.CategoryName;
            categoryToUpdate.Icon = category.Icon;

            if (oldMinWeight != category.MinWeight || oldMaxWeight != category.MaxWeight)
            {
                if (category.MinWeight < category.MaxWeight && category.MinWeight >= 0)
                {
                    var previousCategory = _data.Categories.Where(e => e.MaxWeight == (oldMinWeight - 1)).FirstOrDefault();
                    var nextCategory = _data.Categories.Where(x => x.MinWeight == (oldMaxWeight + 1)).FirstOrDefault();

                    categoryToUpdate.MinWeight = category.MinWeight;
                    if (previousCategory != null)
                    {
                        foreach (var prevCat in GetAllCategories().Where(c => c.MinWeight < oldMinWeight && c.CategoryName != categoryToUpdate.CategoryName).OrderByDescending(d => d.MaxWeight))
                        {
                            if (category.MinWeight <= prevCat.MinWeight)
                            {
                                var vehiclesToUpdate = _data.Vehicles.Where(c => c.CategoryId == prevCat.CategoryId).ToList();
                                _vehicle.ReassignCategory(vehiclesToUpdate, category.CategoryId);
                                DeleteCategory(prevCat.CategoryId);
                                if (prevCat.MinWeight == 0)
                                    _data.Remove(prevCat);
                            }

                            else
                            {
                                var vehiclesToUpdate = _data.Vehicles.Where(c => c.CategoryId == prevCat.CategoryId && c.Weight >= category.MinWeight).ToList();
                                _vehicle.ReassignCategory(vehiclesToUpdate, category.CategoryId);
                                prevCat.MaxWeight = category.MinWeight - 1;
                                _data.Categories.Update(prevCat);
                                break;
                            }
                        }
                    }

                    categoryToUpdate.MaxWeight = category.MaxWeight;
                    if (nextCategory != null)
                    {
                        foreach (var nextCat in GetAllCategories().Where(c => c.MaxWeight > oldMaxWeight && c.CategoryName != categoryToUpdate.CategoryName))
                        {
                            if (category.MaxWeight >= nextCat.MaxWeight)
                            {
                                var vehiclesToUpdate = _data.Vehicles.Where(c => c.CategoryId == nextCat.CategoryId).ToList();
                                _vehicle.ReassignCategory(vehiclesToUpdate, category.CategoryId);
                                DeleteCategory(nextCat.CategoryId);
                            }
                            else
                            {
                                var vehiclesToUpdate = _data.Vehicles.Where(c => c.CategoryId == nextCat.CategoryId && c.Weight <= category.MaxWeight).ToList();
                                _vehicle.ReassignCategory(vehiclesToUpdate, category.CategoryId);
                                nextCat.MinWeight = category.MaxWeight + 1;
                                _data.Categories.Update(nextCat);
                                break;
                            }
                        }
                    }
                }
                else
                    return ("Min weight should be smaller than Max weight and not less than 0!");
            }
            _data.Categories.Update(categoryToUpdate);
            _data.SaveChanges();
            return ("Updated successfully");
             }
             return("Access to Admin Only!");
        }
    }
}
