using JInvoice.API.HttpMessages;
using JInvoice.DAL.Repository;
using JInvoice.Models.Models;

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
                if (requestQuery.IsActive.HasValue)
                {
                    products = products.Where(x => x.IsActive == requestQuery.IsActive.Value);
                }
            }
            return products;
        }
    }
}
