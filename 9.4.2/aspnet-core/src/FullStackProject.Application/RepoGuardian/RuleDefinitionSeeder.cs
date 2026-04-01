using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Abp.Dependency;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Castle.Core.Logging;
using FullStackProject.Domains.RepoGuardian;
using Microsoft.Extensions.Configuration;

namespace FullStackProject.RepoGuardian
{
    /// <summary>
    /// One-time seeder: calls Gemini to generate educational content for each rule definition
    /// and inserts the rows into RuleDefinitions. Safe to re-run — skips existing rows.
    /// DELETE THIS CLASS AND ITS CALL SITE AFTER THE SEED HAS BEEN APPLIED TO PRODUCTION.
    /// </summary>
    public class RuleDefinitionSeeder : ITransientDependency
    {
        public ILogger Logger { get; set; } = NullLogger.Instance;

        private readonly IRepository<RuleDefinition, string> _ruleDefinitionRepo;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IUnitOfWorkManager _unitOfWorkManager;
        private readonly string _model;

        private static readonly List<(string RuleId, string RuleName, RuleCategory Category)> Rules = new()
        {
            ("DOC_001", "README",                               RuleCategory.Documentation),
            ("DOC_002", "LICENSE",                              RuleCategory.Documentation),
            ("DOC_003", "CONTRIBUTING guide",                   RuleCategory.Documentation),
            ("DOC_004", "Changelog",                            RuleCategory.Documentation),
            ("DOC_005", "Code of conduct",                      RuleCategory.Documentation),
            ("TEST_001", "Test files or test directory",        RuleCategory.Testing),
            ("TEST_002", "Test coverage configuration",         RuleCategory.Testing),
            ("CICD_001", "CI/CD pipeline configuration",       RuleCategory.CiCd),
            ("CICD_002", "Linting or formatting configuration", RuleCategory.CiCd),
            ("CICD_003", "Containerisation (Docker)",           RuleCategory.CiCd),
            ("CICD_004", "PR or issue templates",               RuleCategory.CiCd),
            ("DEP_001",  "Dependency lock file",                RuleCategory.Dependencies),
            ("DEP_002",  "Dependency update automation",        RuleCategory.Dependencies),
            ("SEC_001",  ".gitignore",                          RuleCategory.Security),
            ("SEC_002",  "No .env files committed",             RuleCategory.Security),
            ("SEC_003",  "Security policy or CODEOWNERS",       RuleCategory.Security),
            ("SEC_004",  ".env.example documents environment variables", RuleCategory.Security),
        };

        public RuleDefinitionSeeder(
            IRepository<RuleDefinition, string> ruleDefinitionRepo,
            IHttpClientFactory httpClientFactory,
            IUnitOfWorkManager unitOfWorkManager,
            IConfiguration configuration)
        {
            _ruleDefinitionRepo = ruleDefinitionRepo;
            _httpClientFactory = httpClientFactory;
            _unitOfWorkManager = unitOfWorkManager;
            _model = configuration["Gemini:Model"] ?? "gemini-2.5-flash";
        }

        /// <summary>Seeds all rule definitions. Skips any rule that already exists.</summary>
        public async Task SeedAsync()
        {
            using (_unitOfWorkManager.Begin())
            foreach (var (ruleId, ruleName, category) in Rules)
            {
                var existing = await _ruleDefinitionRepo.FirstOrDefaultAsync(r => r.Id == ruleId);
                if (existing != null)
                {
                    Logger.InfoFormat("RuleDefinitionSeeder: skipping {0} (already seeded)", ruleId);
                    continue;
                }

                Logger.InfoFormat("RuleDefinitionSeeder: generating content for {0}", ruleId);
                var content = await GenerateContentAsync(ruleId, ruleName, category.ToString());

                if (content == null)
                {
                    Logger.WarnFormat("RuleDefinitionSeeder: skipping {0} — Gemini call failed", ruleId);
                    continue;
                }

                await _ruleDefinitionRepo.InsertAsync(new RuleDefinition
                {
                    Id = ruleId,
                    RuleName = ruleName,
                    Category = category,
                    WhatIsIt = content.WhatIsIt,
                    WhyItMatters = content.WhyItMatters,
                    HowToAdd = content.HowToAdd,
                });

                Logger.InfoFormat("RuleDefinitionSeeder: seeded {0}", ruleId);
            }
        }

        private async Task<RuleContent> GenerateContentAsync(string ruleId, string ruleName, string category)
        {
            try
            {
                var prompt = "You are a software engineering best-practices expert.\n" +
                             "Compliance rule: " + ruleName + " (ID: " + ruleId + ", category: " + category + ")\n\n" +
                             "Return a JSON object with exactly these three fields:\n" +
                             "- whatIsIt: one sentence describing what file or pattern this rule checks for\n" +
                             "- whyItMatters: 2-3 sentences explaining why this matters for a healthy repository\n" +
                             "- howToAdd: concrete step-by-step instructions to satisfy this rule in a typical project\n\n" +
                             "Return only valid JSON with no extra text or markdown.";

                var requestBody = new
                {
                    model = _model,
                    messages = new[] { new { role = "user", content = prompt } },
                    response_format = new { type = "json_object" }
                };

                var client = _httpClientFactory.CreateClient("Gemini");
                var response = await client.PostAsync("chat/completions",
                    new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json"));

                if (!response.IsSuccessStatusCode) return null;

                var json = await response.Content.ReadAsStringAsync();
                var root = JsonDocument.Parse(json).RootElement;
                var inner = root.GetProperty("choices")[0].GetProperty("message").GetProperty("content").GetString();
                var parsed = JsonDocument.Parse(inner).RootElement;

                return new RuleContent
                {
                    WhatIsIt    = Truncate(parsed.GetProperty("whatIsIt").GetString(),    1000),
                    WhyItMatters = Truncate(parsed.GetProperty("whyItMatters").GetString(), 2000),
                    HowToAdd    = Truncate(parsed.GetProperty("howToAdd").GetString(),    2000),
                };
            }
            catch (Exception ex)
            {
                Logger.WarnFormat(ex, "RuleDefinitionSeeder: Gemini call failed for {0}", ruleId);
                return null;
            }
        }

        private static string Truncate(string value, int maxLength) =>
            value?.Length > maxLength ? value[..maxLength] : value;

        private sealed class RuleContent
        {
            public string WhatIsIt { get; set; }
            public string WhyItMatters { get; set; }
            public string HowToAdd { get; set; }
        }
    }
}
