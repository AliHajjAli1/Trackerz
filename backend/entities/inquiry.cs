using System.ComponentModel.DataAnnotations.Schema;

[Table("Inquries", Schema = "gov")]
public class Inquiry
{
    public int? Id { get; set; }

    [Column("ApplicationId")]
    public int? ApplicationId { get; set; }

    [Column("Subject")]
    public string? Subject { get; set; }

    [Column("Inquiry")]
    public string? InquiryText { get; set; }

    [Column("AskedDt")]
    public DateTime? AskedDt { get; set; }
}
