using JInvoice.DAL.Context;
using JInvoice.Models.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JInvoice.DAL.Repository
{
    public class CategoryRepository: BaseRepository<Category>
    {
        public CategoryRepository(JInvoiceDB context)
            :base(context) 
        { 
        }
        public override Category Get(int Id)
        {
            var category = _context.Categories
                                    .Single(x => x.CategoryID == Id);

            return category;
        }

        public override Category Update(Category entity)
        {

            var toUpdate = _context.Categories
                                   .Single(x => x.CategoryID == entity.CategoryID);

            toUpdate.Name = entity.Name;
            toUpdate.IsActive = entity.IsActive;

            return base.Update(toUpdate);
        }
    }
}
