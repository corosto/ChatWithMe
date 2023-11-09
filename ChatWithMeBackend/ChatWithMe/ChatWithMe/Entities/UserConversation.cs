namespace ChatWithMe.Entities
{
    public class UserConversation
    {
        public int UserId { get; set; }
        public User User { get; set; }
        public Conversation Conversation { get; set; }
        public int ConversationId { get; set; }
        public bool IsRead { get; set; }
        public bool IsSuperLiked { get; set; }
    }
}
