using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.BLL.Entities;
using Api.Services.Interfaces;
using Api.ViewModels.DTOs;
using Api.ViewModels.VMs;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class SparrowController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ISparrowService _sparrowService;
        private readonly IUserService _userService;

        public SparrowController(IMapper mapper,ISparrowService sparrowService, IUserService userService)
        {
            _mapper = mapper;
            _sparrowService = sparrowService;
            _userService = userService;
        }

        // GET: Client/1 
        [HttpGet("{id}")]
        public async Task<ActionResult<FollowParcelVm>> FollowParcel(long id)
        {
            try 
            { 
                var history = await _sparrowService.FollowParcel(id);
                return Ok(history);
            }
            catch (Exception e)
            {
                return StatusCode(406, new { error = e.Message });
            }
        }

        [HttpPost]
        public IActionResult SendParcel([FromBody]ParcelDto parcelDto)
        {
            try
            {
                var parcel = _mapper.Map<Parcel>(parcelDto);
                _sparrowService.SendParcel(parcel);
                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet]
        public IActionResult GetParcelTypes()
        {
            try
            {
                var parcelTypes = _sparrowService.GetParcelTypes();
                return Ok(parcelTypes);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet]
        public async Task<ActionResult<SparrowVm>> GetSparrow()
        {
            try
            {
                var sparrow = await _userService.GetSparrow();
                return Ok(sparrow);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
