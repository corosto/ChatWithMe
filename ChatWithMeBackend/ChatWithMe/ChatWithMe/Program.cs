using ChatWithMe.Database;
using ChatWithMe.Middleware;
using ChatWithMe.Services;
using MapacenBackend.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("auth", new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.Http,
        In = ParameterLocation.Header,
        Scheme = JwtBearerDefaults.AuthenticationScheme,
        Description = "Standard Authorization header using the Bearer scheme (\"bearer {token}\")",
        Name = "Authorization",
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "auth"
                }
            },
            Array.Empty<string>()
        }
    });
    options.DescribeAllParametersInCamelCase();
});
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("ChatWithMeString")));

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Token"]))
        };
    });

builder.Services.AddHostedService<ClearDislikesWorkerService>()
            .Configure<HostOptions>(hostOptions => hostOptions.BackgroundServiceExceptionBehavior = BackgroundServiceExceptionBehavior.Ignore);
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IMatchService, MatchService>();
builder.Services.AddScoped<ErrorHandlingMiddleware>();
builder.Services.AddAutoMapper(typeof(AutoMapperProfile).Assembly);
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();
builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
    builder.AllowAnyMethod()
    .AllowAnyHeader()
    .AllowAnyOrigin()));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ErrorHandlingMiddleware>();
app.UseCors("corsapp");
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
