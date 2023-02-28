using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace JInvoice.API.IdentityModels
{
    public class UserContext :IdentityDbContext
    {
        public UserContext(DbContextOptions<UserContext> options)
            : base(options)
                {

                }

        public DbSet<ApplicationUser> User { get; set; }
    }
}
