import { test, expect } from '@playwright/test'
import { TEST_CREDS } from '../playwright.config'

// These tests run without the saved session so they can test the login page itself.
test.use({ storageState: { cookies: [], origins: [] } })

test.describe('Auth', () => {
  test('login page renders all fields', async ({ page }) => {
    await page.goto('/login')

    await expect(page.getByLabel('Team name')).toBeVisible()
    await expect(page.getByLabel('Username')).toBeVisible()
    await expect(page.getByLabel('Password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible()
  })

  test('shows error on invalid credentials', async ({ page }) => {
    await page.goto('/login')

    await page.getByLabel('Team name').fill('wrongteam')
    await page.getByLabel('Username').fill('wronguser')
    await page.getByLabel('Password').fill('wrongpassword')
    await page.getByRole('button', { name: 'Sign In' }).click()

    await expect(page.getByRole('alert')).toBeVisible()
  })

  test('redirects to dashboard after successful login', async ({ page }) => {
    await page.goto('/login')

    await page.getByLabel('Team name').fill(TEST_CREDS.teamName)
    await page.getByLabel('Username').fill(TEST_CREDS.username)
    await page.getByLabel('Password').fill(TEST_CREDS.password)
    await page.getByRole('button', { name: 'Sign In' }).click()

    await page.waitForURL('/dashboard', { timeout: 30000 })
    await expect(page).toHaveURL('/dashboard')
  })

  test('register page renders team action and all fields', async ({ page }) => {
    await page.goto('/register')

    await expect(page.getByText('Create a team')).toBeVisible()
    await expect(page.getByText('Join a team')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Create Account' })).toBeVisible()
  })

  test('unauthenticated user is redirected to login from protected route', async ({ page }) => {
    await page.goto('/dashboard')
    await page.waitForURL('/login')
    await expect(page).toHaveURL('/login')
  })
})
