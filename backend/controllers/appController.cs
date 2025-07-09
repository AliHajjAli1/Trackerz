using Microsoft.AspNetCore.Mvc;
using backend.Data;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class AppController : ControllerBase
{
    private readonly AppDbContext _context;

    public AppController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetApplications()
    {
        var applications = await _context.Application.ToListAsync();
        return Ok(applications);
    }

    [HttpPost]
    public async Task<IActionResult> AddApplication([FromBody] Application application)
    {
        _context.Application.Add(application);
        await _context.SaveChangesAsync();
        return Ok(application);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateApplication(int id, [FromBody] Application application)
    {
        if (id != application.Id)
        {
            return BadRequest("Application ID mismatch.");
        }

        _context.Entry(application).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteApplication(int id)
    {
        var application = await _context.Application.FindAsync(id);
        if (application == null)
        {
            return NotFound();
        }

        _context.Application.Remove(application);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
