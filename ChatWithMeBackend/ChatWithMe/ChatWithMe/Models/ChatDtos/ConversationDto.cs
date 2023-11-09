namespace ChatWithMe.Models.ChatDtos;

public class ConversationDto
{
    public int Id { get; set; }
    public string WithUser { get; set; } = null!;
    public int WithUserId { get; set; }
    public string UserImage { get; set; } = null!;
    public MessageDto? LastMessage { get; set; }
    public bool IsRead { get; set; }
    public bool IsSuperLiked { get; set; }
}