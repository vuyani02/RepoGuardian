# RepoGuardian — Frontend

Next.js 16 frontend for RepoGuardian, a SaaS tool that scans public GitHub repositories for best-practice compliance and generates AI-powered reports with scores, rule results, and fix recommendations.

## Prerequisites

- Node.js 20+
- npm 10+
- The backend API must be running (see `../aspnet-core/README.md`)

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy the example env file and fill in the values:

```bash
cp .env.example .env.local
```

Open `.env.local` and set:

```env
# URL of the running ASP.NET Core backend
API_URL=http://localhost:<backend-port>

# Random secret used to sign session cookies — must be at least 32 characters
SESSION_SECRET=replace-with-a-random-32-char-secret
```

## Running

### Development

```bash
npm run dev
```

Open the URL shown in the terminal.

### Production build

```bash
npm run build
npm start
```

## Linting

```bash
npm run lint
```

## Tests

Playwright end-to-end tests require both the backend and the frontend dev server to be running.

### 1. Create a test credentials file

```bash
cp .env.test.local.example .env.test.local  # if an example exists, otherwise create it
```

Or create `.env.test.local` manually:

```env
TEST_TEAM_NAME=your-test-team
TEST_USERNAME=your-test-user
TEST_PASSWORD=YourPassword123!
```

These credentials are created automatically on the first test run if they do not exist in the database.

### 2. Install Playwright browsers

```bash
npx playwright install --with-deps chromium
```

### 3. Run the suite

```bash
npm test
```

Reports are saved to `playwright-report/`.

## Project structure

```
src/
  app/
    (auth)/          # Login and register pages
    (main)/          # Authenticated pages (dashboard, repositories, scans)
    api/             # Next.js API routes — proxy to ASP.NET Core backend
  components/        # UI components grouped by feature
  providers/         # React context providers for data fetching
  Types/             # TypeScript interfaces and types
  lib/               # Server-side helpers (session, ABP API client, DAL)
```

## Environment variables reference

| Variable | Required | Description |
|----------|----------|-------------|
| `API_URL` | Yes | Base URL of the ASP.NET Core backend |
| `SESSION_SECRET` | Yes | Secret for signing JWE session cookies (min 32 chars) |
