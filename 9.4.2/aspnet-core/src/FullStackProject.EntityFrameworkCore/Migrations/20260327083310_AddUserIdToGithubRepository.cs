using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FullStackProject.Migrations
{
    /// <inheritdoc />
    public partial class AddUserIdToGithubRepository : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "UserId",
                table: "GithubRepositories",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_GithubRepositories_UserId",
                table: "GithubRepositories",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_GithubRepositories_AbpUsers_UserId",
                table: "GithubRepositories",
                column: "UserId",
                principalTable: "AbpUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GithubRepositories_AbpUsers_UserId",
                table: "GithubRepositories");

            migrationBuilder.DropIndex(
                name: "IX_GithubRepositories_UserId",
                table: "GithubRepositories");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "GithubRepositories");
        }
    }
}
