using Microsoft.AspNetCore.Mvc;
using backend.Services;

[ApiController]
[Route("api/[controller]")]
public class InquiriesController : ControllerBase
{
    private readonly IInquiryService _service;

    public InquiriesController(IInquiryService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult> GetAll()
    {
        var inquiries = await _service.GetAllAsync();
        return Ok(inquiries);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var app = await _service.GetByIdAsync(id);
        if (app == null) return NotFound();
        return Ok(app);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] InquiryCreateDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var created = await _service.CreateAsync(dto);

        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

}