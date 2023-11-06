using Azure.Core;
using ChatWithMe.Common;
using ChatWithMe.Entities;
using ChatWithMe.Models;
using ChatWithMe.Models.UserDtos;
using ChatWithMe.Services;
using Microsoft.AspNetCore.Mvc;

namespace ChatWithMe.Controllers
{
    [ApiController]
    [Route("api/match")]
    public class MatchController: ControllerBase
    {

        private readonly IMatchService _service;

        public MatchController(IMatchService service)
        {
            _service = service;
        }

        [HttpPost()]
        [RoleAuthorize]
        public ActionResult<GetMatchDto> GetNewMatch([FromBody] GetMatchAPIDto dto)
        {
            return Ok(_service.GetNewMatch(dto));
        }
    }
}
