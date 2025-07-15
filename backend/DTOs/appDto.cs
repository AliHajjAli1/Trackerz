using System.Globalization;

public class AppCreateDto
{
    public int? Id { get; set; }
    public string? Name { get; set; }
    public string? Status { get; set; }
    public string? Location { get; set; }
    public decimal? Value { get; set; }
    public DateTime? CreatedAt { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public int? StatusId { get; set; }
}
