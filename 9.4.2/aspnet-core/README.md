# RepoGuardian — Backend

ASP.NET Boilerplate (ABP) v9.4 backend for RepoGuardian, built on ASP.NET Core 8 with PostgreSQL.

## Prerequisites

- .NET 8 SDK
- PostgreSQL 14+
- A Google AI Studio API key (Gemini) for AI-generated recommendations

## Setup

### 1. Create the database

Make sure PostgreSQL is running and create the database:

```sql
CREATE DATABASE "FullStackProjectDb";
```

Or let the migrator create it automatically (see step 3).

### 2. Configure secrets

Create `src/FullStackProject.Web.Host/appsettings.Development.json` (gitignored):

```json
{
  "ConnectionStrings": {
    "Default": "Host=localhost;Database=FullStackProjectDb;Username=postgres;Password=your-password"
  },
  "Gemini": {
    "ApiKey": "your-google-ai-studio-api-key"
  }
}
```

The `Gemini:Model` defaults to `gemini-2.5-flash` and can be overridden here if needed.

### 3. Apply database migrations

```bash
dotnet run --project src/FullStackProject.Migrator
```

Or use the EF Core CLI from the solution root:

```bash
dotnet ef database update --project src/FullStackProject.EntityFrameworkCore --startup-project src/FullStackProject.Web.Host
```

## Running

### Development

```bash
dotnet run --project src/FullStackProject.Web.Host
```

The API will start and print the URL to the terminal. Swagger UI is available at `/swagger`.

### Docker (full stack)

```bash
cd docker/ng
docker compose up --build
```

This starts PostgreSQL and the ABP host together. Set the Gemini API key via an environment variable:

```bash
Gemini__ApiKey=your-key docker compose up --build
```

## Tests

```bash
dotnet test
```

## Project structure

```
src/
  FullStackProject.Core                # Domain entities and domain services
  FullStackProject.Application         # Application services and DTOs
  FullStackProject.EntityFrameworkCore # EF Core DbContext, repositories, migrations
  FullStackProject.Web.Core            # JWT configuration, base controllers
  FullStackProject.Web.Host            # Startup, middleware pipeline, appsettings
  FullStackProject.Migrator            # Standalone migration runner
```

## Configuration reference

All settings live in `appsettings.json` and can be overridden in `appsettings.Development.json` or via environment variables (use `__` as separator, e.g. `Gemini__ApiKey`).

| Setting | Description |
|---------|-------------|
| `ConnectionStrings:Default` | PostgreSQL connection string |
| `App:ServerRootAddress` | URL the backend is reachable at (used for CORS and self-links) |
| `App:ClientRootAddress` | URL of the frontend (used for CORS) |
| `App:CorsOrigins` | Comma-separated list of allowed CORS origins |
| `Authentication:JwtBearer:SecurityKey` | JWT signing key |
| `GitHub:ApiBaseUrl` | GitHub REST API base URL |
| `Gemini:ApiKey` | Google AI Studio API key |
| `Gemini:Model` | Gemini model name (default: `gemini-2.5-flash`) |
