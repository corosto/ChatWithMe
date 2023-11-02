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
        public ActionResult Register([FromForm] CreateUserDto dto)
        {
            _service.RegisterUser(dto);
            return Ok();
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

        [HttpGet("main")]
        [RoleAuthorize]
        public ActionResult<UserMainDto> GetUserMainData()
        {
            return Ok(_service.GetUserMain());
        }

        [HttpPut("main")]
        [RoleAuthorize]
        public ActionResult UpdateUserMainData([FromForm] UserMainUpdateDto dto)
        {
            _service.UpdateUserMain(dto);
            return Ok();
        }

        [HttpGet("side")]
        [RoleAuthorize]
        public ActionResult<UserSideDto> GetUserSideData()
        {
            return Ok(_service.GetUserSide());
        }        

        [HttpPut("side")]
        [RoleAuthorize]
        public ActionResult UpdateUserSideData([FromBody] UserSideUpdateDto dto)
        {
            _service.UpdateUserSide(dto);
            return Ok();
        }
        
        [HttpGet("basic")]
        [RoleAuthorize]
        public ActionResult<UserBasicDto> GetUserBasicData()
        {
            return Ok(_service.GetUserBasic());
        }
    }
}
