using Azure.Core;
using ChatWithMe.Common;
using ChatWithMe.Models;
using ChatWithMe.Models.ChatDtos;
using ChatWithMe.Models.MatchDtos;
using ChatWithMe.Models.UserDtos;
using ChatWithMe.Services;
using Microsoft.AspNetCore.Mvc;

namespace ChatWithMe.Controllers
{
    [ApiController]
    [Route("api/chat")]
    public class ChatController: ControllerBase
    {

        private readonly IChatService _service;

        public ChatController(IChatService service)
        {
            _service = service;
        }

        [HttpPost("user")]
        [RoleAuthorize]
        public ActionResult<GetMatchDto> GetMatchInfo(PostUserInfoDto dto)
        {
            return Ok(_service.GetMatchInfo(dto));
        }
    }
}
