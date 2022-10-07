using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project1.Contexts;
using Project1.Models;

namespace Project1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PritishComentarisController : Controller
    {
        private readonly AngularGPI_Context _context;
    
        public PritishComentarisController(AngularGPI_Context context)
        {
            _context = context;
        }
        // GET: api/pritishComentaris/comentari
        [HttpGet("Comentari/{id}")]
        public async Task<ActionResult<List<PritishComentari>>> GetComentaris(int id)
        {
            System.Diagnostics.Debug.WriteLine("gegeses");
            string query = "SELECT * from PritishComentaris where nCodiIncidencia =" + id + ";";
            var comentari = await _context.PritishComentaris.FromSqlRaw(query).ToListAsync();

            if (comentari == null)
            {
                return NotFound();
            }
            return comentari;
        }

        // POST: api/pritishComentaris/id
        [HttpPost]
        public async Task<ActionResult> SaveComentari(PritishComentari comentari)
        {
            await _context.PritishComentaris.AddAsync(comentari);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetComentari", new { id = comentari.nID }, comentari);
        }

        // GET: api/pritishIncidencies/id
        [HttpGet("{id}")]
        [ActionName("GetComentari")]
        public async Task<ActionResult<PritishComentari>> GetComentari(long id)
        {
            var comentari = await _context.PritishComentaris.FindAsync(id);

            if (comentari == null)
            {
                return NotFound();
            }
            return comentari;
        }
    }
}
