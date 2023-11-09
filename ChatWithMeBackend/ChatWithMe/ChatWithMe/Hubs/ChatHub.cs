using ChatWithMe.Models.ChatDtos;
using ChatWithMe.Services;
using Microsoft.AspNetCore.SignalR;

namespace ChatWithMe.API.Hubs;

public class ChatHub: Hub
{
	private readonly IChatService _chatService;

	public ChatHub(IChatService chatService)
	{
        _chatService = chatService;
	}

	public async Task Join(string userIdString)
	{
		var userId = int.Parse(userIdString);
		var conversationsIds = _chatService.GetUserConversationsIds(userId);

		foreach (var Id in conversationsIds)
		{
			await Groups.AddToGroupAsync(Context.ConnectionId, Id.ToString());
		}

		_chatService.AddConnectionId(userId, Context.ConnectionId);

		//await ReadNotificationStatus(userId);
	}

    public async Task RestoreAllConversations(string user)
	{
		var userId = int.Parse(user);
		var conversations = _chatService.GetConversations(userId);

		foreach (var conversation in conversations)
		{
			await RestoreConversation(conversation);

			if (conversation.LastMessage is not null)
			{
				await RestoreMessage(conversation.LastMessage);
			}
		}

		//await ReadNotificationStatus(userId);
	}

	public async Task RestoreMessages(int chat, string user)
    {
        var userId = int.Parse(user);

        var conversation = GetFullConversation(chat, userId);

		var messages = GetAllMessages(chat, userId);

		foreach (var message in messages)
		{
			await RestoreMessage(message);
		}

		_chatService.SetCurrentChat(userId, chat);

		//await ReadNotificationStatus(userId);

		if (messages.Any())
		{
			await UpdateConversation(conversation, messages.Last().Date, messages.Last().Text, true);
		}
	}

	private ConversationInfoDto GetFullConversation(int chat, int userId)
	{
        var conversation = _chatService.GetConversation(chat, userId);
        var withUserConnectedChatId = _chatService.GetCurrentChat(conversation.WithUserId);
		conversation.WithUserConnectedChatId = withUserConnectedChatId;
		return conversation;
	}

	private List<MessageDto> GetAllMessages(int chat, int userId)
	{
        var messages = _chatService.GetMessages(chat);
        _chatService.DecrementNotificationStatus(userId, chat);
        return messages;
    }

    public void LeaveChat(string user)
    {
        var userId = int.Parse(user);
		_chatService.SetCurrentChat(userId, null);
	}

	public async Task SendMessage(int chat, string user, string userName, string text)
	{
		var userId = int.Parse(user);
		var date = DateTimeOffset.Now;

        var conversation = _chatService.GetConversation(chat, userId);

        var isFirstMessage = _chatService.SendMessage(userId, chat, date, text, conversation.WithUserConnectedChatId == chat);

		if (isFirstMessage)
		{
			await Groups.AddToGroupAsync(Context.ConnectionId, chat.ToString());

			if (conversation.WithUserConnectionId is not null)
			{
				await Groups.AddToGroupAsync(conversation.WithUserConnectionId, chat.ToString());
			}
		}

		await NewMessage(chat, userId, userName, date, text);

		if (conversation.WithUserConnectedChatId == chat)
		{
			await UpdateConversation(conversation, date, text, true);

			if (conversation.WithUserConnectionId is not null)
			{
				var otherUserConversation = GetFullConversation(chat, conversation.WithUserId);
				await UpdateConversation(conversation.WithUserConnectionId, otherUserConversation, date, text, true);
			}
		}
		else
		{
			await UpdateConversation(conversation, date, text, true);

			if (conversation.WithUserConnectionId is not null)
			{
				var otherUserConversation = GetFullConversation(chat, conversation.WithUserId);

				await UpdateConversation(conversation.WithUserConnectionId, otherUserConversation, date, text, false);
				//await ReadNotificationStatus(conversation.WithUserConnectionId, conversation.WithUserId);
			}
		}
	}

    //private async Task ReadNotificationStatus(int userId)
    //{
    //var status = await _mediator.Send(new ReadNotificationStatusQuery(userId));
    //await Clients.Caller.SendAsync("ReceiveNotificationStatus", status);
    //}

    //private async Task ReadNotificationStatus(string connectionId, int userId)
    //{
    //var status = await _mediator.Send(new ReadNotificationStatusQuery(userId));
    //await Clients.Client(connectionId).SendAsync("ReceiveNotificationStatus", status);
    //}

    private async Task RestoreMessage(MessageDto message)
	{
		await Clients.Caller.SendAsync("ReceiveMessage", message.ChatId, message.UserId, message.UserName,
			message.Date, message.Text);
	}

    private async Task NewMessage(int chat, int user, string userName, DateTimeOffset date, string text)
    {
        await Clients.Group(chat.ToString()).SendAsync("ReceiveMessage", chat, user, userName, date, text);
    }

    private async Task RestoreConversation(ConversationDto conversation)
	{
		await Clients.Caller.SendAsync("ReceiveConversation", conversation.Id, conversation.WithUser, conversation.WithUserId, conversation.LastMessage?.Date,
            conversation.LastMessage?.Text, conversation.IsRead, conversation.UserImage, conversation.IsSuperLiked);
	}

	private async Task UpdateConversation(string connectionId, ConversationInfoDto conversation, DateTimeOffset date, string text, bool isRead)
	{
		await Clients.Client(connectionId).SendAsync("ReceiveConversation", conversation.Id, conversation.WithUser, conversation.WithUserId, date, text,
			isRead, conversation.UserImage, conversation.IsSuperLiked);
	}

	private async Task UpdateConversation(ConversationInfoDto conversation, DateTimeOffset date, string text, bool isRead)
	{
		await Clients.Caller.SendAsync("ReceiveConversation", conversation.Id, conversation.WithUser, conversation.WithUserId, date, text, isRead,
			conversation.UserImage, conversation.IsSuperLiked);
	}
}