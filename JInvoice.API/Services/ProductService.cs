using JInvoice.API.HttpMessages;
using JInvoice.API.ViewModels;
using JInvoice.DAL.Repository;
using JInvoice.Models.Models;
using Microsoft.AspNetCore.Mvc;
using static System.Net.Mime.MediaTypeNames;

namespace JInvoice.API.Services
{
    public class ProductService
    {
        private readonly IRepository<Product> repository;
        public ProductService(IRepository<Product> productRepository)
        {
            repository = productRepository;
        }

        public IEnumerable<Product> Filter(RequestQuery requestQuery)
        {
            var products = repository.All();
            if (requestQuery != null)
            {
                if (!string.IsNullOrEmpty(requestQuery?.Name))
                {
                    products = products.Where(x => x.Name.ToLower().Contains(requestQuery.Name.ToLower()));
                }
                if (requestQuery.CategoryID != 0 && requestQuery.CategoryID != null)
                {
                    products = products.Where(x => x.CategoryID == requestQuery.CategoryID);
                }
                if (requestQuery.IsActive.HasValue)
                {
                    products = products.Where(x => x.IsActive == requestQuery.IsActive.Value);
                }
            }
            return products;
        }

        public async Task UploadImages(IFormFile fileImage, Product product)
        {
            using (var ms = new MemoryStream())
            {
                await fileImage.CopyToAsync(ms);
                product.Image = ms.ToArray();
                product.ImageCoverName = fileImage.FileName;
            }
        }
    }
}
