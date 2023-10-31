using Azure.Core;
using ChatWithMe.Common;
using ChatWithMe.Models;
using ChatWithMe.Models.UserDtos;
using ChatWithMe.Services;
using Microsoft.AspNetCore.Mvc;

namespace ChatWithMe.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController: ControllerBase
    {

        private readonly IUserService _service;

        public UserController(IUserService service)
        {
            _service = service;
        }


        [HttpPost("register")]
        public ActionResult<TokenToReturn> Register([FromForm] CreateUserDto dto)
        {
            return Ok(_service.RegisterUser(dto));
        }

        [HttpPost("login")]
        public ActionResult<TokenToReturn> Login([FromBody] LoginUserDto dto)
        {
            return dto.GrantType switch
            {
                "password" => Ok(_service.Login(dto)),
                "refresh_token" =>  Ok(_service.LoginWithRefreshToken(dto)),
            };
        }

        [HttpPost("logout")]
        [RoleAuthorize]
        public ActionResult Logout()
        {
            _service.LogoutUser();
            return Ok();
        }

        [HttpGet("all")]
        [RoleAuthorize]
        public ActionResult<UserAllDto> GetUserAllData()
        {
            return Ok(_service.GetUserAll());
        }
        
        [HttpGet("basic")]
        [RoleAuthorize]
        public ActionResult<UserBasicDto> GetUserBasicData()
        {
            return Ok(_service.GetUserBasic());
        }
    }
}
