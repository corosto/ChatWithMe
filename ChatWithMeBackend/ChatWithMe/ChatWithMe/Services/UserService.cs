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

namespace ChatWithMe.Services;

public interface IUserService
{
    void RegisterUser(CreateUserDto dto);
    TokenToReturn Login(LoginUserDto dto);
    TokenToReturn LoginWithRefreshToken(LoginUserDto dto);
    void LogoutUser();
    UserBasicDto GetUserBasic();
    UserMainDto GetUserMain();
    UserSideDto GetUserSide();
    void UpdateUserMain(UserMainUpdateDto dto);
    void UpdateUserSide(UserSideUpdateDto dto);
}

public class UserService : IUserService
{
    private readonly AppDbContext _dbContext;
    private readonly IConfiguration _configuration;
    private readonly ICurrentUserService _currentUserService;
    private readonly IMapper _mapper;

    public UserService(AppDbContext dbContext, IConfiguration configuration, ICurrentUserService currentUserService, IMapper mapper)
    {
        _dbContext = dbContext;
        _configuration = configuration;
        _currentUserService = currentUserService;
        _mapper = mapper;
    }


    //Authentication
    private User GetUser(LoginUserDto dto)
    {
        return _dbContext
            .Users
            .FirstOrDefault(u => u != null && u.Email == dto.Email) ?? throw new NotFoundException();
    }

    public void RegisterUser(CreateUserDto dto)
    {
        CreatePasswordHash(dto.Password, out var passwordHash, out var passwordSalt);

        if (_dbContext.Users.Any(u => u != null && u.Email == dto.Email))
            throw new EmailAlreadyUsedException("Wpisany email jest już zajęty");

        Bitmap[] imageArray = new Bitmap[6];

        var user = _mapper.Map<User>(dto);

        user.PasswordHash = passwordHash;
        user.PasswordSalt = passwordSalt;

        user.BirthDate = DateTimeOffset.Parse(dto.BirthDate);

        user.City = JsonSerializer.Deserialize<City>(dto.City);

        foreach (var image in dto.Images)
        {
            user.Images.Add(new Entities.Image
            {
                Name = image,
                User = user,
                UserId = user.Id,
            });
        }

        foreach (var interestName in dto.Interests)
        {
            var foundInterest = _dbContext.Interest.FirstOrDefault(u => u.InterestName == interestName);

            if(foundInterest != null)
            {
                var newUserInterest = new UserInterests
                {
                    InterestId = foundInterest.Id,
                    Interest = foundInterest,
                    UserId = user.Id,
                    User = user,
                };

                user.Interests.Add(newUserInterest);

                foundInterest.Users.Add(newUserInterest);
            }
            else
            {
                var newInterest = new Interest
                {
                    InterestName = interestName,
                };

                var newUserInterest = new UserInterests
                {
                    InterestId = newInterest.Id,
                    Interest = newInterest,
                    UserId = user.Id,
                    User = user,
                };

                user.Interests.Add(newUserInterest);

                newInterest.Users.Add(newUserInterest);
            }
        }

        foreach (var orientationName in dto.SexualOrientations)
        {
            var foundOrientation = _dbContext.SexualOrientation.FirstOrDefault(u => u.SexualOrientationName == orientationName);

            if (foundOrientation != null)
            {
                var newUserOrientation = new UserSexualOrientations
                {
                    SexualOrientationId = foundOrientation.Id,
                    SexualOrientation = foundOrientation,
                    UserId = user.Id,
                    User = user,
                };

                user.SexualOrientations.Add(newUserOrientation);

                foundOrientation.Users.Add(newUserOrientation);
            }
            else
            {
                var newOrientaion = new SexualOrientation
                {
                    SexualOrientationName = orientationName,
                };

                var newUserSexualOrientation = new UserSexualOrientations
                {
                    SexualOrientationId = newOrientaion.Id,
                    SexualOrientation = newOrientaion,
                    UserId = user.Id,
                    User = user,
                };

                user.SexualOrientations.Add(newUserSexualOrientation);

                newOrientaion.Users.Add(newUserSexualOrientation);
            }
        }

        _dbContext.Users.Add(user);
        _dbContext.SaveChanges();
    }

