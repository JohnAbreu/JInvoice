using Newtonsoft.Json;

namespace JInvoice.API.HttpMessages
{
    public class Paginator
    {
        [JsonProperty("skipRecords")]
        public int SkipRecords { get; set; }
        [JsonProperty("takeRecords")]
        public int TakeRecords { get; set; }
        [JsonProperty("totalRecords")]
        public int TotalRecords { get; set; }
    }
}
