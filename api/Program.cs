using OpenTelemetry.Resources;
using OpenTelemetry.Trace;

var serviceName = "BriansCoolWeatherAPI";
var serviceVersion = "1.0.0";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddOpenTelemetryTracing(tracerProviderBuilder =>
{
  tracerProviderBuilder
      .AddConsoleExporter()
      .AddSource(serviceName)
      .SetResourceBuilder(
          ResourceBuilder.CreateDefault()
              .AddService(serviceName: serviceName, serviceVersion: serviceVersion))
      .AddHttpClientInstrumentation()
      .AddAspNetCoreInstrumentation()
      .AddSqlClientInstrumentation()
      .AddOtlpExporter()
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors(x => x.AllowAnyHeader().WithOrigins("http://127.0.0.1:5173").AllowAnyMethod());

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();


app.Run();

