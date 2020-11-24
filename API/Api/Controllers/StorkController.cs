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
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Parcel>>> GetParcels(int id)
        {
            var parcels = await _storkService.GetParcels(id);

            if (parcels == null)
            {
                return NotFound();
            }

            return Ok(parcels);
        }

        // PUT: Stork/SetPigeon
        [HttpPut]
        [Route("SetPigeon")]
        public async Task<ActionResult<Parcel>> GetParcel(SetPigeonDto setPigeon)
        {
            var parcel = await _storkService.SetPigeon(setPigeon.ParcelId, setPigeon.PigeonLogin);

            if (parcel == null)
            {
                return NotFound();
            }

            return Ok(parcel);
        }
    }
}
