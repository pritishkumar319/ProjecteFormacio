using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project1.Contexts;
using Project1.Models;

namespace Project1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PritishTraduccionsController : Controller
    {
        private readonly AngularGPI_Context _context;
        public PritishTraduccionsController(AngularGPI_Context context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PritishTraduccions>>> GetTraduccions()
        {
            return await _context.PritishTraduccions.ToListAsync();
        }
        [HttpGet("cat")]
        public async Task<ActionResult> GetTraduccionsCat()
        {
            var result = await _context.PritishTraduccions.Select(b => new { b.sClau, b.sLang_Cat }).ToListAsync();
            return Ok(result);
        }

        [HttpGet("es")]
        public async Task<ActionResult> GetTraduccionsEs()
        {
            var result = await _context.PritishTraduccions.Select(b => new { b.sClau, b.sLang_Es }).ToListAsync();
            return Ok(result);
        }
    }
}
