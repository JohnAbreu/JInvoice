using JInvoice.DAL.Context;
using JInvoice.Models.Models;

namespace JInvoice.DAL.Repository
{
    public class ProductRepository : BaseRepository<Product>
    {
        public  ProductRepository(JInvoiceDB context) : base(context)
        {
        }
    }
}
