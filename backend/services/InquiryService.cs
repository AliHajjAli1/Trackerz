using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class InquiryService : IInquiryService
{
    private readonly AppDbContext _context;

    public InquiryService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<InquiryCreateDto>> GetAllAsync()
    {
        return await _context.Inquiries.Select(inq => new InquiryCreateDto
        {
            ApplicationId = inq.ApplicationId,
            Subject = inq.Subject,
            InquiryText = inq.InquiryText,
            AskedDt = inq.AskedDt
        }).ToListAsync();
    }

    public async Task<InquiryCreateDto> CreateAsync(InquiryCreateDto dto)
    {
        var entity = new Inquiry
        {
            Id = dto.Id,
            ApplicationId = dto.ApplicationId,
            Subject = dto.Subject,
            InquiryText = dto.InquiryText,
            AskedDt = dto.AskedDt
        };
        _context.Inquiries.Add(entity);
        await _context.SaveChangesAsync();

        dto.Id = entity.Id;
        return dto;
    }

    public async Task<InquiryCreateDto> GetByIdAsync(int id)
    {
        var inq = await _context.Inquiries.FindAsync(id);
        if (inq == null) return new InquiryCreateDto { };

        return new InquiryCreateDto
        {
            Id = inq.Id,
            Subject = inq.Subject,
            InquiryText = inq.InquiryText,
            AskedDt = inq.AskedDt,
            ApplicationId = inq.ApplicationId
        };
    }
}