# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**RepoGuardian** — a SaaS tool that scans public GitHub repositories for best-practice compliance and generates an AI-powered report with scores, rule results, and fix recommendations.

Stack:
- **Backend**: ASP.NET Boilerplate (ABP) v9.4.1 on ASP.NET Core 8 (`9.4.2/aspnet-core/`)
- **Frontend**: Next.js 16 App Router with React 19, Ant Design (`9.4.2/nextjs/`)
- **Database**: PostgreSQL
- **AI**: Gemini API (`gemini-2.5-flash`, OpenAI-compatible endpoint) via Google AI Studio

## Commands

### Next.js Frontend (`9.4.2/nextjs/`)

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Production build
npm run build

# Lint
npm run lint
```

### ASP.NET Core Backend (`9.4.2/aspnet-core/`)

```bash
# Run the host
dotnet run --project src/FullStackProject.Web.Host

# Apply database migrations
dotnet ef database update --project src/FullStackProject.EntityFrameworkCore --startup-project src/FullStackProject.Web.Host

# Run the migrator utility directly
dotnet run --project src/FullStackProject.Migrator

# Build solution
dotnet build

# Run tests
dotnet test
```

### Docker

```bash
# Run full stack (from 9.4.2/aspnet-core/docker/ng/)
docker-compose up
```

## Collaboration Rules

**Defend decisions — never cave to pushback without a reason.** If the user challenges a technical decision, explain why the original approach was correct. Only change course if they provide a genuinely better technical argument. Agreeing just because the user disagrees is unhelpful and leads to worse code.

**Commit after every change.** Every file addition or meaningful edit gets its own commit immediately after it is written. Never batch multiple files into one commit. If a single file is built up incrementally (e.g., adding one rule at a time to `RuleEngine`), each increment is its own commit.

## Build Plan

### Phase 1 — Backend Scan Pipeline ✅ DONE

| Task | Status |
|------|--------|
| `GithubService` — fetch file tree via GitHub API | Done |
| `RuleEngine` — evaluate 10 rules across 5 categories | Done |
| DTOs (AddRepositoryRequest, RepositoryDto, StartScanRequest, RuleResultDto, ComplianceScoreDto, RecommendationDto, ScanResultDto) | Done |
| `IRepoGuardianAppService` + `RepoGuardianAppService` | Done |
| Named `HttpClient` registration in `Startup.cs` | Done |

**10 Rules across 5 categories:**

| Rule ID | Name | Category |
|---------|------|----------|
| DOC_001 | README exists | Documentation |
| DOC_002 | LICENSE exists | Documentation |
| DOC_003 | CONTRIBUTING guide exists | Documentation |
| TEST_001 | Test files or test directory exists | Testing |
| CICD_001 | CI/CD pipeline configured | CiCd |
| CICD_002 | Linting or formatting configuration exists | CiCd |
| DEP_001 | Dependency lock file exists | Dependencies |
| SEC_001 | .gitignore exists | Security |
| SEC_002 | No .env files committed | Security |
| SEC_003 | Security policy or CODEOWNERS exists | Security |

### Phase 2 — AI Recommendations ✅ DONE

- `AiExplanationService` — calls Gemini API for each failed rule
- Returns: issue description, explanation, suggested fix
- Saves `Recommendation` entities linked to `RuleResult`

### Phase 3 — Frontend

Multi-tenancy model: each tenant = a company. All users under a tenant share the same repos and scan history. Repos are tenant-scoped (not user-scoped).

#### Pages & Flow

**Repositories page** (`/repositories`)
- Lists all repos registered under the current tenant, with search and filters
- Each row has a **Scan** button → spinner popup → full results popup on completion
- Clicking a repo name navigates to the repo detail page

**Repo detail page** (`/repositories/[id]`)
- Shows repo metadata at the top
- **Scan** button (same behaviour as above)
- Table of all scans for that repo, sorted latest first
- Each scan row has a **View** button → full results popup

**Scans page** (`/scans`)
- Lists all scans across all repos in the tenant, sorted latest first
- Clicking any scan row → full results popup
- **Scan** button → popup to select an existing repo from a dropdown OR enter a new GitHub URL → runs scan → full results popup on completion

**Dashboard** (`/dashboard`)
- Summary stats: overall compliance score, total repos, total scans
- **Scan** button (same behaviour as scans page)

**Full results popup** (shared component used everywhere)
- Category score gauges (Documentation, Testing, CI/CD, Dependencies, Security)
- Rule results table (rule name, category, passed/failed, details)
- Recommendations panel for failed rules (issue description, explanation, suggested fix)

#### Backend change required
`GetRepositoriesAsync` currently filters by `UserId` — change to show all repos for the current tenant (remove the `UserId` filter, keep `UserId` on entity for audit only).

### Phase 4 — Polish & Deploy

- Render.com deployment (backend + frontend)
- Public shareable scan report links

## Architecture

### Backend Layer Structure

```
FullStackProject.Core            → Domain entities, domain logic, constants
FullStackProject.Application     → Application services, DTOs, IAppService interfaces
FullStackProject.EntityFrameworkCore → EF Core DbContext, repositories, migrations
FullStackProject.Web.Core        → JWT config, base controllers
FullStackProject.Web.Host        → Startup, Program.cs, appsettings.json
FullStackProject.Migrator        → Standalone DB migration runner
```

The backend uses **Castle Windsor** (not the default .NET DI container). ABP auto-registers classes implementing `ITransientDependency`, `ISingletonDependency`, or `IApplicationService`.

**RepoGuardian feature lives in:**
- `Core/Domains/RepoGuardian/` — entities + `RepoGuardianManager` domain service
- `Application/RepoGuardian/` — `RepoGuardianAppService`, `GithubService`, `RuleEngine`, DTOs

### Frontend Structure (`9.4.2/nextjs/src/`)

```
app/
  (auth)/          → Login/register pages (route group, no layout)
  api/             → Next.js API routes (proxy to ABP backend)
  dashboard/       → Main app pages after login
  layout.tsx       → Root layout (AntD providers)
  providers.tsx    → Client-side providers
lib/
  abp.ts           → ABP API helpers
  dal.ts           → Data access layer (server-side fetch wrappers)
  definitions.ts   → Shared TypeScript types
  session.ts       → JWE cookie session helpers
proxy.ts           → Axios-based API proxy config
```

Auth uses **JWE cookies** (via `jose`) — tokens are encrypted server-side, not stored in localStorage.

### Key Runtime Configuration

- Backend runs at `https://localhost:44311` (dev)
- Frontend runs at `http://localhost:3000` (dev)
- Database: PostgreSQL (`Host=localhost;Port=5432;Database=FullStackProjectDb`)
- JWT secret is in `appsettings.json` under `Authentication:JwtBearer:SecurityKey`
- GitHub API base URL: `appsettings.json` under `GitHub:ApiBaseUrl`
- Gemini API key: `appsettings.Development.json` under `Gemini:ApiKey` (gitignored); on Render set `Gemini__ApiKey` and `Gemini__Model` env vars

### Real-Time (SignalR)

ABP provides SignalR hub at `/signalr`. Not currently used by RepoGuardian features.
