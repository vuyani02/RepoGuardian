using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Abp.Dependency;
using Castle.Core.Logging;
using FullStackProject.Domains.RepoGuardian;
using Microsoft.Extensions.Configuration;

namespace FullStackProject.RepoGuardian.AI
{
    /// <summary>
    /// Calls the Grok API to generate a human-readable explanation and fix suggestion for a failed compliance rule.
    /// </summary>
    public class AiExplanationService : ITransientDependency
    {
        public ILogger Logger { get; set; } = NullLogger.Instance;

        private readonly IHttpClientFactory _httpClientFactory;
        private readonly string _model;

        public AiExplanationService(IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _httpClientFactory = httpClientFactory;
            _model = configuration["Grok:Model"] ?? "grok-3-mini";
        }

        /// <summary>
        /// Returns a Recommendation for a failed rule, or null if the Grok API call fails.
        /// A failed AI call must never fail the overall scan.
        /// </summary>
        public async Task<Recommendation> GetRecommendationAsync(RuleResult failedRule, string owner, string repo)
        {
            try
            {
                Logger.InfoFormat("Requesting AI recommendation for rule {0} on {1}/{2}", failedRule.RuleId, owner, repo);

                var content = BuildRequestContent(failedRule, owner, repo);
                var client = _httpClientFactory.CreateClient("Grok");
                var response = await client.PostAsync("chat/completions", content);

                if (!response.IsSuccessStatusCode)
                {
                    var errorBody = await response.Content.ReadAsStringAsync();
                    Logger.WarnFormat("Grok API returned {0} for rule {1}. Response: {2}", (int)response.StatusCode, failedRule.RuleId, errorBody);
                    return null;
                }

                return await ParseResponseAsync(response, failedRule.Id);
            }
            catch (Exception ex)
            {
                Logger.WarnFormat(ex, "Grok API call failed for rule {0}", failedRule.RuleId);
                return null;
            }
        }

        private StringContent BuildRequestContent(RuleResult failedRule, string owner, string repo)
        {
            var prompt = "You are a code repository compliance expert.\n" +
                         "Repository: " + owner + "/" + repo + "\n" +
                         "Failed rule: " + failedRule.RuleName + " (category: " + failedRule.Category + ")\n\n" +
                         "Return a JSON object with exactly these three fields:\n" +
                         "- issueDescription: one sentence describing what is missing\n" +
                         "- explanation: 2-3 sentences explaining why this matters for this project\n" +
                         "- suggestedFix: concrete actionable steps to resolve this\n\n" +
                         "Return only valid JSON with no extra text.";

            var requestBody = new
            {
                model = _model,
                messages = new[] { new { role = "user", content = prompt } },
                response_format = new { type = "json_object" }
            };

            var json = JsonSerializer.Serialize(requestBody);
            return new StringContent(json, Encoding.UTF8, "application/json");
        }

        private static async Task<Recommendation> ParseResponseAsync(HttpResponseMessage response, Guid ruleResultId)
        {
            var json = await response.Content.ReadAsStringAsync();
            var root = JsonDocument.Parse(json).RootElement;
            var content = root
                .GetProperty("choices")[0]
                .GetProperty("message")
                .GetProperty("content")
                .GetString();

            var parsed = JsonDocument.Parse(content).RootElement;

            return new Recommendation
            {
                RuleResultId = ruleResultId,
                IssueDescription = parsed.GetProperty("issueDescription").GetString(),
                Explanation = parsed.GetProperty("explanation").GetString(),
                SuggestedFix = parsed.GetProperty("suggestedFix").GetString()
            };
        }
    }
}
