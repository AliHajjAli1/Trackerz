using Microsoft.AspNetCore.Mvc;
using backend.Services;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class AppController : ControllerBase
{
    private readonly IApplicationService _service;

    public AppController(IApplicationService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetApplications()
    {
        var applications = await _service.GetAllAsync();
        return Ok(applications);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var app = await _service.GetByIdAsync(id);
        if (app == null) return NotFound();
        return Ok(app);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] AppCreateDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var created = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] AppCreateDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var success = await _service.UpdateAsync(id, dto);
        return success ? NoContent() : NotFound();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var success = await _service.DeleteAsync(id);
        return success ? NoContent() : NotFound();
    }


}
