using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class ApplicationService : IApplicationService
    {
        private readonly AppDbContext _context;

        public ApplicationService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<AppCreateDto>> GetAllAsync()
        {
            return await _context.Application
                .Select(a => new AppCreateDto
                {
                    Id = a.Id,
                    Name = a.Name,
                    Status = a.Status,
                    Location = a.Location,
                    CreatedAt = a.CreatedAt,
                    Value = a.Value,
                    StartDate = a.StartDate,
                    EndDate = a.EndDate,
                    StatusId = a.StatusId
                })
                .ToListAsync();
        }

        public async Task<AppCreateDto> GetByIdAsync(int id)
        {
            var app = await _context.Application.FindAsync(id);
            if (app == null) return null;

            return new AppCreateDto
            {
                Id = app.Id,
                Name = app.Name,
                Status = app.Status,
                Location = app.Location,
                CreatedAt = app.CreatedAt,
                Value = app.Value,
                StartDate = app.StartDate,
                EndDate = app.EndDate,
                StatusId = app.StatusId
            };
        }

        public async Task<AppCreateDto> CreateAsync(AppCreateDto dto)
        {
            var entity = new Application
            {
                Name = dto.Name,
                Status = dto.Status,
                Location = dto.Location,
                CreatedAt = dto.CreatedAt,
                Value = dto.Value,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                StatusId = dto.StatusId
            };

            _context.Application.Add(entity);
            await _context.SaveChangesAsync();

            dto.Id = entity.Id;
            return dto;
        }

        public async Task<bool> UpdateAsync(int id, AppCreateDto dto)
        {
            var entity = await _context.Application.FindAsync(id);
            if (entity == null) return false;

            entity.Name = dto.Name;
            entity.Status = dto.Status;
            entity.StatusId = dto.StatusId;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _context.Application.FindAsync(id);
            if (entity == null) return false;

            _context.Application.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
