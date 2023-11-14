using AutoMapper;
using ChatWithMe.Database;
using ChatWithMe.Entities;
using ChatWithMe.Exceptions;
using Microsoft.EntityFrameworkCore;
using ChatWithMe.Models.MatchDtos;
using Microsoft.AspNetCore.SignalR;
using ChatWithMe.API.Hubs;
using ChatWithMe.Models.ChatDtos;
using System.Text.RegularExpressions;
using Microsoft.VisualBasic;

namespace ChatWithMe.Services;

public interface IMatchService
{
    GetMatchDto GetNewMatch(GetMatchAPIDto dto);
    void ForceClearAllMatches();
    void ForceClearAllDislikes();
    public void UnmatchUser(RemoveMatchDto dto);
    public void BlockUser(RemoveMatchDto dto);
}

public class MatchService : IMatchService
{
    private readonly AppDbContext _dbContext;
    private readonly IConfiguration _configuration;
    private readonly ICurrentUserService _currentUserService;
    private readonly IMapper _mapper;
    private readonly IChatService _chatService;
    private readonly IHubContext<ChatHub> _hubContext;
    private readonly IMappingService _mappingService;

    public MatchService(AppDbContext dbContext, IConfiguration configuration, ICurrentUserService currentUserService, IMapper mapper, IChatService chatService, IHubContext<ChatHub> hubContext, IMappingService mappingService)
    {
        _dbContext = dbContext;
        _configuration = configuration;
        _currentUserService = currentUserService;
        _mapper = mapper;
        _chatService = chatService;
        _hubContext = hubContext;
        _mappingService = mappingService;
    }

