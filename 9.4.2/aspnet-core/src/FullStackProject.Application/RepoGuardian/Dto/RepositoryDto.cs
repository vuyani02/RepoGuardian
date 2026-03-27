using System;

namespace FullStackProject.RepoGuardian.Dto
{
    public class RepositoryDto
    {
        public Guid Id { get; set; }
        public string GithubUrl { get; set; }
        public string Owner { get; set; }
        public string Name { get; set; }
    }
}
