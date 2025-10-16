using System.Text.Json;
using System.Text.Json.Serialization;
using Boljau.Server.Model;
using Microsoft.AspNetCore.Mvc;

namespace Boljau.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Events : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly string apiKey = "VmCsykKE1WqTHUHxJma1tGu1E0eo8sDu";
        public Events(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        [HttpGet]
        public async Task<IActionResult> GetInitialEventAsync()
        {
            string CountryCode = "IE";
            var url = $"https://app.ticketmaster.com/discovery/v2/events.json?apikey={apiKey}" +
                 $"&countryCode={CountryCode}";
            try
            {
                var response = await _httpClient.GetAsync(url);
                if (response.IsSuccessStatusCode)
                {
                    var json = await ReadDeserializeAsync(response);                   
                    return Ok(json);
                }
                else
                {
                    return BadRequest(new { message = "Error" });
                }

            }
            catch(Exception ex)
            {
                return BadRequest(new { message = "Error: ", error = ex.Message });
            }
            
        }
        

        [HttpPost("Search")]
        public async Task<IActionResult> GetEventsAsync([FromBody] EventsSearchRequest obj)
        {
            var url = $"https://app.ticketmaster.com/discovery/v2/events.json?apikey={apiKey}" +
                  $"&keyword={obj.Keyword}" +
                  $"&countryCode={obj.CountryCode}";
            if (!string.IsNullOrEmpty(obj.City))
            {
                url += $"&city={obj.City}";
            }
            if (!string.IsNullOrEmpty(obj.StartDate) && !string.IsNullOrEmpty(obj.EndDate))
            {
                url += $"&startDateTime={obj.StartDate}T00:00:00Z&endDateTime={obj.EndDate}T23:59:59Z";
            }
            try
            {
                var response =await _httpClient.GetAsync(url);
                if (response.IsSuccessStatusCode)
                {
                    var json = await ReadDeserializeAsync(response);
                    return Ok(json);
                }
                else
                {
                    return BadRequest(new { message = "Error" });
                }

            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error" });
            }
        }
        private static async Task<object> ReadDeserializeAsync(HttpResponseMessage response)
        {
            var stream = await response.Content.ReadAsStreamAsync();
            var json = await JsonSerializer.DeserializeAsync<object>(stream);
            return (json);
        }
    }
}
