using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FullStackProject.Migrations
{
    /// <inheritdoc />
    public partial class AddTenantIdToRepoGuardianEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Clear all RepoGuardian data (demo data only) before adding non-nullable TenantId columns.
            // Delete in FK dependency order: leaf tables first.
            migrationBuilder.Sql(@"DELETE FROM ""Recommendations"";");
            migrationBuilder.Sql(@"DELETE FROM ""ComplianceScores"";");
            migrationBuilder.Sql(@"DELETE FROM ""RuleResults"";");
            migrationBuilder.Sql(@"DELETE FROM ""ScanRuns"";");
            migrationBuilder.Sql(@"DELETE FROM ""GithubRepositories"";");

            migrationBuilder.AddColumn<int>(
                name: "TenantId",
                table: "ScanRuns",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TenantId",
                table: "GithubRepositories",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TenantId",
                table: "ScanRuns");

            migrationBuilder.DropColumn(
                name: "TenantId",
                table: "GithubRepositories");
        }
    }
}
