using System.ComponentModel.DataAnnotations.Schema;

namespace JInvoice.Models.Models
{
    public class Product
    {
        public int ProductID { get; set; }
        public int CategoryID { get; set; }
        [Column(TypeName = "nvarchar(150)")]
        public string Name { get; set; } = string.Empty;
        [Column(TypeName = "nvarchar(225)")]
        public string Description { get; set; } = string.Empty;
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal OnHand { get; set; }
        [Column(TypeName = "nvarchar(128)")]
        public string CreatedBy { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedOn { get; set; }
        [Column(TypeName = "varbinary(max)")]
        public byte[]? Image { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string? ImageCoverName { get; set; }
        [Column(TypeName = "nvarchar(255)")]
        public string? ImageCoverPath { get; set; }
        [ForeignKey("CategoryID")]
        public virtual Category Category { get; set; }
    }
}
