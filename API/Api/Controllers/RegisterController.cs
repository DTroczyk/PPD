using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.BLL.Entities;
using Api.Services.Interfaces;
using Api.ViewModels.VMs;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IRegisterService _registerService;

        public RegisterController(IMapper mapper,IRegisterService registerService)
        {
            _mapper = mapper;
            _registerService = registerService;
        }
        [AllowAnonymous]
        [HttpPost]
        public IActionResult Register([FromBody] UserRegistrationDto userModel)
        {
            try
            {
                var user = _mapper.Map<Sparrow>(userModel);
                var result = _registerService.Register(user);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
