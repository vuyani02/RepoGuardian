import { test, expect } from '@playwright/test'

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard')
  })

  test('renders the page heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
  })

  test('renders the three stat cards', async ({ page }) => {
    await expect(page.getByText('Overall Compliance')).toBeVisible()
    await expect(page.getByText('Total Repositories')).toBeVisible()
    await expect(page.getByText('Total Scans')).toBeVisible()
  })

  test('renders the trend chart section', async ({ page }) => {
    await expect(page.getByText('Compliance Trend')).toBeVisible()
  })

  test('navbar links are visible', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Repositories' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Scans' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Rules' })).toBeVisible()
  })
})
