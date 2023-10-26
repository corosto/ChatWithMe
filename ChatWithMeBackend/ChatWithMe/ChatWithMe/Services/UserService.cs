using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using ChatWithMe.Database;
using ChatWithMe.Entities;
using ChatWithMe.Exceptions;
using ChatWithMe.Models;
using ChatWithMe.Models.UserDtos;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace ChatWithMe.Services;

public interface IUserService
{
    User GetUser(LoginUserDto dto);
    int RegisterUser(CreateUserDto dto);
    TokenToReturn LoginUser(LoginUserDto dto);
    string GenerateNewTokensForUser(User user);
    //UserDto GetUser(int id);
}

public class UserService : IUserService
{
    private readonly AppDbContext _dbContext;
    private readonly IConfiguration _configuration;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public UserService(AppDbContext dbContext, IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
    {
        _dbContext = dbContext;
        _configuration = configuration;
        _httpContextAccessor = httpContextAccessor;
    }

    public User GetUser(LoginUserDto dto)
    {
        return _dbContext
            .Users
            .FirstOrDefault(u => u != null && u.Email == dto.Email) ?? throw new NotFoundException();
    }

    public int RegisterUser(CreateUserDto dto)
    {
        CreatePasswordHash(dto.Password, out var passwordHash, out var passwordSalt);

        if (_dbContext.Users.Any(u => u != null && u.Email == dto.Email))
            throw new EmailAlreadyUsedException("Wpisany email jest już zajęty");

        var user = new User
        {
            Name = dto.Name,
            Email = dto.Email,
            City = dto.City,
            PasswordHash = passwordHash,
            PasswordSalt = passwordSalt,
        };

        _dbContext.Users.Add(user);
        _dbContext.SaveChanges();

        return user.Id;
    }

    public TokenToReturn LoginUser(LoginUserDto dto)
    {
        var user = GetUser(dto);

        if (dto.Password == null ||
            !VerifyPasswordHash(dto.Password, user.PasswordHash, user.PasswordSalt))
            throw new InvalidLoginDataException("Niepoprawny login lub hasło");

        string generatedNewToken = GenerateNewTokensForUser(user);
        return new TokenToReturn(generatedNewToken);
    }

    public string GenerateNewTokensForUser(User user)
    {
        var refreshToken = new RefreshToken();
        user.RefreshToken = refreshToken.Token;
        user.TokenCreated = refreshToken.Created;
        user.TokenExpires = refreshToken.Expires;

        _httpContextAccessor.HttpContext?.Response.Cookies.Append("refreshToken", refreshToken.Token, new CookieOptions
        {
            HttpOnly = true,
            Expires = refreshToken.Expires
        });

        _dbContext.SaveChanges();
        return CreateToken(user);
    }


    public UserDto GetUser(int id)
    {
        var user = _dbContext
            .Users
            .FirstOrDefault(u => u.Id == id)
            ?? throw new NotFoundException("Użytkownik nie istnieje");

        return new UserDto
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email,
        };
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

    private string CreateToken(User user)
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
}