using ChatWithMe.Common;
using ChatWithMe.Models.MatchDtos;
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

        [HttpPost("unmatch")]
        [RoleAuthorize]
        public ActionResult UnmatchUser([FromBody] RemoveMatchDto dto)
        {
            _service.UnmatchUser(dto);
            return Ok();
        }

        [HttpPost("block")]
        [RoleAuthorize]
        public ActionResult BlockUser([FromBody] RemoveMatchDto dto)
        {
            _service.BlockUser(dto);
            return Ok();
        }

        [HttpPost("clear/all")]
        public ActionResult ForceClearAllMatches()
        {
            _service.ForceClearAllMatches();
            return Ok();
        }

        [HttpPost("clear/dislikes")]
        public ActionResult ForceClearAllDislikes()
        {
            _service.ForceClearAllDislikes();
            return Ok();
        }
    }
}
