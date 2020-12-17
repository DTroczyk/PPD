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
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PigeonController : ControllerBase
    {
        private readonly IPigeonService _pigeonService;
        private readonly IUserService _userService;

        public PigeonController(IPigeonService pigeonService, IUserService userService)
        {
            _pigeonService = pigeonService;
            _userService = userService;
        }

        // GET: Pigeon
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pigeon>>> GetPigeons()
        {
            return Ok(await _pigeonService.GetPigeons());
        }

        // GET: Pigeon/parcels
        [Route("parcels")]
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Parcel>>> GetParcels()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var user = await _userService.GetUser(identity);
            return Ok(await _pigeonService.GetParcels(user.Login));
        }

        // PUT: Pigeon/setStatus
        [Route("setstatus")]
        [HttpPut]
        public async Task<IActionResult> SetStatus(long parcelId, ParcelStatus status)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var user = await _userService.GetUser(identity);

            try
            {
                var parcel = await _pigeonService.SetStatus(user.Login, parcelId, status);
                return Ok(parcel);
            }
            catch (Exception e)
            {
                return StatusCode(406, new { message = e.Message });
            }

        }

        //    // POST: Pigeon
        //    // To protect from overposting attacks, enable the specific properties you want to bind to, for
        //    // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        //    [HttpPost]
        //    public async Task<ActionResult<Pigeon>> PostPigeon(Pigeon pigeon)
        //    {
        //        _context.Pigeons.Add(pigeon);
        //        try
        //        {
        //            await _context.SaveChangesAsync();
        //        }
        //        catch (DbUpdateException)
        //        {
        //            if (PigeonExists(pigeon.Login))
        //            {
        //                return Conflict();
        //            }
        //            else
        //            {
        //                throw;
        //            }
        //        }

        //        return CreatedAtAction("GetPigeon", new { id = pigeon.Login }, pigeon);
        //    }

        //    // DELETE: Pigeon/5
        //    [HttpDelete("{id}")]
        //    public async Task<ActionResult<Pigeon>> DeletePigeon(string id)
        //    {
        //        var pigeon = await _context.Pigeons.FindAsync(id);
        //        if (pigeon == null)
        //        {
        //            return NotFound();
        //        }

        //        _context.Pigeons.Remove(pigeon);
        //        await _context.SaveChangesAsync();

        //        return pigeon;
        //    }

        //    private bool PigeonExists(string id)
        //    {
        //        return _context.Pigeons.Any(e => e.Login == id);
        //    }
    }
}
