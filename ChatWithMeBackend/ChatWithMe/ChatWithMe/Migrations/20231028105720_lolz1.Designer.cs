﻿// <auto-generated />
using System;
using ChatWithMe.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace ChatWithMe.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20231028105720_lolz1")]
    partial class lolz1
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("ChatWithMe.Entities.Image", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Image");
                });

            modelBuilder.Entity("ChatWithMe.Entities.Interest", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("InterestName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Interest");
                });

            modelBuilder.Entity("ChatWithMe.Entities.SexualOrientation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("SexualOrientationName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("SexualOrientation");
                });

            modelBuilder.Entity("ChatWithMe.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Alcohol")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("BirthDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Diet")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Education")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Gym")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Height")
                        .HasColumnType("int");

                    b.Property<string>("Job")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Kids")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LookingFor")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("Pets")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Position")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RefreshToken")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("School")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Sex")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ShowMe")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Smoking")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("TokenCreated")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("TokenExpires")
                        .HasColumnType("datetime2");

                    b.Property<int>("Width")
                        .HasColumnType("int");

                    b.Property<string>("Zodiac")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("ChatWithMe.Entities.UserInterests", b =>
                {
                    b.Property<int>("InterestId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("InterestId", "UserId");

                    b.HasIndex("UserId");

                    b.ToTable("UserInterests");
                });

            modelBuilder.Entity("ChatWithMe.Entities.UserSexualOrientations", b =>
                {
                    b.Property<int>("SexualOrientationId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("SexualOrientationId", "UserId");

                    b.HasIndex("UserId");

                    b.ToTable("UserSexualOrientations");
                });

            modelBuilder.Entity("ChatWithMe.Entities.Image", b =>
                {
                    b.HasOne("ChatWithMe.Entities.User", "User")
                        .WithMany("Images")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("ChatWithMe.Entities.User", b =>
                {
                    b.OwnsOne("ChatWithMe.Models.City", "City", b1 =>
                        {
                            b1.Property<int>("UserId")
                                .HasColumnType("int");

                            b1.Property<int>("Height")
                                .HasColumnType("int");

                            b1.Property<string>("Name")
                                .IsRequired()
                                .HasColumnType("nvarchar(max)");

                            b1.Property<int>("Width")
                                .HasColumnType("int");

                            b1.HasKey("UserId");

                            b1.ToTable("Users");

                            b1.WithOwner()
                                .HasForeignKey("UserId");
                        });

                    b.Navigation("City")
                        .IsRequired();
                });

            modelBuilder.Entity("ChatWithMe.Entities.UserInterests", b =>
                {
                    b.HasOne("ChatWithMe.Entities.Interest", "Interest")
                        .WithMany("Users")
                        .HasForeignKey("InterestId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("ChatWithMe.Entities.User", "User")
                        .WithMany("Interests")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Interest");

                    b.Navigation("User");
                });

            modelBuilder.Entity("ChatWithMe.Entities.UserSexualOrientations", b =>
                {
                    b.HasOne("ChatWithMe.Entities.SexualOrientation", "SexualOrientation")
                        .WithMany("Users")
                        .HasForeignKey("SexualOrientationId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("ChatWithMe.Entities.User", "User")
                        .WithMany("SexualOrientations")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("SexualOrientation");

                    b.Navigation("User");
                });

            modelBuilder.Entity("ChatWithMe.Entities.Interest", b =>
                {
                    b.Navigation("Users");
                });

            modelBuilder.Entity("ChatWithMe.Entities.SexualOrientation", b =>
                {
                    b.Navigation("Users");
                });

            modelBuilder.Entity("ChatWithMe.Entities.User", b =>
                {
                    b.Navigation("Images");

                    b.Navigation("Interests");

                    b.Navigation("SexualOrientations");
                });
#pragma warning restore 612, 618
        }
    }
}
