namespace backend.Services;

public interface IInquiryService
{
    Task<IEnumerable<InquiryCreateDto>> GetAllAsync();
    Task<InquiryCreateDto> GetByIdAsync(int id);
    Task<InquiryCreateDto> CreateAsync(InquiryCreateDto dto);
}