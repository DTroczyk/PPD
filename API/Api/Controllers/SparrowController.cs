using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.BLL.Entities;
using Api.Services.Interfaces;
using Api.ViewModels.DTOs;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SparrowController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ISparrowService _clientService;

        public SparrowController(IMapper mapper,ISparrowService clientService)
        {
            _mapper = mapper;
            _clientService = clientService;
        }

        // GET: Client/1 
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Warehouse>>> FollowParcel(long id)
        {
            var history = await _clientService.FollowParcel(id);

            if (history.Count() == 0)
            {
                return NotFound();
            }

            return Ok(history);
        }

        [HttpPost]
        public IActionResult SendParcel([FromBody]ParcelDto parcelDto)
        {
            try
            {
                var parcel = _mapper.Map<Parcel>(parcelDto);
                _clientService.SendParcel(parcel);
                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
