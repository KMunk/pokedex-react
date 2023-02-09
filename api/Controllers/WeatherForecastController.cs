using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
  private static readonly string[] Summaries = new[]
  {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

  private readonly ILogger<WeatherForecastController> _logger;

  public WeatherForecastController(ILogger<WeatherForecastController> logger)
  {
    _logger = logger;
  }

  [HttpGet]
  public IEnumerable<WeatherForecast> Get()
  {
    ActivitySource MyActivitySource = new("BriansCoolWeatherAPI");
    using var activity = MyActivitySource.StartActivity("Alexa... What's the weather today?");

    return Enumerable.Range(1, 5).Select(index =>
    {
      var a = DateOnly.FromDateTime(DateTime.Now.AddDays(index));
      var b = Random.Shared.Next(-20, 55);
      var c = Summaries[Random.Shared.Next(Summaries.Length)];

      activity?.SetTag("Date", a);
      activity?.SetTag("TemperatureC", b);
      activity?.SetTag("Summary", c);

      return new WeatherForecast
      {
        Date = a,
        TemperatureC = b,
        Summary = c
      };
    })
    .ToArray();
  }
}
