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
using Microsoft.AspNetCore.StaticFiles;
using System.IO;
using Azure.Core;
using Microsoft.AspNetCore.Identity;

namespace ChatWithMe.Services;

public interface IUserService
{
    User GetUser(LoginUserDto dto);
    TokenToReturn RegisterUser(CreateUserDto dto);
    TokenToReturn Login(LoginUserDto dto);
    TokenToReturn LoginWithRefreshToken(LoginUserDto dto);
    UserAllDto GetUserAll();
    void LogoutUser();
    UserBasicDto GetUserBasic();
    string GenerateToken(User user);
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

    public User GetUser(LoginUserDto dto)
    {
        return _dbContext
            .Users
            .FirstOrDefault(u => u != null && u.Email == dto.Email) ?? throw new NotFoundException();
    }

    public TokenToReturn RegisterUser(CreateUserDto dto)
    {
        CreatePasswordHash(dto.Password, out var passwordHash, out var passwordSalt);

        if (_dbContext.Users.Any(u => u != null && u.Email == dto.Email))
            throw new EmailAlreadyUsedException("Wpisany email jest już zajęty");

        Bitmap[] imageArray = new Bitmap[6];

        var user = _mapper.Map<User>(dto);

        user.PasswordHash = passwordHash;
        user.PasswordSalt = passwordSalt;

        user.City = JsonSerializer.Deserialize<City>(dto.City);


        for (int i = 0; i < dto.Images.Length; i++)
        {
            var fileName = Path.Combine(Path.GetFullPath("wwwroot"), dto.Images[i].FileName);

            var contentProvider = new FileExtensionContentTypeProvider();
            contentProvider.TryGetContentType(fileName, out var contentType);

            var fileType = Path.GetExtension(fileName);

            var generatedName = $"{Guid.NewGuid()}{fileType}";

            using (var image = System.Drawing.Image.FromStream(dto.Images[i].OpenReadStream()))
            {
                imageArray[i] = new Bitmap(image, new Size(170, 125));
                imageArray[i].Save(Path.Combine(Path.GetFullPath("wwwroot"), generatedName));
            }

            user.Images.Add(new ChatWithMe.Entities.Image
            {
                Name = generatedName,
                User = user,
                UserId = user.Id,
            });
        }


        string accessToken = GenerateToken(user);
        var refreshToken = GenerateRefreshToken();

        user.RefreshToken = refreshToken;

        _dbContext.Users.Add(user);
        _dbContext.SaveChanges();

        return new TokenToReturn
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken
        };
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
            throw new NotFoundException("Proszę się zalogować");

        var user = _dbContext
            .Users
            .FirstOrDefault(u => u.Id.ToString() == id)
            ?? throw new NotFoundException("Użytkownik nie istnieje");

        user.RefreshToken = null;

        _dbContext.Users.Update(user);
        _dbContext.SaveChanges();
    }

    public UserAllDto GetUserAll()
    {
        var id = _currentUserService.UserId;

        if(id == null)
            throw new NotFoundException("Proszę się zalogować");

        var user = _dbContext
            .Users
            .Include(u => u.Interests)
            .Include(u => u.SexualOrientations)
            .Include(u => u.Images)
            .FirstOrDefault(u => u.Id.ToString() == id)
            ?? throw new NotFoundException("Użytkownik nie istnieje");

        var fixedUser = _mapper.Map<UserAllDto>(user);

        var rootPath = Directory.GetCurrentDirectory();
        fixedUser.Images = new();

        foreach (var item in user.Images)
        {
            var path = $"{rootPath}/wwwroot/{item.Name}";

            var contentProvider = new FileExtensionContentTypeProvider();
            contentProvider.TryGetContentType(path, out var contentType);

            var fileContentes = System.IO.File.ReadAllBytes(path);

            fixedUser.Images.Add($"data:image/{contentType};base64,{Convert.ToBase64String(fileContentes)}");
        }

        return fixedUser;
    }

    //Zainteresowania i Orientacja nie dodają się
    //Niektóre pola wypełnia jako string "null" zamiast null przy rejestracji


    public UserBasicDto GetUserBasic()
    {
        var id = _currentUserService.UserId;

        if(id == null)
            throw new NotFoundException("Proszę się zalogować");

        var user = _dbContext
            .Users
            .Include(u => u.Images)
            .FirstOrDefault(u => u.Id.ToString() == id)
            ?? throw new NotFoundException("Użytkownik nie istnieje");

        var fixedUser = _mapper.Map<UserBasicDto>(user);

        var rootPath = Directory.GetCurrentDirectory();

        var path = $"{rootPath}/wwwroot/{user.Images[0].Name}";

        var contentProvider = new FileExtensionContentTypeProvider();
        contentProvider.TryGetContentType(path, out var contentType);

        var fileContentes = System.IO.File.ReadAllBytes(path);

        fixedUser.Image = $"data:image/{contentType};base64,{Convert.ToBase64String(fileContentes)}";

        return fixedUser;
    }

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

    public string GenerateToken(User user)
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