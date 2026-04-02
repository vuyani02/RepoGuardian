using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FullStackProject.Migrations
{
    /// <inheritdoc />
    public partial class AddBranchToScanRun : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Branch",
                table: "ScanRuns",
                type: "character varying(250)",
                maxLength: 250,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Branch",
                table: "ScanRuns");
        }
    }
}
