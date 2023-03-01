using JInvoice.DAL.Context;
using JInvoice.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JInvoice.DAL.Repository
{
    public class ProductUnitOfWork : IProductUnitOfWork
    {
        private readonly JInvoiceDB _context;
        public ProductUnitOfWork(JInvoiceDB context)
        {
            _context = context;
        }
        private IRepository<Product> _productRepository;
        public IRepository<Product> ProductRepository
        {
            get
            {
                if (_productRepository == null)
                {
                    _productRepository = new ProductRepository(_context);
                }
                return _productRepository;
            }
        }

        public IRepository<ProductImage> _productImageRepository;
        public IRepository<ProductImage> ProductImageRepository
        {
            get
            {
                if (_productImageRepository == null)
                {
                    _productImageRepository = new ProductImageRepository(_context);
                }
                return _productImageRepository;
            }
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}
