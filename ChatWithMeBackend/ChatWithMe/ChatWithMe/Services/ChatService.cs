using AutoMapper;
using ChatWithMe.Database;
using ChatWithMe.Entities;
using ChatWithMe.Exceptions;
using ChatWithMe.Models.ChatDtos;
using ChatWithMe.Models.MatchDtos;
using ChatWithMe.Models.UserDtos;
using FluentResults;
using Mapster;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace ChatWithMe.Services;

public interface IChatService
{
    public List<int> GetUserConversationsIds(int userId);
    public void SetCurrentChat(int userId, int? chatId);
    public void AddConnectionId(int userId, string connectionId);
    public List<ConversationDto> GetConversations(int userId);
    public ConversationInfoDto GetConversation(int conversationId, int userId);
    public int? GetCurrentChat(int userId);
    public List<MessageDto> GetMessages(int chat);
    public void DecrementNotificationStatus(int userId, int chatId);
    public bool SendMessage(int userId, int conversationId, DateTimeOffset date, string text, bool isConnected);
    public GetMatchDto GetMatchInfo(PostUserInfoDto dto);
}

public class ChatService : IChatService
{
    private readonly AppDbContext _dbContext;
    private readonly IConfiguration _configuration;
    private readonly ICurrentUserService _currentUserService;
    private readonly IMapper _mapper;

    public ChatService(AppDbContext dbContext, IConfiguration configuration, ICurrentUserService currentUserService, IMapper mapper)
    {
        _dbContext = dbContext;
        _configuration = configuration;
        _currentUserService = currentUserService;
        _mapper = mapper;
    }

    public List<int> GetUserConversationsIds(int userId)
    {
        var conversationsIds = _dbContext
            .UserConversation
            .Where(u => u.UserId == userId)
            .Select(u => u.ConversationId)
            .ToList()
            ?? throw new NotFoundException("Coś poszło nie tak");

        return conversationsIds ?? new();
    }

    public void SetCurrentChat(int userId, int? chatId)
    {
        var user = _dbContext.Users.FirstOrDefault(u => u.Id == userId);
        if (user is null)
        {
            throw new NotFoundException("Użytkownik nie istnieje");
        }
        user.CurrentConversationId = chatId;

        _dbContext.SaveChanges();
    }

    public void AddConnectionId(int userId, string connectionId)
    {
        var user = _dbContext.Users.FirstOrDefault(u => u.Id == userId);
        if (user is null)
        {
            throw new NotFoundException("Użytkownik nie istnieje");
        }

        user.ConnectionId = connectionId;
        _dbContext.SaveChanges();
    }

    public List<ConversationDto> GetConversations(int userId)
    {
        if (!_dbContext.Users.Any(u => u.Id == userId))
        {
            throw new NotFoundException("Użytkownik nie istnieje");
        }

        var conversations = _dbContext.Conversation
            .Include(c => c.UserConversation)
            .Include(c => c.Messages)
            .Where(c => c.UserConversation.Any(uc => uc.UserId == userId))
            .Where(c => !c.IsHidden)
            .ProjectToType<ConversationDto>()
            .ToList();

        foreach (var conversation in conversations)
        {
            var user = (_dbContext.UserConversation
            .Include(c => c.User)
            .ThenInclude(c => c.Images)
            .First(c => c.ConversationId == conversation.Id && c.UserId != userId)).User;

            conversation.WithUser = user!.Name;
            conversation.WithUserId = user.Id;
            conversation.UserImage = user.Images.First().Name;

            conversation.IsRead = _dbContext.UserConversation
                .Where(ch => ch.ConversationId == conversation.Id && ch.UserId == userId)
                .Select(ch => ch.IsRead)
                .FirstOrDefault();

            conversation.IsSuperLiked = _dbContext.UserConversation
                .Where(ch => ch.ConversationId == conversation.Id && ch.UserId == userId)
                .Select(ch => ch.IsSuperLiked)
                .FirstOrDefault();
        }

        return conversations;
    }

    public ConversationInfoDto GetConversation(int conversationId, int userId)
    {
        if (!_dbContext.Users.Any(u => u.Id == userId))
        {
            throw new NotFoundException("Użytkownik nie istnieje");
        }

        var conversation = _dbContext.Conversation
            .Include(c => c.UserConversation)
            .Include(c => c.Messages)
            .Where(c => c.Id == conversationId)
            .ProjectToType<ConversationInfoDto>()
            .FirstOrDefault();

        if (conversation is null)
        {
            throw new NotFoundException("Konwersacja nie istnieje");
        }

        var user = (_dbContext.UserConversation
            .Include(ch => ch.User)
            .ThenInclude(c => c.Images)
            .First(ch => ch.ConversationId == conversation.Id && ch.UserId != userId)).User;

        conversation.WithUser = user.Name;
        conversation.UserImage = user.Images.First().Name;
        conversation.WithUserId = user.Id;
        conversation.WithUserConnectionId = user.ConnectionId;

        conversation.IsRead = _dbContext.UserConversation
            .Where(ch => ch.ConversationId == conversation.Id && ch.UserId == userId)
            .Select(ch => ch.IsRead)
            .FirstOrDefault();

        conversation.IsSuperLiked = _dbContext.UserConversation
            .Where(ch => ch.ConversationId == conversation.Id && ch.UserId == userId)
            .Select(ch => ch.IsSuperLiked)
            .FirstOrDefault();

        return conversation;
    }

