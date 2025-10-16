namespace Boljau.Server.Model
{
    public class EventsSearchRequest
    {
        public string Keyword { get; set; } = "music";
        public string? City { get; set; }
        public string? CountryCode { get; set; } = "IE";
        public string? StartDate { get; set; }
        public string? EndDate { get; set; }   
    }
}
