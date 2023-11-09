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

        [HttpPost("api/clear/all")]
        public ActionResult ForceClearAllMatches()
        {
            _service.ForceClearAllMatches();
            return Ok();
        }

        [HttpPost("api/clear/dislikes")]
        public ActionResult ForceClearAllDislikes()
        {
            _service.ForceClearAllDislikes();
            return Ok();
        }
    }
}
