using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FullStackProject.Migrations
{
    /// <inheritdoc />
    public partial class SeedRuleDefinitions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                INSERT INTO ""RuleDefinitions"" (""RuleId"", ""RuleName"", ""Category"", ""WhatIsIt"", ""WhyItMatters"", ""HowToAdd"")
                VALUES
                (
                    'DOC_001', 'README exists', 0,
                    'A README file is the primary documentation entry point for a repository, typically a Markdown file at the root level.',
                    'Without a README, developers have no starting point to understand what the project does, how to set it up, or how to contribute — wasting time and reducing adoption.',
                    'Create a README.md in the root of your repository. Include sections for project description, installation instructions, usage examples, and contribution guidelines.'
                ),
                (
                    'DOC_002', 'LICENSE exists', 0,
                    'A LICENSE file defines the legal terms under which the source code can be used, modified, and distributed.',
                    'Without a license, the code is technically all rights reserved by default, meaning others cannot legally use or contribute to it. Open source projects especially need explicit licensing.',
                    'Create a LICENSE file in the root of your repository. GitHub offers a license picker during repository creation. Common choices include MIT, Apache 2.0, and GPL v3.'
                ),
                (
                    'DOC_003', 'CONTRIBUTING guide exists', 0,
                    'A CONTRIBUTING.md file explains how external contributors can participate in the project, including the workflow, coding standards, and pull request process.',
                    'Without clear contribution guidelines, potential contributors do not know how to submit changes, leading to poorly formatted PRs, missed conventions, and maintainer burnout from reviewing inconsistent submissions.',
                    'Create CONTRIBUTING.md in the root or .github/ folder. Describe how to fork the repo, name branches, write commit messages, and open a pull request.'
                ),
                (
                    'DOC_004', 'Changelog', 0,
                    'A CHANGELOG file tracks a curated, human-readable history of notable changes for each version of the project.',
                    'Without a changelog, users and contributors must dig through raw commit history to understand what changed between releases, slowing down adoption of updates and making release communication unclear.',
                    'Create CHANGELOG.md and follow the Keep a Changelog format (keepachangelog.com). Update it for each release with Added, Changed, Fixed, and Removed sections.'
                ),
                (
                    'DOC_005', 'Code of conduct', 0,
                    'A CODE_OF_CONDUCT.md file sets expectations for respectful behaviour within the project community.',
                    'Without a code of conduct, contributors from underrepresented groups may feel unwelcome, reducing community diversity and increasing the risk of harmful interactions going unaddressed.',
                    'Create CODE_OF_CONDUCT.md in the root or .github/ folder. The Contributor Covenant (contributor-covenant.org) is a widely adopted template that takes under five minutes to add.'
                ),
                (
                    'TEST_001', 'Test files or test directory exists', 1,
                    'This rule checks whether the repository contains a test suite — either a dedicated test directory or files matching patterns like .test. or .spec.',
                    'Without tests, regressions are only caught in production, making refactoring risky and long-term maintenance increasingly costly as the codebase grows.',
                    'Create a tests/ or __tests__/ directory and add unit or integration tests. For JavaScript use Jest or Vitest; for Python use pytest; for C# use xUnit or NUnit.'
                ),
                (
                    'TEST_002', 'Test coverage configuration', 1,
                    'A coverage configuration file such as jest.config.js, .coveragerc, or codecov.yml tells the toolchain how to measure and report which lines of code are exercised by tests.',
                    'Without coverage reporting, teams have no visibility into which parts of the codebase are untested, making it easy for gaps to silently grow with each new feature.',
                    'Add a coverage config for your test runner. For JavaScript add coverageReporters to jest.config.js; for Python add a [coverage:run] section to .coveragerc. Integrate with Codecov via codecov.yml to surface coverage on pull requests.'
                ),
                (
                    'CICD_001', 'CI/CD pipeline configured', 2,
                    'A CI/CD pipeline automates building, testing, and optionally deploying code on every push or pull request.',
                    'Without automation, tests are only run when developers remember to run them locally, allowing broken code to reach main branches and making deployments manual and error-prone.',
                    'Create .github/workflows/ci.yml for GitHub Actions, .gitlab-ci.yml for GitLab CI, or a Jenkinsfile for Jenkins. At minimum define a workflow that installs dependencies and runs your test suite.'
                ),
                (
                    'CICD_002', 'Linting or formatting configuration', 2,
                    'A linting or formatting config file such as .eslintrc, prettierrc, or .editorconfig enforces a consistent code style across all contributors.',
                    'Without enforced code style, PRs become cluttered with style debates, diffs are harder to review, and code review time is spent on formatting rather than logic.',
                    'Add .eslintrc.json for JavaScript, .pylintrc for Python, or .editorconfig for multi-language projects. Wire the linter into your CI pipeline so style violations fail the build before merging.'
                ),
                (
                    'CICD_003', 'Containerisation (Docker)', 2,
                    'A Dockerfile or docker-compose.yml defines how to build and run the application in a reproducible, isolated container.',
                    'Without containerisation, works-on-my-machine problems are common — development, CI, and production environments diverge subtly, causing hard-to-diagnose environment-specific bugs.',
                    'Create a Dockerfile in the root that installs dependencies and starts your application. Add docker-compose.yml if you have multiple services. Include a step in CI that builds the image to validate it on every push.'
                ),
                (
                    'CICD_004', 'PR or issue templates', 2,
                    'GitHub PR and issue templates stored in .github/ provide structured forms that guide contributors when opening pull requests or reporting bugs.',
                    'Without templates, PRs and issues often lack the context needed for efficient review, leading to back-and-forth clarification, slower merges, and low-quality bug reports.',
                    'Create .github/pull_request_template.md with description, testing steps, and related issue sections. Add .github/ISSUE_TEMPLATE/bug_report.md with reproduction steps and expected behaviour.'
                ),
                (
                    'DEP_001', 'Dependency lock file', 3,
                    'A lock file such as package-lock.json, yarn.lock, or Pipfile.lock pins the exact versions of all transitive dependencies installed in the project.',
                    'Without a lock file, different machines and CI environments may install slightly different dependency versions, introducing subtle bugs that are hard to reproduce and causing dependency drift over time.',
                    'Run npm install to generate package-lock.json, or yarn install for yarn.lock in Node.js projects. For Python run pipenv lock or poetry lock. Always commit the lock file to version control.'
                ),
                (
                    'DEP_002', 'Dependency update automation', 3,
                    'A Dependabot or Renovate configuration file automatically opens pull requests when dependencies have newer versions available.',
                    'Without automated updates, dependencies fall behind, accumulating known security vulnerabilities and making major version upgrades increasingly painful the longer they are deferred.',
                    'Create .github/dependabot.yml and configure update schedules per ecosystem such as npm, pip, or nuget. Alternatively add renovate.json with the base config preset to use Renovate Bot.'
                ),
                (
                    'SEC_001', '.gitignore exists', 4,
                    'A .gitignore file tells Git which files and directories to exclude from version control, such as build artefacts, IDE config, and local environment files.',
                    'Without a .gitignore, build artefacts, IDE settings, log files, and local configuration are accidentally committed, cluttering the history, bloating the repo size, and risking exposure of sensitive local paths.',
                    'Create a .gitignore in the root of your repository. GitHubs gitignore templates (github.com/github/gitignore) provide sensible defaults for every language and framework.'
                ),
                (
                    'SEC_002', 'No .env files committed', 4,
                    'This rule checks that real .env files containing environment-specific configuration have not been committed to the repository.',
                    '.env files often contain API keys, database credentials, and other secrets. Committing them exposes those secrets to everyone with repository access and, for public repos, to the entire internet.',
                    'Add .env to your .gitignore immediately. If secrets have already been committed, rotate them and use git filter-repo to purge the history. Store secrets in environment variables or a dedicated secrets manager such as Vault or AWS Secrets Manager.'
                ),
                (
                    'SEC_003', 'Security policy or CODEOWNERS exists', 4,
                    'A SECURITY.md file describes how to report vulnerabilities responsibly, while CODEOWNERS assigns automatic reviewers to critical parts of the codebase.',
                    'Without a security policy, researchers who discover vulnerabilities have no clear channel to report them privately, leading to public disclosure before a fix is available and reputational damage.',
                    'Create SECURITY.md describing how to report vulnerabilities privately, for example via GitHubs private vulnerability reporting feature. Add CODEOWNERS to assign mandatory reviewers to sensitive files such as auth code and CI configuration.'
                ),
                (
                    'SEC_004', '.env.example documents environment variables', 4,
                    'An .env.example file lists all required environment variables with placeholder values but without any real secrets.',
                    'Without a documented example, new developers must reverse-engineer which environment variables are needed by reading the source code, slowing onboarding and leading to misconfigured local environments.',
                    'Create .env.example in the root with all required variables set to descriptive placeholder values such as DATABASE_URL=postgresql://user:password@localhost/mydb. Keep it in sync with actual requirements as the project evolves.'
                )
                ON CONFLICT (""RuleId"") DO NOTHING;
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"DELETE FROM ""RuleDefinitions"";");
        }
    }
}
