using Backend.Data;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Database: connection string comes from config / env var
// (ConnectionStrings__DefaultConnection in Docker)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// CORS: allowed origins come from the ALLOWED_ORIGINS env var (comma-separated)
var origins = (builder.Configuration["ALLOWED_ORIGINS"] ?? "http://localhost:3000,http://localhost:5173")
    .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
builder.Services.AddCors(options =>
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins(origins).AllowAnyHeader().AllowAnyMethod()));

var app = builder.Build();

// Apply migrations on startup and seed one row if empty
using (var scope = app.Services.CreateScope()) {
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
    if (!db.Samples.Any()) {
        db.Samples.Add(new Sample { Name = "Gum" });
        db.SaveChanges();
    }
}

app.UseCors();

app.MapGet("/health", () => Results.Ok("healthy"));

app.MapGet("/api/samples", async (AppDbContext db) =>
    await db.Samples.OrderBy(i => i.Id).ToListAsync());

app.MapPost("/api/samples", async (Sample sample, AppDbContext db) => {
    sample.Id = 0; // let the database assign the id
    db.Samples.Add(sample);
    await db.SaveChangesAsync();
    return Results.Created($"/api/Samples/{sample.Id}", sample);
});

app.Run();