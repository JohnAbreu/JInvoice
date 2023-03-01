using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace JInvoice.Models.Models
{
    public class ProductImage
    {
        public Guid ProductImageID { get; set; }
        public int ProductID { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string? ImageCoverName { get; set; }
        [Column(TypeName = "nvarchar(150)")]
        public string? ImageCoverPath { get; set; }

        [ForeignKey("ProductID")]
        public virtual Product Product { get; set; }
    }
}
