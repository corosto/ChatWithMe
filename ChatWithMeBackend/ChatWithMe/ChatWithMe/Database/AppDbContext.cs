﻿using ChatWithMe.Entities;
using ChatWithMe.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace ChatWithMe.Database
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            //Database.EnsureDeleted();
            //Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserInterests>()
                .HasKey(ui => new { ui.InterestId, ui.UserId });

            modelBuilder.Entity<UserInterests>()
                .HasOne(uo => uo.User)
                .WithMany(u => u.Interests)
                .HasForeignKey(uo => uo.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<UserInterests>()
                .HasOne(uo => uo.Interest)
                .WithMany(o => o.Users)
                .HasForeignKey(uo => uo.InterestId)
                .OnDelete(DeleteBehavior.NoAction);


            modelBuilder.Entity<UserSexualOrientations>()
                .HasKey(ui => new { ui.SexualOrientationId, ui.UserId });

            modelBuilder.Entity<UserSexualOrientations>()
                .HasOne(uo => uo.User)
                .WithMany(u => u.SexualOrientations)
                .HasForeignKey(uo => uo.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<UserSexualOrientations>()
                .HasOne(uo => uo.SexualOrientation)
                .WithMany(o => o.Users)
                .HasForeignKey(uo => uo.SexualOrientationId)
                .OnDelete(DeleteBehavior.NoAction);


            modelBuilder.Entity<Entities.Image>()
                .HasOne(o => o.User)
                .WithMany(p => p.Images)
                .HasForeignKey(o => o.UserId)
                .OnDelete(DeleteBehavior.NoAction);


            modelBuilder.Entity<User>()
                .OwnsOne(u => u.City);


            modelBuilder.Entity<Match>();
        }

        public DbSet<User> Users { get; set; }
        public DbSet<UserInterests> UserInterests { get; set; }
        public DbSet<Interest> Interest { get; set; }
        public DbSet<UserSexualOrientations> UserSexualOrientations { get; set; }
        public DbSet<SexualOrientation> SexualOrientation { get; set; }
        public DbSet<Image> Image { get; set; }
        public DbSet<Match> Match { get; set; }
    }
}
