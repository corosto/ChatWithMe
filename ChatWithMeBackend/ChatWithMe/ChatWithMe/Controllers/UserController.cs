using ChatWithMe.Models;
using ChatWithMe.Models.UserDtos;
using ChatWithMe.Services;
using Microsoft.AspNetCore.Mvc;

namespace ChatWithMe.Controllers
{
    [ApiController]
    [Route("user")]
    public class UserController: ControllerBase
    {

        private readonly IUserService _service;

        public UserController(IUserService service)
        {
            _service = service;
        }


        [HttpPost("register")]
        public ActionResult<int> Register([FromBody] CreateUserDto dto)
        {
            return Ok(_service.RegisterUser(dto));
        }

        [HttpPost("login")]
        public ActionResult<TokenToReturn> Login([FromBody] LoginUserDto dto)
        {
            return Ok(_service.LoginUser(dto));
        }

        [HttpPost("refreshToken")]
        public ActionResult<string> RefreshToken([FromBody] LoginUserDto dto)
        {
            var user = _service.GetUser(dto);
            var refreshToken = Request.Cookies["refreshToken"];

            if (!user.RefreshToken.Equals(refreshToken))
            {
                return Unauthorized("Invalid Refresh Token.");
            }

            if (user.TokenExpires < DateTime.Now)
            {
                return Unauthorized("Token expired.");
            }

            return Ok(_service.GenerateNewTokensForUser(user));
        }

        //[HttpGet("{id}")]
        //public ActionResult<UserDto> GetUser([FromRoute] int id)
        //{
        //    return Ok(_service.GetUser(id));
        //}
    }
}
