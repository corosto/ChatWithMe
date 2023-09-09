using ChatWithMe.Entities;
using Microsoft.EntityFrameworkCore;

namespace ChatWithMe.Database
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            //Database.EnsureDeleted();
            //Database.EnsureCreated();
        }

        public DbSet<User> Users { get; set; }
    }
}
