using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ChatWithMe.Migrations
{
    /// <inheritdoc />
    public partial class siema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Work",
                table: "Users",
                newName: "Job");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Job",
                table: "Users",
                newName: "Work");
        }
    }
}
