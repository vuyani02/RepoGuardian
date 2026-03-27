using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Abp.Dependency;
using Abp.UI;

namespace FullStackProject.RepoGuardian.GitHub
{
    /// <summary>
    /// Fetches repository file tree metadata from the GitHub API.
    /// </summary>
    public class GithubService : ITransientDependency
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public GithubService(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        /// <summary>
        /// Returns a flat list of all file paths in the given public GitHub repository.
        /// </summary>
        public async Task<List<string>> GetFileTreeAsync(string owner, string repo)
        {
            var client = _httpClientFactory.CreateClient("GitHub");
            var defaultBranch = await GetDefaultBranchAsync(client, owner, repo);
            return await GetTreePathsAsync(client, owner, repo, defaultBranch);
        }

        private async Task<string> GetDefaultBranchAsync(HttpClient client, string owner, string repo)
        {
            var response = await client.GetAsync($"repos/{owner}/{repo}");

            if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
                throw new UserFriendlyException($"Repository '{owner}/{repo}' not found. It may be private or does not exist.");

            if (!response.IsSuccessStatusCode)
                throw new UserFriendlyException($"GitHub API error ({(int)response.StatusCode}) while accessing '{owner}/{repo}'.");

            var json = await response.Content.ReadAsStringAsync();
            return JsonDocument.Parse(json).RootElement.GetProperty("default_branch").GetString();
        }

        private static async Task<List<string>> GetTreePathsAsync(HttpClient client, string owner, string repo, string branch)
        {
            var response = await client.GetAsync($"repos/{owner}/{repo}/git/trees/{branch}?recursive=1");

            if (!response.IsSuccessStatusCode)
                throw new UserFriendlyException("Could not fetch repository file tree from GitHub.");

            var json = await response.Content.ReadAsStringAsync();
            var tree = JsonDocument.Parse(json).RootElement.GetProperty("tree");

            return tree.EnumerateArray()
                .Where(item => item.GetProperty("type").GetString() == "blob")
                .Select(item => item.GetProperty("path").GetString())
                .ToList();
        }
    }
}
