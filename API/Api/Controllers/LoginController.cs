using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Services.Interfaces;
using Api.ViewModels.VMs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILoginService _loginService;

        public LoginController(ILoginService loginService)
        {
            _loginService = loginService;
        }

        public IActionResult Login(string login, string password)
        {
            try
            {
                if (login == null || password == null)
                {
                    return BadRequest("Invalid credentials");
                }
                var token = _loginService.IsAuthenticated(login, password);
                return Ok(token);
            }
            catch (Exception ex)
            {
                return Unauthorized(ex);
            }

        }
    }
}