    public GetMatchDto GetNewMatch(GetMatchAPIDto dto)
    {
        var id = _currentUserService.UserId;

        if (id == null)
            throw new NotFoundException("Coś poszło nie tak");

        var user = _dbContext
            .Users
            .Include(u => u.Match)
            .Include(u => u.Images)
            .FirstOrDefault(u => u.Id.ToString() == id)
            ?? throw new NotFoundException("Użytkownik nie istnieje");

        string error = null;

        if (dto.Status == LikeStatus.Like && user.LikesLeft <= 0)
        {
            error = "Like";
        }
        else if (dto.Status == LikeStatus.Like && user.LikesLeft > 0)
        {
            user.LikesLeft--;
        }

        if (dto.Status == LikeStatus.SuperLike && user.SuperLikesLeft <= 0)
        {
            error = "SuperLike";
        }
        else if (dto.Status == LikeStatus.SuperLike && user.SuperLikesLeft > 0)
        {
            user.SuperLikesLeft--;
        }

        if (dto.LikedUserId != null && dto.Status != null && error == null)
        {
            user.Match.Add(new Entities.Match
            {
                UserId = user.Id,
                LikedId = dto.LikedUserId.Value,
                Status = dto.Status.Value,
            });

            _dbContext.Users.Update(user);
            _dbContext.SaveChanges();
        }

        if (dto.Status != LikeStatus.Dislike && error == null)
        {
            var likedUser = _dbContext
                .Users
                .Include(u => u.Match)
                .Include(u => u.Images)
                .FirstOrDefault(u => u.Id == dto.LikedUserId);

            if (likedUser != null)
            {
                var foundMatch = likedUser
                    .Match
                    .Where(m => m.LikedId.ToString() == id)
                    .FirstOrDefault();

                var user1Conversations = _dbContext
                    .Conversation
                    .Include(c => c.UserConversation)
                    .Where(c => c.UserConversation.Any(uc => uc.UserId.ToString() == id))
                    .ToList();

                var user2Conversations = _dbContext
                    .Conversation
                    .Include(c => c.UserConversation)
                    .Where(c => c.UserConversation.Any(uc => uc.UserId == dto.LikedUserId))
                    .ToList();

                var skipConversationAdding = false;
                var conversation = new Conversation();

                void FindConversation()
                {
                    foreach (var conversation1 in user1Conversations)
                    {
                        foreach (var conversation2 in user2Conversations)
                        {
                            if (conversation1.Id == conversation2.Id)
                            {
                                conversation = conversation1;
                                conversation1.IsHidden = false;
                                skipConversationAdding = true;
                                _dbContext.Conversation.Update(conversation1);
                                _dbContext.SaveChanges();
                                return;
                            }
                        }
                    }
                };

                FindConversation();

                var sendConversationCreatedEvent = false;

                if (foundMatch != null && foundMatch.Status != LikeStatus.Dislike && !skipConversationAdding)
                {
                    user.UserConversation.Add(new UserConversation
                    {
                        UserId = user.Id,
                        User = user,
                        Conversation = conversation,
                        ConversationId = conversation.Id,
                        IsRead = false,
                        IsSuperLiked = foundMatch.Status == LikeStatus.SuperLike,
                    });

                    likedUser.UserConversation.Add(new UserConversation
                    {
                        UserId = likedUser.Id,
                        User = likedUser,
                        Conversation = conversation,
                        ConversationId = conversation.Id,
                        IsRead = false,
                        IsSuperLiked = dto.Status == LikeStatus.SuperLike,
                    });

                    _dbContext.Conversation.Update(conversation);
                    _dbContext.Users.UpdateRange(user, likedUser);
                    _dbContext.SaveChanges();

                    sendConversationCreatedEvent = true;
                }

                //TODO sprawdzic czy sie nie wywoluje 2 razy?

                if((sendConversationCreatedEvent || skipConversationAdding) && conversation != null)
                {
                    var connectioId1Exists = _mappingService.Users.TryGetValue(user.Id, out var connectioId1);
                    var connectioId2Exists = _mappingService.Users.TryGetValue(likedUser.Id, out var connectioId2);

                    if(connectioId1Exists)
                    {
                        _hubContext.Groups.AddToGroupAsync(connectioId1, conversation.Id.ToString());
                    }

                    if(connectioId2Exists)
                    {
                        _hubContext.Groups.AddToGroupAsync(connectioId2, conversation.Id.ToString());
                    }

                    _hubContext.Clients.Group(conversation.Id.ToString()).SendAsync("ConversationCreated", user.Id,user.Name, user.Images.FirstOrDefault().Name,
                        dto.Status == LikeStatus.SuperLike, likedUser.Id, likedUser.Name, likedUser.Images.FirstOrDefault().Name, foundMatch.Status == LikeStatus.SuperLike);
                }
            }
        }
        double currentUserWidth = user.City.Width;
        double currentUserHeight = user.City.Height;

        if (dto.CurrentWidth != null && dto.CurrentHeight != null)
        {
            currentUserWidth = dto.CurrentWidth.Value;
            currentUserHeight = dto.CurrentHeight.Value;
        }

        var match = _dbContext
            .Users
            .AsNoTracking()
            .Where(u => !(user.ShowMe == "male") || u.Sex == "male")
            .Where(u => !(user.ShowMe == "female") || u.Sex == "female")
            .Where(u => !user.Match.Select(s => s.LikedId).Contains(u.Id))
            .Where(u => u.Id.ToString() != id)
            .Include(u => u.Interests)
            .Include(u => u.SexualOrientations)
            .Include(u => u.Images)
            .ToList()
            .Where(u => !user.UseDistanceFilter || CalculateDistance(u.City.Width, u.City.Height, currentUserWidth, currentUserHeight) <= user.LookingForDistanceMax)
            .Where(u => !user.UseAgeFilter || CalculateAgeRange(u.BirthDate, user.LookingForAgeMin, user.LookingForAgeMax))
            .OrderBy(u => Guid.NewGuid())
            .FirstOrDefault();

        if (match == null)
            return null;

        var fixedUser = _mapper.Map<GetMatchDto>(match);

        fixedUser.ShowLikesDialog = error;
        fixedUser.Age = CalculateAge(match.BirthDate);
        fixedUser.City = match.City.Name;
        fixedUser.Distance = (int)CalculateDistance(match.City.Width, match.City.Height, user.City.Width, user.City.Height);

        var interest = _dbContext.UserInterests
            .Where(u => u.UserId == match.Id)
            .Include(u => u.Interest)
            .Select(u => u.Interest.InterestName).ToList();

        var sexualOrientation = _dbContext.UserSexualOrientations
            .Where(u => u.UserId == match.Id)
            .Include(u => u.SexualOrientation)
            .Select(u => u.SexualOrientation.SexualOrientationName).ToList();

        fixedUser.Interests = interest;
        fixedUser.SexualOrientations = sexualOrientation;

        fixedUser.Images = new();

        foreach (var image in match.Images)
        {
            fixedUser.Images.Add(image.Name);
        }

        _dbContext.SaveChanges();
        return fixedUser;
    }

