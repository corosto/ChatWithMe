namespace ChatWithMe.Models.ChatDtos;

public class ConversationInfoDto
{
	public int Id { get; set; }
	public string WithUser { get; set; } = null!;
	public int WithUserId { get; set; }
	public string? WithUserConnectionId { get; set; }
	public int? WithUserConnectedChatId { get; set; }
	public bool IsRead { get; set; }
    public bool IsSuperLiked { get; set; }
    public string UserImage { get; set; } = null!;
}