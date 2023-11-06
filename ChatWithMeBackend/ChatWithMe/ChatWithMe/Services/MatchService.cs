using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using AutoMapper;
using ChatWithMe.Database;
using ChatWithMe.Entities;
using ChatWithMe.Exceptions;
using ChatWithMe.Models;
using ChatWithMe.Models.UserDtos;
using Microsoft.IdentityModel.Tokens;
using System.Drawing;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using static System.Net.Mime.MediaTypeNames;
using AutoMapper.QueryableExtensions;

namespace ChatWithMe.Services;

public interface IMatchService
{
    GetMatchDto GetNewMatch(GetMatchAPIDto dto);
    void ForceClearAllMatches();
    void ForceClearAllDislikes();
}

public class MatchService : IMatchService
{
    private readonly AppDbContext _dbContext;
    private readonly IConfiguration _configuration;
    private readonly ICurrentUserService _currentUserService;
    private readonly IMapper _mapper;

    public MatchService(AppDbContext dbContext, IConfiguration configuration, ICurrentUserService currentUserService, IMapper mapper)
    {
        _dbContext = dbContext;
        _configuration = configuration;
        _currentUserService = currentUserService;
        _mapper = mapper;
    }

    public GetMatchDto GetNewMatch(GetMatchAPIDto dto)
    {
        var id = _currentUserService.UserId;

        if (id == null)
            throw new NotFoundException("Coś poszło nie tak");

        var user = _dbContext
            .Users
            .Include(u => u.Match)
            .FirstOrDefault(u => u.Id.ToString() == id)
            ?? throw new NotFoundException("Użytkownik nie istnieje");



        //jezeli aktualny user i user ktoremu dal like'a maja sie wzajemnie w likach to jest event stworzenia nowego chatu
        if (dto.LikedUserId != null && dto.Status != null)
        {
            user.Match.Add(new Match
            {
                UserId = user.Id,
                LikedId = dto.LikedUserId.Value,
                Status = dto.Status.Value,

            });

            _dbContext.Users.Update(user);
            _dbContext.SaveChanges();
        }

        double currentUserWidth = user.City.Width;
        double currentUserHeight = user.City.Height;

        if(dto.CurrentWidth != null && dto.CurrentHeight != null)
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

        return fixedUser;
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