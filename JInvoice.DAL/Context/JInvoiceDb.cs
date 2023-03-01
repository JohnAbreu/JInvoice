using Microsoft.EntityFrameworkCore;
using JInvoice.Models.Models;
using JInvoice.Models;

namespace JInvoice.DAL.Context
{
    public class JInvoiceDB : DbContext
    {
        public JInvoiceDB(DbContextOptions<JInvoiceDB> options)
            : base(options)
        {

        }
        public DbSet<UserEntity> EntityUsers { get; set; }
        public DbSet<Category> Categories { get; set; } 
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductImage> ProductImages { get; set; }

    }
}
