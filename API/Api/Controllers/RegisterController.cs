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
                //Location pobrac po emailu bo user.Id jest zawsze 0 (dopiero jak zostaje dodany do bazy to dostaje Id)
                //var location = _linkGenerator.GetPathByAction("GetUserByEmail", "Users", new { email = user.Email });
                //return Created(location, result);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
