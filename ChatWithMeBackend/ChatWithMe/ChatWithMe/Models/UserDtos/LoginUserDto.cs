using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ChatWithMe.Models.UserDtos;

public class LoginUserDto
{
    public string GrantType { get; init; } = null!;
    public string? Email { get; init; }
    public string? Password { get; init; }
    public string? RefreshToken { get; init; }
}