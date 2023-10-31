using System.IdentityModel.Tokens.Jwt;
using ChatWithMe.Common;
using ChatWithMe.Common.Types;

namespace ChatWithMe.Services;

public class CurrentUserService : ICurrentUserService
{
	private readonly IHttpContextAccessor _httpContextAccessor;

	public CurrentUserService(IHttpContextAccessor httpContextAccessor)
	{
		_httpContextAccessor = httpContextAccessor;
	}

	public JwtSecurityToken? UserToken => Reader.ReadToken(_httpContextAccessor.HttpContext);
	public string? UserId => UserToken?.FindOrDefault(ClaimNames.Id);
}