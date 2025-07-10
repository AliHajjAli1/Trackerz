using Microsoft.AspNetCore.Mvc;
using backend.Data;
using Microsoft.EntityFrameworkCore;

[ApiController]
    [Route("api/[controller]")]
    public class InquiriesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public InquiriesController(AppDbContext context)
        {
            _context = context;
        }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Inquiry>>> GetAll()
    {
        var inquiries = await _context.Inquiries.ToListAsync();
        return Ok(inquiries);
    }


    [HttpPost]
    public async Task<IActionResult> Create([FromBody] InquiryCreateDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var inquiry = new Inquiry
        {
            ApplicationId = dto.ApplicationId,
            Subject = dto.Subject,
            InquiryText = dto.InquiryText,
            AskedDt = dto.AskedDt
        };

        await _context.Inquiries.AddAsync(inquiry);
        await _context.SaveChangesAsync();

        return Ok(inquiry);
    }

}