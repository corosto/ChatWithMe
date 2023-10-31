using System.IdentityModel.Tokens.Jwt;

namespace ChatWithMe.Services;

public interface ICurrentUserService
{
	public JwtSecurityToken? UserToken { get; }
	public string? UserId { get; }
}