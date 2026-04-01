import { test, expect } from '@playwright/test'

test.describe('Scans', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/scans')
  })

  test('renders the page heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Scans' })).toBeVisible()
  })

  test('renders the scans table', async ({ page }) => {
    await expect(page.getByRole('table')).toBeVisible()
  })

  test('renders the Scan button', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Scan' })).toBeVisible()
  })
})
