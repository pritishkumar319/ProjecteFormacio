using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project1.Contexts;
using Project1.Models;
using System.Diagnostics;

namespace Project1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PritishIncidenciesController : Controller
    {
        private readonly AngularGPI_Context _context;

        public PritishIncidenciesController(AngularGPI_Context context)
        {
            _context = context;
        }

        // GET: api/pritishIncidencies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PritishIncidencies>>> GetIncidencies()
        {
            return await _context.PritishIncidencies.ToListAsync();
        }

        // POST: api/pritishIncidencies
        [HttpPost]
        public async Task<ActionResult> SaveIncidencia(PritishIncidencies incidencia)
        {
            await _context.PritishIncidencies.AddAsync(incidencia);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetIncidencia", new { id = incidencia.nID }, incidencia);
        }

        // GET: api/pritishIncidencies/id
        [HttpGet("{id}")]
        [ActionName("GetIncidencia")]
        public async Task<ActionResult<PritishIncidencies>> GetIncidencia(int id)
        {
            var incidencia = await _context.PritishIncidencies.FindAsync(id);

            if (incidencia == null)
            {
                return NotFound();
            }
            return incidencia;
        }
        // POST: api/pritishIncidencies/id
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateIncidencia(int id, PritishIncidencies incidencia)
        {
            var inci = await _context.PritishIncidencies.FirstOrDefaultAsync(inci => inci.nID.Equals(id));
            if (inci != null)
            {
                inci.sEstat = incidencia.sEstat;
                inci.sTitol = incidencia.sTitol;
                inci.sDescripcio = incidencia.sDescripcio;
                inci.sTags = incidencia.sTags;
                inci.pImatge = incidencia.pImatge;
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetIncidencia", new { id = incidencia.nID }, incidencia);
            }
            else
            {
                return BadRequest("No s'ha trobat la incidencia");
            }

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteIncidencia(int id)
        {
            var inci = await _context.PritishIncidencies.FirstOrDefaultAsync(inci => inci.nID.Equals(id));
            var commentaris = await _context.PritishComentaris.Where(c => c.nCodiIncidencia.Equals(id)).ToListAsync();
            if (inci != null)
            {
                if(commentaris != null)
                {
                    _context.PritishComentaris.RemoveRange(commentaris);
                }
                _context.PritishIncidencies.Remove(inci);
                await _context.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return BadRequest("No s'ha trobat la incidencia");
            }
        }
    }
}
