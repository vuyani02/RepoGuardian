# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**RepoGuardian** — a SaaS tool that scans public GitHub repositories for best-practice compliance and generates an AI-powered report with scores, rule results, and fix recommendations.

Stack:
- **Backend**: ASP.NET Boilerplate (ABP) v9.4.1 on ASP.NET Core 8 (`9.4.2/aspnet-core/`)
- **Frontend**: Next.js 16 App Router with React 19, Ant Design (`9.4.2/nextjs/`)
- **Database**: PostgreSQL
- **AI**: Grok API (xAI) — not Claude/OpenAI, user does not have budget for those

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

### Phase 2 — AI Recommendations (Grok)

- `AiExplanationService` — calls Grok API for each failed rule
- Returns: issue description, explanation, suggested fix
- Saves `Recommendation` entities linked to `RuleResult`

### Phase 3 — Frontend Dashboard

- Login page → Dashboard page (Next.js App Router)
- Add repository form → trigger scan → display results
- Compliance score gauges per category + rule result list
- Recommendations panel for failed rules

### Phase 4 — Polish & Deploy

- Render.com deployment (backend + frontend)
- Scan history per user
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
- Grok API key: to be added to `appsettings.json` under `Grok:ApiKey` (Phase 2)

### Real-Time (SignalR)

ABP provides SignalR hub at `/signalr`. Not currently used by RepoGuardian features.
