using JInvoice.API.HttpMessages;
using JInvoice.DAL.Repository;
using JInvoice.Models.Models;

namespace JInvoice.API.Services
{
    public class CategoryService
    {
        private readonly IRepository<Category> repository;
        public CategoryService(IRepository<Category> categoryRepository)
        {
            repository = categoryRepository;
        }
        public IEnumerable<Category> Filter(RequestQuery requestQuery)
        {
            var categories = repository.All();
            if (requestQuery != null)
            {
                if (!string.IsNullOrEmpty(requestQuery?.Name))
                {
                    categories = categories.Where(x => x.Name.ToLower().Contains(requestQuery.Name.ToLower()));
                }
                if (requestQuery.IsActive.HasValue)
                {
                    categories = categories.Where(x => x.IsActive == requestQuery.IsActive.Value);
                }
            }
            return categories;
        }
    }
}
