namespace JInvoice.API.HttpMessages
{
    public class RequestQuery
    {
        public string? Name { get; set; }
        public int? CategoryID { get; set; }
        public string? Description { get; set; }
        public bool? IsActive { get; set; }

    }
}
