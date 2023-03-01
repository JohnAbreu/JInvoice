using JInvoice.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JInvoice.DAL.Repository
{
    public interface IProductUnitOfWork
    {
        IRepository<Product> ProductRepository { get; }
        IRepository<ProductImage> ProductImageRepository { get; }

        void SaveChanges();
    }
}
