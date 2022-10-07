using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project1.Contexts;
using Project1.Cryptography;
using Project1.Models;
using System.Security.Cryptography;

namespace Project1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResponsablesController : Controller
    {
        private readonly AngularGPI_Context _context;

        public ResponsablesController(AngularGPI_Context context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<ActionResult> login(Responsables resp)
        {
            var inci = await _context.Responsables.FirstOrDefaultAsync(inci => inci.sEmail.Equals(resp.sEmail));
            if (inci != null)
            {
                string decryptedpass  = CryptoData.DecryptStringAES(inci.sContrasenya);
                if(decryptedpass == resp.sContrasenya)
                {
                    return Ok();

                }
                return BadRequest("Contrasenya Incorrecte");
            }
            else
            {
                return BadRequest("No s'ha trobat el Responsable");
            }
        }
        // POST: api/pritishIncidencies
        [HttpPost("register")]
        public async Task<ActionResult> SaveResponsable(Responsables responsable)
        {
            var resp = await _context.Responsables.FindAsync(responsable.sEmail);

            if (resp == null)
            {
                await _context.Responsables.AddAsync(responsable);
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetResponsable", new { id = responsable.sEmail }, responsable);
            }
            else
            {
                return BadRequest("Ja existeix el correu");
            };
            
        }


        // GET: api/pritishIncidencies/id
        [HttpGet("{id}")]
        public async Task<ActionResult<Responsables>> GetResponsable(string id)
        {
            var responsable = await _context.Responsables.FindAsync(id);

            if (responsable == null)
            {
                return NotFound();
            }
            return responsable;
        }

        [HttpGet]
        public async Task<Object> getResponsables()
        {
            var responsables = await _context.Responsables.Select(r =>new {r.sEmail, r.sNom, r.sCognoms }).ToListAsync();
            return Ok(responsables);
        }
    }
}
