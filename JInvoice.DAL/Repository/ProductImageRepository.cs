using JInvoice.DAL.Context;
using JInvoice.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JInvoice.DAL.Repository
{
    public class ProductImageRepository: BaseRepository<ProductImage>
    {
        public ProductImageRepository(JInvoiceDB context)
        :base(context){ }     
    }
}
