namespace ChatWithMe.Models.ChatDtos;

public class NewConversationEventDto
{
    public int FirstUserId { get; set; }
    public int SecondUserId { get; set; }
    public string FirstUserName { get; set; } = null!;
    public string SecondUserName { get; set; } = null!;
    public string FirstUserImage { get; set; } = null!;
    public string SecondUserImage { get; set; } = null!;
    public bool FirstUserSuperLiked { get; set; }
    public bool SecondUserSuperLiked { get; set; }
}