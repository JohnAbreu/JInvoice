using JInvoice.DAL.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace JInvoice.DAL.Repository
{
    public class BaseRepository<T> : IRepository<T> where T : class
    {
        protected JInvoiceDB _context;
        public BaseRepository(JInvoiceDB context)
        {
            _context = context;
        }


        public virtual T Add(T entity)
        {
            return _context.Add(entity).Entity;
        }

        public virtual IEnumerable<T> All()
        {
            return _context.Set<T>()
                           .ToList();
        }

        public bool Delete(T entity)
        {
            _context.Remove(entity);
            return true;
        }

        public virtual IEnumerable<T> Find(Expression<Func<T, bool>> predicate)
        {
            return _context.Set<T>()
                           .AsQueryable()
                           .Where(predicate)
                           .ToList();
        }

        public virtual T Get(int Id)
        {
            return _context.Find<T>(Id);
        }

        public virtual void SaveChanges()
        {
            _context.SaveChanges();
        }

        public virtual T Update(T entity)
        {
            return _context.Update(entity).Entity;
        }
    }


}
