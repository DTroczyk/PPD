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
    public class PigeonController : ControllerBase
    {
        private readonly IPigeonService _pigeonService;

        public PigeonController(IPigeonService pigeonService)
        {
            _pigeonService = pigeonService;
        }

        // GET: Pigeon
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pigeon>>> GetPigeons()
        {
            return Ok(await _pigeonService.GetPigeons());
        }

    //    // GET: Pigeon/5
    //    [HttpGet("{id}")]
    //    public async Task<ActionResult<Pigeon>> GetPigeon(string id)
    //    {
    //        var pigeon = await _context.Pigeons.FindAsync(id);

    //        if (pigeon == null)
    //        {
    //            return NotFound();
    //        }

    //        return pigeon;
    //    }

    //    // PUT: Pigeon/5
    //    // To protect from overposting attacks, enable the specific properties you want to bind to, for
    //    // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
    //    [HttpPut("{id}")]
    //    public async Task<IActionResult> PutPigeon(string id, Pigeon pigeon)
    //    {
    //        if (id != pigeon.Login)
    //        {
    //            return BadRequest();
    //        }

    //        _context.Entry(pigeon).State = EntityState.Modified;

    //        try
    //        {
    //            await _context.SaveChangesAsync();
    //        }
    //        catch (DbUpdateConcurrencyException)
    //        {
    //            if (!PigeonExists(id))
    //            {
    //                return NotFound();
    //            }
    //            else
    //            {
    //                throw;
    //            }
    //        }

    //        return NoContent();
    //    }

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
