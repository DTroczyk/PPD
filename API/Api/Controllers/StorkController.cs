using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.BLL.Entities;
using Api.DAL.EF;
using Api.Services.Interfaces;
using Api.ViewModels.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class StorkController : ControllerBase
    {
        private readonly IStorkService _storkService;

        public StorkController(IStorkService storkService)
        {
            _storkService = storkService;
        }

        // GET: Stork/1 
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Parcel>>> GetParcels()
        {
            var parcels = await _storkService.GetParcels();

            if (parcels == null)
            {
                parcels = new List<Parcel>();
            }

            return Ok(parcels);
        }

        // GET: Stork/GetPigeons
        [HttpGet]
        [Route("GetPigeons")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Pigeon>>> GetPigeons()
        {
            return Ok(await _storkService.GetPigeons());
        }

        // PUT: Stork/SetPigeon
        [HttpPut]
        [Route("SetPigeon")]
        [Authorize]
        public async Task<ActionResult<Parcel>> SetPigeon(SetPigeonDto setPigeon)
        {
            var parcel = await _storkService.SetPigeon(setPigeon.ParcelId, setPigeon.PigeonLogin);

            if (parcel == null)
            {
                return StatusCode(406, new { error = "Parcel doesn't exist" });
            }

            return Ok(parcel);
        }
    }
}
