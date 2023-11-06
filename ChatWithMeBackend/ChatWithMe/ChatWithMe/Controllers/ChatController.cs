using Azure.Core;
using ChatWithMe.Common;
using ChatWithMe.Models;
using ChatWithMe.Models.UserDtos;
using ChatWithMe.Services;
using Microsoft.AspNetCore.Mvc;

namespace ChatWithMe.Controllers
{
    [ApiController]
    [Route("api/chat")]
    public class ChatController: ControllerBase
    {

        private readonly IUserService _service;

        public ChatController(IUserService service)
        {
            _service = service;
        }

    }
}
