using ChatWithMe.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace ChatWithMe.Services;

public sealed class WorkerService : BackgroundService
{
    //private readonly AppDbContext _dbContext;
    //private readonly PeriodicTimer? _timer;

    //public WorkerService(AppDbContext dbContext)
    //{
        //    _dbContext = dbContext;
        //    _timer = new PeriodicTimer(interval);
    //}

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        //if (_timer is null)
        //{
        //    _logger.LogError("Invalid statistics update interval. Worker service will not start");
        //    return;
        //}
        //_logger.LogInformation("Statistics update worker service started.");

        //while (await _timer.WaitForNextTickAsync(stoppingToken) && !stoppingToken.IsCancellationRequested)
        //{
        //    using var scope = _serviceProvider.CreateScope();
        //    var mediator = scope.ServiceProvider.GetRequiredService<IMediator>();
        //    await mediator.Send(new UpdateStatisticsCommand(), stoppingToken);
        //}

        //_logger.LogInformation("Statistics update worker service stopped.");
    }
}


//w while sprawdzac czy godzina%6 == 0, jak tak to reset disliked