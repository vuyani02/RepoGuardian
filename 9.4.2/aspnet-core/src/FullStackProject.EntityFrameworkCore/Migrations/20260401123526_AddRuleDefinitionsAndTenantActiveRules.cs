using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FullStackProject.Migrations
{
    /// <inheritdoc />
    public partial class AddRuleDefinitionsAndTenantActiveRules : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RuleDefinitions",
                columns: table => new
                {
                    RuleId = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    RuleName = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Category = table.Column<int>(type: "integer", nullable: false),
                    WhatIsIt = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    WhyItMatters = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: false),
                    HowToAdd = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RuleDefinitions", x => x.RuleId);
                });

            migrationBuilder.CreateTable(
                name: "TenantActiveRules",
                columns: table => new
                {
                    TenantId = table.Column<int>(type: "integer", nullable: false),
                    RuleId = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TenantActiveRules", x => new { x.TenantId, x.RuleId });
                });

            // Seed all 17 rules as active for every existing tenant.
            migrationBuilder.Sql(@"
                INSERT INTO ""TenantActiveRules"" (""TenantId"", ""RuleId"")
                SELECT t.""Id"", r.""RuleId""
                FROM   ""AbpTenants"" t
                CROSS JOIN (VALUES
                    ('DOC_001'), ('DOC_002'), ('DOC_003'), ('DOC_004'), ('DOC_005'),
                    ('TEST_001'), ('TEST_002'),
                    ('CICD_001'), ('CICD_002'), ('CICD_003'), ('CICD_004'),
                    ('DEP_001'), ('DEP_002'),
                    ('SEC_001'), ('SEC_002'), ('SEC_003'), ('SEC_004')
                ) AS r(""RuleId"")
                WHERE t.""IsDeleted"" = false;
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RuleDefinitions");

            migrationBuilder.DropTable(
                name: "TenantActiveRules");
        }
    }
}
