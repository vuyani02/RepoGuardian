import { defineConfig, devices } from '@playwright/test'

/**
 * Test credentials — override via environment variables or create a
 * `.env.test.local` file (gitignored). The account must already exist
 * in the database before running the suite.
 *
 * Example .env.test.local:
 *   TEST_TEAM_NAME=mytestteam
 *   TEST_USERNAME=testuser
 *   TEST_PASSWORD=Test1234!
 */
export const TEST_CREDS = {
  teamName: process.env.TEST_TEAM_NAME ?? 'testteam',
  username: process.env.TEST_USERNAME ?? 'testuser',
  password: process.env.TEST_PASSWORD ?? 'Test1234!',
}

export const STORAGE_STATE = 'tests/.auth/session.json'

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },

  projects: [
    // Runs first — logs in and saves the session cookie to disk.
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
    },

    // All other tests reuse the saved session.
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: STORAGE_STATE,
      },
      dependencies: ['setup'],
      testIgnore: /auth\.setup\.ts/,
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        storageState: STORAGE_STATE,
      },
      dependencies: ['setup'],
      testIgnore: /auth\.setup\.ts/,
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        storageState: STORAGE_STATE,
      },
      dependencies: ['setup'],
      testIgnore: /auth\.setup\.ts/,
    },
  ],

  // Start Next.js dev server automatically if it isn't already running.
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 120_000,
  },
})
