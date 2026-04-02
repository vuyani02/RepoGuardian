import { test as setup } from '@playwright/test'
import { TEST_CREDS, STORAGE_STATE } from '../playwright.config'

/**
 * Runs once before the test suite.
 *
 * In CI the database starts empty, so we register the test user first.
 * If the user already exists (local re-run) the registration returns an error
 * and we catch it — then proceed straight to login either way.
 */
setup('authenticate', async ({ page }) => {
  // ── Step 1: register (idempotent — safe to run against an existing account) ──
  await page.goto('/register')

  await page.getByLabel('First Name').fill('Test')
  await page.getByLabel('Last Name').fill('User')
  await page.getByLabel('Username').fill(TEST_CREDS.username)
  await page.getByLabel('Email').fill(`${TEST_CREDS.username.toLowerCase()}@example.com`)
  await page.getByLabel('Password').fill(TEST_CREDS.password)
  // "Create a team" is the default radio — just fill the team name
  await page.getByLabel('Team name').fill(TEST_CREDS.teamName)
  await page.getByRole('button', { name: 'Create Account' }).click()

  // Wait for redirect on success; if user/team already exists an error alert
  // stays on the page — catch the timeout and continue to login.
  try {
    await page.waitForURL('/login**', { timeout: 10000 })
  } catch {
    // Already registered — proceed to login
  }

  // ── Step 2: log in and save session ──────────────────────────────────────────
  await page.goto('/login')

  await page.getByLabel('Team name').fill(TEST_CREDS.teamName)
  await page.getByLabel('Username').fill(TEST_CREDS.username)
  await page.getByLabel('Password').fill(TEST_CREDS.password)
  await page.getByRole('button', { name: 'Sign In' }).click()

  await page.waitForURL('/dashboard')

  await page.context().storageState({ path: STORAGE_STATE })
})