    public void BlockUser(RemoveMatchDto dto)
    {
        var id = _currentUserService.UserId;

        if (id == null)
            throw new NotFoundException("Coś poszło nie tak");

        var user = _dbContext
            .Users
            .Include(u => u.Match)
            .FirstOrDefault(u => u.Id.ToString() == id)
            ?? throw new NotFoundException("Użytkownik nie istnieje");

        var match = _dbContext
            .Match
            .Where(u => u.UserId.ToString() == id)
            .Where(u => u.LikedId == dto.UserId)
            .FirstOrDefault();

        var conversationToHide = _dbContext
            .Conversation
            .Where(u => u.Id == dto.ChatId)
            .FirstOrDefault();

        if(match != null)
        {
            match.Status = LikeStatus.Blocked;
            _dbContext.Match.Update(match);
        }

        if(conversationToHide != null)
        {
            conversationToHide.IsHidden = true;
            _dbContext.Conversation.Update(conversationToHide);
        }

        _dbContext.SaveChanges();
    }

    public void UnmatchUser(RemoveMatchDto dto)
    {
        var id = _currentUserService.UserId;

        if (id == null)
            throw new NotFoundException("Coś poszło nie tak");

        var user = _dbContext
            .Users
            .Include(u => u.Match)
            .FirstOrDefault(u => u.Id.ToString() == id)
            ?? throw new NotFoundException("Użytkownik nie istnieje");

        var match = _dbContext
            .Match
            .Where(u => u.UserId.ToString() == id)
            .Where(u => u.LikedId == dto.UserId)
            .FirstOrDefault();

        var conversationToHide = _dbContext
            .Conversation
            .Where(u => u.Id == dto.ChatId)
            .FirstOrDefault();

        if (match != null)
        {
            match.Status = LikeStatus.Dislike;
            _dbContext.Match.Update(match);
        }

        if (conversationToHide != null)
        {
            conversationToHide.IsHidden = true;
            _dbContext.Conversation.Update(conversationToHide);
        }

        _dbContext.SaveChanges();
    }

    private int CalculateAge(DateTimeOffset BirthDate)
    {
        var today = DateTimeOffset.Now;
        var age = today.Year - BirthDate.Year;
        if (BirthDate.Date > today.AddYears(-age))
        {
            age--;
        }

        return age;
    }

    private bool CalculateAgeRange(DateTimeOffset BirthDate, int AgeMin, int AgeMax)
    {
        var today = DateTime.Now;
        var age = today.Year - BirthDate.Year;
        if (BirthDate.Date > today.AddYears(-age))
        {
            age--;
        }

        return AgeMin <= age && age <= AgeMax;
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




    public void ForceClearAllMatches()
    {
        var matches = _dbContext.Match.ToList();
        _dbContext.Match.RemoveRange(matches);
        _dbContext.SaveChanges();
    }

    public void ForceClearAllDislikes()
    {
        var matches = _dbContext
            .Match
            .Where(u => u.Status == 0)
            .ToList();

        _dbContext.Match.RemoveRange(matches);
        _dbContext.SaveChanges();
    }
}