using Microsoft.AspNetCore.Mvc;

namespace ChatWithMe.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController: ControllerBase
    {
        [HttpGet("{id}")]
        public ActionResult Get([FromRoute]int id)
        {
            return Ok();
        }
    }
}
