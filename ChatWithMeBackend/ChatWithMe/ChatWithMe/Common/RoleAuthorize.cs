using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using ChatWithMe.Common.Types;

namespace ChatWithMe.Common;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true)]
public class RoleAuthorize : AuthorizeAttribute, IAuthorizationFilter
{
	public void OnAuthorization(AuthorizationFilterContext context)
	{
		var token = Reader.ReadToken(context.HttpContext);
		var userId = token?.FindOrDefault(ClaimNames.Id);

		if (userId is null)
		{
			context.Result = new ObjectResult(new List<string> { "You are not authorized to access this resource" })
			{
				StatusCode = StatusCodes.Status401Unauthorized
			};
		}
	}
}