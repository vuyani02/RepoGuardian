using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Abp.Dependency;
using Abp.UI;
using Castle.Core.Logging;

namespace FullStackProject.RepoGuardian.GitHub
{
    /// <summary>
    /// Fetches repository file tree metadata from the GitHub API.
    /// </summary>
    public class GithubService : ITransientDependency
    {
        public ILogger Logger { get; set; } = NullLogger.Instance;

        private readonly IHttpClientFactory _httpClientFactory;

        public GithubService(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        /// <summary>
        /// Returns all branch names for the given public GitHub repository.
        /// </summary>
        public async Task<List<string>> GetBranchesAsync(string owner, string repo)
        {
            Logger.InfoFormat("Fetching branches for {0}/{1}", owner, repo);
            var client = _httpClientFactory.CreateClient("GitHub");
            var response = await client.GetAsync($"repos/{owner}/{repo}/branches");

            if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
                throw new UserFriendlyException($"Repository '{owner}/{repo}' not found. It may be private or does not exist.");

            if (!response.IsSuccessStatusCode)
                throw new UserFriendlyException($"GitHub API error ({(int)response.StatusCode}) while fetching branches for '{owner}/{repo}'.");

            var json = await response.Content.ReadAsStringAsync();
            return JsonDocument.Parse(json).RootElement.EnumerateArray()
                .Select(b => b.GetProperty("name").GetString())
                .ToList();
        }

        /// <summary>
        /// Returns a flat list of all file paths in the given public GitHub repository.
        /// If <paramref name="branch"/> is provided it is used directly; otherwise the repo's default branch is fetched first.
        /// </summary>
        public async Task<List<string>> GetFileTreeAsync(string owner, string repo, string branch = null)
        {
            Logger.InfoFormat("Fetching file tree for {0}/{1} (branch: {2})", owner, repo, branch ?? "default");
            var client = _httpClientFactory.CreateClient("GitHub");
            var targetBranch = branch ?? await GetDefaultBranchAsync(client, owner, repo);
            var paths = await GetTreePathsAsync(client, owner, repo, targetBranch);
            Logger.InfoFormat("Fetched {0} file paths from {1}/{2}", paths.Count, owner, repo);
            return paths;
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
