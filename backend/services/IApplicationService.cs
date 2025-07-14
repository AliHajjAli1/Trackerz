namespace backend.Services;

public interface IApplicationService
{
    Task<IEnumerable<AppCreateDto>> GetAllAsync();
    Task<AppCreateDto> GetByIdAsync(int id);
    Task<AppCreateDto> CreateAsync(AppCreateDto dto);
    Task<bool> UpdateAsync(int id, AppCreateDto dto);
    Task<bool> DeleteAsync(int id);
}