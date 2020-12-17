﻿using System;
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
    [Route("[controller]/[action]")]
    [ApiController]
    public class SparrowController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ISparrowService _sparrowService;

        public SparrowController(IMapper mapper,ISparrowService sparrowService)
        {
            _mapper = mapper;
            _sparrowService = sparrowService;
        }

        // GET: Client/1 
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Warehouse>>> FollowParcel(long id)
        {
            var history = await _sparrowService.FollowParcel(id);

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
    }
}