    public TokenToReturn Login(LoginUserDto dto)
    {
        var user = GetUser(dto);

        if (dto.Password == null ||
            !VerifyPasswordHash(dto.Password, user.PasswordHash, user.PasswordSalt))
            throw new InvalidLoginDataException("Niepoprawny login lub hasło");

        string accessToken = GenerateToken(user);
        var refreshToken = GenerateRefreshToken();

        user.RefreshToken = refreshToken;

        _dbContext.Users.Update(user);
        _dbContext.SaveChanges();

        return new TokenToReturn
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken
        };
    }

    public TokenToReturn LoginWithRefreshToken(LoginUserDto dto)
    {
        var user = _dbContext
            .Users
            .FirstOrDefault(u => u != null && u.RefreshToken == dto.RefreshToken) ?? throw new NotFoundException();

        string accessToken = GenerateToken(user);
        var refreshToken = GenerateRefreshToken();

        user.RefreshToken = refreshToken;

        _dbContext.Users.Update(user);
        _dbContext.SaveChanges();

        return new TokenToReturn
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken
        };
    }

    public void LogoutUser()
    {
        var id = _currentUserService.UserId;

        if (id == null)
            throw new NotFoundException("Coś poszło nie tak");

        var user = _dbContext
            .Users
            .FirstOrDefault(u => u.Id.ToString() == id)
            ?? throw new NotFoundException("Użytkownik nie istnieje");

        user.RefreshToken = null;

        _dbContext.Users.Update(user);
        _dbContext.SaveChanges();
    }



    //All user data
    public UserMainDto GetUserMain()
    {
        var id = _currentUserService.UserId;

        if(id == null)
            throw new NotFoundException("Coś poszło nie tak");

        var user = _dbContext
            .Users
            .Include(u => u.Interests)
            .Include(u => u.SexualOrientations)
            .Include(u => u.Images)
            .FirstOrDefault(u => u.Id.ToString() == id)
            ?? throw new NotFoundException("Użytkownik nie istnieje");

        var fixedUser = _mapper.Map<UserMainDto>(user);

        fixedUser.City = user.City.Name;

        var today = DateTime.Today;
        var age = today.Year - user.BirthDate.Year;
        if (user.BirthDate.Date > today.AddYears(-age))
        {
            age--;
        }

        fixedUser.Age = age;

        var interest = _dbContext.UserInterests
            .Where(u => u.UserId.ToString() == id)
            .Include(u => u.Interest)
            .Select(u => u.Interest.InterestName).ToList();

        var sexualOrientation = _dbContext.UserSexualOrientations
            .Where(u => u.UserId.ToString() == id)
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

    public void UpdateUserMain(UserMainUpdateDto dto)
    {
        var id = _currentUserService.UserId;

        if (id == null)
            throw new NotFoundException("Coś poszło nie tak");

        var user = _dbContext
            .Users
            .Include(u => u.Interests)
            .Include(u => u.SexualOrientations)
            .Include(u => u.Images)
            .FirstOrDefault(u => u.Id.ToString() == id)
            ?? throw new NotFoundException("Użytkownik nie istnieje");


        //usuwanie
        var interestToRemove = _dbContext.UserInterests
            .Where(u => u.UserId.ToString() == id)
            .ToList();
        _dbContext.UserInterests.RemoveRange(interestToRemove);

        var orientationsToRemove = _dbContext.UserSexualOrientations
            .Where(u => u.UserId.ToString() == id)
            .ToList();
        _dbContext.UserSexualOrientations.RemoveRange(orientationsToRemove);

        var imagesToRemove = _dbContext.Image
            .Where(u => u.UserId.ToString() == id)
            .ToList();
        _dbContext.Image.RemoveRange(imagesToRemove);


        //nowe dane
        foreach (var interestName in dto.Interests)
        {
            var foundInterest = _dbContext.Interest.FirstOrDefault(u => u.InterestName == interestName);

            if (foundInterest != null)
            {
                var newUserInterest = new UserInterests
                {
                    InterestId = foundInterest.Id,
                    Interest = foundInterest,
                    UserId = user.Id,
                    User = user,
                };

                user.Interests.Add(newUserInterest);

                foundInterest.Users.Add(newUserInterest);
            }
            else
            {
                var newInterest = new Interest
                {
                    InterestName = interestName,
                };

                var newUserInterest = new UserInterests
                {
                    InterestId = newInterest.Id,
                    Interest = newInterest,
                    UserId = user.Id,
                    User = user,
                };

                user.Interests.Add(newUserInterest);

                newInterest.Users.Add(newUserInterest);
            }
        }

        foreach (var orientationName in dto.SexualOrientations)
        {
            var foundOrientation = _dbContext.SexualOrientation.FirstOrDefault(u => u.SexualOrientationName == orientationName);

            if (foundOrientation != null)
            {
                var newUserOrientation = new UserSexualOrientations
                {
                    SexualOrientationId = foundOrientation.Id,
                    SexualOrientation = foundOrientation,
                    UserId = user.Id,
                    User = user,
                };

                user.SexualOrientations.Add(newUserOrientation);

                foundOrientation.Users.Add(newUserOrientation);
            }
            else
            {
                var newOrientaion = new SexualOrientation
                {
                    SexualOrientationName = orientationName,
                };

                var newUserSexualOrientation = new UserSexualOrientations
                {
                    SexualOrientationId = newOrientaion.Id,
                    SexualOrientation = newOrientaion,
                    UserId = user.Id,
                    User = user,
                };

                user.SexualOrientations.Add(newUserSexualOrientation);

                newOrientaion.Users.Add(newUserSexualOrientation);
            }
        }

        foreach (var image in dto.Images)
        {
            user.Images.Add(new Entities.Image
            {
                Name = image,
                User = user,
                UserId = user.Id,
            });
        }

        user.Height = dto.Height;
        user.Weight = dto.Weight;
        user.Sex = dto.Sex;
        user.LookingFor = dto.LookingFor;
        user.Description = dto.Description;
        user.Zodiac = dto.Zodiac;
        user.Education = dto.Education;
        user.Kids = dto.Kids;
        user.Pets = dto.Pets;
        user.Alcohol = dto.Alcohol;
        user.Smoking = dto.Smoking;
        user.Gym = dto.Gym;
        user.Diet = dto.Diet;
        user.School = dto.School;
        user.Job = dto.Job;
        user.Position = dto.Position;

        _dbContext.Users.Update(user);
        _dbContext.SaveChanges();
    }



    //Side menu
    public UserBasicDto GetUserBasic()
    {
        var id = _currentUserService.UserId;

        if (id == null)
            throw new NotFoundException("Coś poszło nie tak");

        var user = _dbContext
            .Users
            .Include(u => u.Images)
            .FirstOrDefault(u => u.Id.ToString() == id)
            ?? throw new NotFoundException("Użytkownik nie istnieje");

        var fixedUser = _mapper.Map<UserBasicDto>(user);

        fixedUser.Image = user.Images[0].Name;

        return fixedUser;
    }

    public UserSideDto GetUserSide()
    {
        var id = _currentUserService.UserId;

        if(id == null)
            throw new NotFoundException("Coś poszło nie tak");

        var user = _dbContext
            .Users
            .FirstOrDefault(u => u.Id.ToString() == id)
            ?? throw new NotFoundException("Użytkownik nie istnieje");

        var fixedUser = _mapper.Map<UserSideDto>(user);

        return fixedUser;
    }

    public void UpdateUserSide(UserSideUpdateDto dto)
    {
        var id = _currentUserService.UserId;

        if(id == null)
            throw new NotFoundException("Coś poszło nie tak");

        var user = _dbContext
            .Users
            .FirstOrDefault(u => u.Id.ToString() == id)
            ?? throw new NotFoundException("Użytkownik nie istnieje");

        user.ShowMe = dto.ShowMe;
        user.LookingForAgeMin = dto.LookingForAgeMin;
        user.LookingForAgeMax = dto.LookingForAgeMax;
        user.LookingForDistanceMax = dto.LookingForDistanceMax;
        user.UseAgeFilter = dto.UseAgeFilter;
        user.UseDistanceFilter = dto.UseDistanceFilter;
        user.City = dto.City;

        _dbContext.Users.Update(user);
        _dbContext.SaveChanges();
    }



    //Token | Password
    private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
        using var hmac = new HMACSHA512();
        passwordSalt = hmac.Key;
        passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
    }

    private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
    {
        using var hmac = new HMACSHA512(passwordSalt);
        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        return computedHash.SequenceEqual(passwordHash);
    }

    private string GenerateToken(User user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            _configuration.GetSection("Token").Value));

        var token = new JwtSecurityToken
        (
            claims: new List<Claim>
            {
                new(type:"userId", user.Id.ToString()),
            },
            expires: DateTime.Now.AddDays(1),
            signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature)
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public string GenerateRefreshToken()
    {
        return Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));
    }
}