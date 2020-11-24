using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.BLL.Entities;
using Api.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly IClientService _clientService;

        public ClientController(IClientService clientService)
        {
            _clientService = clientService;
        }

        // GET: Client/1 
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Warehouse>>> FollowParcel(long id)
        {
            var parcelId = id.ToString();
            var history = await _clientService.FollowParcel(parcelId);

            if (history.Count() == 0)
            {
                return NotFound();
            }

            return Ok(history);
        }
    }
}
