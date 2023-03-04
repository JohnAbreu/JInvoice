using JInvoice.Models.Models;

namespace JInvoice.API.ViewModels
{
    public class CategoryModel
    {
        public int CategoryID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; } 
        public bool IsActive { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }

        public Category MapToDomain()
        {
            return new Category
            {
                Name = this.Name,
                Description = this.Description,
                CategoryID = this.CategoryID,
                CreatedBy = this.CreatedBy,
                CreatedOn = this.CreatedOn,
                IsActive = this.IsActive
            };
        }

        public CategoryModel MapToModel(Category category)
        {
            return new CategoryModel
            {
                Name = category.Name,
                Description = category.Description,
                CategoryID = category.CategoryID,
                CreatedBy = category.CreatedBy,
                CreatedOn = category.CreatedOn,
                IsActive = category.IsActive
            };
        }

        public void MapToDomainForUpdate(Category category)
        {
            category.Name = this.Name;
            category.Description = this.Description;
            category.CategoryID = this.CategoryID;
            category.IsActive = this.IsActive;
        }
    }
}
