using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ChatWithMe.Migrations
{
    /// <inheritdoc />
    public partial class eluwina : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "City",
                table: "Users",
                newName: "City_Name");

            migrationBuilder.AddColumn<int>(
                name: "City_Height",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "City_Width",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "SexualOrientation",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SexualOrientationName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SexualOrientation", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserSexualOrientations",
                columns: table => new
                {
                    SexualOrientationId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSexualOrientations", x => new { x.SexualOrientationId, x.UserId });
                    table.ForeignKey(
                        name: "FK_UserSexualOrientations_SexualOrientation_SexualOrientationId",
                        column: x => x.SexualOrientationId,
                        principalTable: "SexualOrientation",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_UserSexualOrientations_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserSexualOrientations_UserId",
                table: "UserSexualOrientations",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserSexualOrientations");

            migrationBuilder.DropTable(
                name: "SexualOrientation");

            migrationBuilder.DropColumn(
                name: "City_Height",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "City_Width",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "City_Name",
                table: "Users",
                newName: "City");
        }
    }
}
