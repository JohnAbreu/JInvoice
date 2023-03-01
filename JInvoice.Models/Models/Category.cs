using System.ComponentModel.DataAnnotations.Schema;

namespace JInvoice.Models.Models
{
    public class Category
    {
        public int CategoryID { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string Name { get; set; }
        public bool IsActive { get; set; }
        [Column(TypeName = "nvarchar(128)")]
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
