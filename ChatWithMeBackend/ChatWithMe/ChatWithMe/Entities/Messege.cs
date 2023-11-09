using System.Diagnostics.Metrics;

namespace ChatWithMe.Entities
{
    public class Message
    {
        public int Id { get; set; }
        public DateTimeOffset Date { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public string Text { get; set; }
        public Conversation Conversation { get; set; }
        public int ConversationId { get; set; }
    }
}
