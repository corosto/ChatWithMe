using ChatWithMe.Entities;
using ChatWithMe.Models.ChatDtos;
using Mapster;

namespace ChatWithMe.Models;

public class ConversationMapperConfig : IRegister
{
	public void Register(TypeAdapterConfig config)
	{
		config.ForType<Message, MessageDto>()
			.Map(dest => dest.ChatId, src => src.ConversationId)
			.Map(dest => dest.UserName, src => src.User.Name);

        config.ForType<Conversation, ConversationDto>()
			.Map(dest => dest.LastMessage, src => src.Messages.Any()
				? src.Messages.OrderByDescending(m => m.Date).First().Adapt<MessageDto>()
				: null);
	}
}