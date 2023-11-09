using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ChatWithMe.Migrations
{
    /// <inheritdoc />
    public partial class fiksujemy : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsSuperLiked",
                table: "UserConversation",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsSuperLiked",
                table: "UserConversation");
        }
    }
}
