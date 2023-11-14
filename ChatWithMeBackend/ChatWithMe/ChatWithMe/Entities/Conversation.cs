using System.Diagnostics.Metrics;

namespace ChatWithMe.Entities
{
    public class Conversation
    {
        public int Id { get; set; }
        public List<UserConversation> UserConversation { get; set; }
        public List<Message> Messages { get; set; }
        public bool IsHidden { get; set; }
    }
}
