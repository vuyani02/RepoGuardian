using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FullStackProject.Migrations
{
    /// <inheritdoc />
    public partial class AddUserToGithubRepository : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "OverallScore",
                table: "ScanRuns",
                type: "integer",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OverallScore",
                table: "ScanRuns");
        }
    }
}
