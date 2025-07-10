using System.ComponentModel.DataAnnotations.Schema;

[Table("Application", Schema = "gov")]
public class Application
{
    public int? Id { get; set; }

    [Column("AppStatus")]
    public string? Status { get; set; }

    [Column("ProjectName")]
    public string? Name { get; set; }

    [Column("OpenDt")]
    public DateTime? CreatedAt { get; set; }

    [Column("StartDt")]
    public DateTime? StartDate { get; set; }

    [Column("CompletedDt")]
    public DateTime? EndDate { get; set; }

    [Column("ProjectValue")]
    public decimal? Value { get; set; }

    [Column("StatusId")]
    public int? StatusId { get; set; }

    [Column("ProjectLocation")]
    public string? Location { get; set; }
}
