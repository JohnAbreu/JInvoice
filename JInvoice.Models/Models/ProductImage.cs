using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace JInvoice.Models.Models
{
    public class ProductImage
    {
        public Guid ProductImageID { get; set; }
        public int ProductID { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string? Image1Name { get; set; }
        [Column(TypeName = "nvarchar(255)")]
        public string? Image1Path { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string? Image2Name { get; set; }
        [Column(TypeName = "nvarchar(255)")]
        public string? Image2Path { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string? Image3Name { get; set; }
        [Column(TypeName = "nvarchar(255)")]
        public string? Image3Path { get; set; }

        [ForeignKey("ProductID")]
        public virtual Product Product { get; set; }
    }
}
