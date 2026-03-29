# Issue Templates

## Feature Request

**Is your feature request related to a problem? Please describe.**
There is no data model to represent repositories, scans, rule results, scores, or recommendations — making it impossible to persist or query any RepoGuardian data.

**Describe the solution you'd like**
Create the following entities in FullStackProject.Core/Domains/RepoGuardian/: GithubRepository, ScanRun, RuleResult, ComplianceScore, Recommendation, along with ScanRunStatus and RuleCategory enums. All entities must extend FullAuditedEntity and use data annotations for validation.

**Describe alternatives you've considered**
Using a single flat table for all scan data — rejected because it would make querying by category, rule, and recommendation impossible without complex JSON columns.

**Additional context**
Entities must be dumb (no logic). All business logic goes in the domain service.

---

## Bug Report

**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Desktop (please complete the following information):**
 - OS: [e.g. iOS]
 - Browser [e.g. chrome, safari]
 - Version [e.g. 22]

**Smartphone (please complete the following information):**
 - Device: [e.g. iPhone6]
 - OS: [e.g. iOS8.1]
 - Browser [e.g. stock browser, safari]
 - Version [e.g. 22]

**Additional context**
Add any other context about the problem here.
