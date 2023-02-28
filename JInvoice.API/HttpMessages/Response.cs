namespace JInvoice.API.HttpMessages
{
    public abstract class Response
    {
        public List<string> Messages { get; private set; } = new List<string>();
        public bool IsSuccess { get; set; }
        public int StatusCode { get; set; }
        public Paginator Paginator { get; set; }

        public Response()
        {
            Paginator = new Paginator();
        }
        public virtual void AddMessage(string message)
        {
            Messages.Add(message);
        }
    }

    public class ResponseTyped<T> : Response
    {
        public T? Result { get; set; }
    }
}
