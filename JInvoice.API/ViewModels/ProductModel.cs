using JInvoice.Models.Models;

namespace JInvoice.API.ViewModels
{
    public class ProductModel
    {
        public int ProductID { get; set; }
        public int CategoryID { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public decimal OnHand { get; set; }
        public string CreatedBy { get; set; } = string.Empty;
        public bool IsActive { get; set; }
        public DateTime CreatedOn { get; set; }
        public Category? Category { get; set; }

        public ProductModel MapToModel(Product product)
        {
            return new ProductModel
            {
                ProductID = product.ProductID,
                CategoryID = product.CategoryID,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                OnHand = product.OnHand,
                CreatedBy = product.CreatedBy,
                IsActive = product.IsActive,
                Category = product.Category,
                CreatedOn = product.CreatedOn
            };
        }

        public Product MapToDomain()
        {
            return new Product
            {
                ProductID = this.ProductID,
                CategoryID = this.CategoryID,
                Name = this.Name,
                Description = this.Description,
                Price = this.Price,
                OnHand = this.OnHand,
                CreatedBy = this.CreatedBy,
                IsActive = this.IsActive,
                Category = this.Category,
                CreatedOn = this.CreatedOn
            };
        }

        public void MapToDomainForUpdate(Product product)
        {
            product.CategoryID = this.CategoryID;
            product.Name = this.Name;
            product.Description = this.Description;
            product.Price = this.Price;
            product.IsActive = this.IsActive;
        }
    }
}
