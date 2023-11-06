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

public interface IChatService
{

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
}