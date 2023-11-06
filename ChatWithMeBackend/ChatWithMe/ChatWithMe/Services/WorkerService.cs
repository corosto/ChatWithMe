using ChatWithMe.Database;

namespace ChatWithMe.Services;

public sealed class ClearDislikesWorkerService : BackgroundService
{
    private readonly IServiceProvider _serviceProvider;

    public ClearDislikesWorkerService(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            using var scope = _serviceProvider.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();

            var matches = dbContext
                .Match
                .Where(u => u.Status == 0)
                .ToList();

            dbContext.Match.RemoveRange(matches);
            dbContext.SaveChanges();

            await Task.Delay(TimeSpan.FromHours(4), stoppingToken);
        }
    }
}