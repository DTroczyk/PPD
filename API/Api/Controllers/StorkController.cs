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

        // GET: Stork
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Parcel>>> GetParcels()
        {
            var parcels = await _storkService.GetParcels(1);
            return Ok(parcels);
        }

        //// GET: api/Stork/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<Parcel>> GetParcel(string id)
        //{
        //    var parcel = await _context.Parcels.FindAsync(id);

        //    if (parcel == null)
        //    {
        //        return NotFound();
        //    }

        //    return parcel;
        //}

        //// PUT: api/Stork/5
        //// To protect from overposting attacks, enable the specific properties you want to bind to, for
        //// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutParcel(string id, Parcel parcel)
        //{
        //    if (id != parcel.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(parcel).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!ParcelExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        //// POST: api/Stork
        //// To protect from overposting attacks, enable the specific properties you want to bind to, for
        //// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        //[HttpPost]
        //public async Task<ActionResult<Parcel>> PostParcel(Parcel parcel)
        //{
        //    _context.Parcels.Add(parcel);
        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateException)
        //    {
        //        if (ParcelExists(parcel.Id))
        //        {
        //            return Conflict();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return CreatedAtAction("GetParcel", new { id = parcel.Id }, parcel);
        //}

        //// DELETE: api/Stork/5
        //[HttpDelete("{id}")]
        //public async Task<ActionResult<Parcel>> DeleteParcel(string id)
        //{
        //    var parcel = await _context.Parcels.FindAsync(id);
        //    if (parcel == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Parcels.Remove(parcel);
        //    await _context.SaveChangesAsync();

        //    return parcel;
        //}

        //private bool ParcelExists(string id)
        //{
        //    return _context.Parcels.Any(e => e.Id == id);
        //}
    }
}
