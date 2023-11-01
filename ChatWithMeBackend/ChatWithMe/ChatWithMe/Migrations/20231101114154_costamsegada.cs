using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ChatWithMe.Migrations
{
    /// <inheritdoc />
    public partial class costamsegada : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LookingForAgeMax",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "LookingForAgeMin",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "LookingForDistanceMax",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "UseAgeFilter",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "UseDistanceFilter",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LookingForAgeMax",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "LookingForAgeMin",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "LookingForDistanceMax",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "UseAgeFilter",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "UseDistanceFilter",
                table: "Users");
        }
    }
}
