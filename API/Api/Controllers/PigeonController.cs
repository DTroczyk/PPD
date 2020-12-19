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
using Api.ViewModels.DTOs;
using Api.ViewModels.VMs;

namespace Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PigeonController : ControllerBase
    {
        private readonly IPigeonService _pigeonService;

        public PigeonController(IPigeonService pigeonService)
        {
            _pigeonService = pigeonService;
        }

        // GET: Pigeon/parcels
        [Route("parcels")]
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Parcel>>> GetParcels()
        {
            return Ok(await _pigeonService.GetParcels());
        }

        // PUT: Pigeon/setStatus
        [Route("setstatus")]
        [HttpPut]
        [Authorize]
        public async Task<IActionResult> SetStatus(SetStatusDto setStatusDto)
        {
            try
            {
                var parcel = await _pigeonService.SetStatus(setStatusDto.ParcelId, setStatusDto.ParcelStatus);
                return Ok(parcel);
            }
            catch (Exception e)
            {
                return StatusCode(406, new { message = e.Message });
            }

        }

        // GET: Pigeon/getStatus
        [Route("getstatus")]
        [HttpGet]
        public ActionResult<IEnumerable<ParcelStatusVm>> GetStatus()
        {
            var statuses = new List<ParcelStatusVm>();
            for (int i = 1; ; i++)
            {
                ParcelStatus status = (ParcelStatus)i;
                if (status.ToString() != i.ToString())
                {
                    var statusVm = new ParcelStatusVm()
                    {
                        Id = i,
                        StatusName = status.ToString()
                    };
                    statuses.Add(statusVm);
                }
                else
                {
                    break;
                }
            }
            return Ok(statuses);
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
