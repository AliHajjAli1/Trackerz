using System.Globalization;

public class AppCreateDto
{
    public string? Name { get; set; }
    public string? Status { get; set; }
    public string? Location { get; set; }
    public int? Value { get; set; }
    public DateTime? CreateDt { get; set; }
    public int getStatusId(string? status)
    {
        return status switch
        {
            "New" => 1,
            "Awaiting PreChecks" => 2,
            "Approved" => 3,
            "In Progress" => 4,
            "Completed" => 5,
            "Site Issues" => 6,
            "Additional Documents Required" => 7,
            "New Quotes Required" => 8,
            "Closed" => 9,
            _ => 1
        };
    }
}
