using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace JInvoice.API.IdentityModels
{
    public class ApplicationUser: IdentityUser
    {
        [Column(TypeName = "nvarchar(150)")]
        public string? FullName { get; set; }
    }
}