    public int? GetCurrentChat(int userId)
    {
        var user = _dbContext.Users.FirstOrDefault(u => u.Id == userId);
        if (user is null)
        {
            throw new NotFoundException("Użytkownik nie istnieje");
        }

        return user.CurrentConversationId;
    }

    public List<MessageDto> GetMessages(int chat)
    {
        return _dbContext.Conversation
            .Where(c => c.Id == chat && c.Messages.Any())
            .SelectMany(c => c.Messages)
            .ProjectToType<MessageDto>()
            .ToList();
    }

    public void DecrementNotificationStatus(int userId, int chatId)
    {
        var chat = _dbContext.UserConversation
            .FirstOrDefault(c => c.UserId == userId && c.ConversationId == chatId);

        if (chat is not null)
        {
            chat.IsRead = true;
        }

        _dbContext.SaveChanges();
    }

    public bool SendMessage(int userId, int conversationId, DateTimeOffset date, string text, bool isConnected)
    {
        // user
        var user = _dbContext.Users.FirstOrDefault(u => u.Id == userId);
        if (user is null)
        {
            throw new NotFoundException("Użytkownik nie istnieje");
        }

        // conversation
        var conversation = _dbContext.Conversation
            .Include(c => c.Messages)
            .FirstOrDefault(c => c.Id == conversationId);
        if (conversation is null)
        {
            throw new NotFoundException("Konwersacja nie istnieje");
        }

        // other user chat
        var otherChat = _dbContext.UserConversation
            .FirstOrDefault(ch => ch.ConversationId == conversationId && ch.UserId != userId);
        if (otherChat is null)
        {
            throw new NotFoundException("Czat nie istnieje");
        }

        otherChat.IsRead = isConnected;

        // user chat
        var myChat = _dbContext.UserConversation
            .FirstOrDefault(ch => ch.ConversationId == conversationId && ch.UserId == userId);
        if (myChat is null)
        {
            throw new NotFoundException("Czat nie istnieje");
        }

        myChat.IsRead = true;

        // is first message
        var firstMessage = !conversation.Messages.Any();

        // new message
        var message = new Message
        {
            Text = text,
            UserId = userId,
            User = user,
            ConversationId = conversationId,
            Conversation = conversation,
            Date = date
        };

        // save
        _dbContext.Messages.Add(message);
        _dbContext.SaveChanges();

        return firstMessage;
    }

    public GetMatchDto GetMatchInfo(PostUserInfoDto dto)
    {
        var user = _dbContext
            .Users
            .Include(u => u.Interests)
            .Include(u => u.SexualOrientations)
            .Include(u => u.Images)
            .FirstOrDefault(u => u.Id == dto.UserId)
            ?? throw new NotFoundException("Użytkownik nie istnieje");

        var fixedUser = _mapper.Map<GetMatchDto>(user);

        fixedUser.City = user.City.Name;

        double currentUserWidth = user.City.Width;
        double currentUserHeight = user.City.Height;

        if (dto.CurrentWidth != null && dto.CurrentHeight != null)
        {
            currentUserWidth = dto.CurrentWidth.Value;
            currentUserHeight = dto.CurrentHeight.Value;
        }
        fixedUser.Distance = (int)CalculateDistance(currentUserWidth, currentUserHeight, user.City.Width, user.City.Height);

        var today = DateTime.Today;
        var age = today.Year - user.BirthDate.Year;
        if (user.BirthDate.Date > today.AddYears(-age))
        {
            age--;
        }

        fixedUser.Age = age;

        var interest = _dbContext.UserInterests
            .Where(u => u.UserId == dto.UserId)
            .Include(u => u.Interest)
            .Select(u => u.Interest.InterestName).ToList();

        var sexualOrientation = _dbContext.UserSexualOrientations
            .Where(u => u.UserId == dto.UserId)
            .Include(u => u.SexualOrientation)
            .Select(u => u.SexualOrientation.SexualOrientationName).ToList();

        fixedUser.Interests = interest;
        fixedUser.SexualOrientations = sexualOrientation;

        fixedUser.Images = new();

        foreach (var image in user.Images)
        {
            fixedUser.Images.Add(image.Name);
        }

        return fixedUser;
    }

    private const double EarthRadiusKm = 6371.0;

    private double CalculateDistance(double lat1, double lon1, double lat2, double lon2)
    {
        // Konwersja stopni na radiany
        var dLat = DegreeToRadian(lat2 - lat1);
        var dLon = DegreeToRadian(lon2 - lon1);

        // Obliczanie odległości za pomocą wzoru Haversine
        var a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
                Math.Cos(DegreeToRadian(lat1)) * Math.Cos(DegreeToRadian(lat2)) *
                Math.Sin(dLon / 2) * Math.Sin(dLon / 2);
        var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
        var distanceKm = EarthRadiusKm * c;

        return distanceKm;
    }

    private double DegreeToRadian(double angle)
    {
        return Math.PI * angle / 180.0;
    }
}
