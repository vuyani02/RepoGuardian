import { test, expect } from '@playwright/test'

test.describe('Repositories', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/repositories')
  })

  test('renders the page heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Repositories' })).toBeVisible()
  })

  test('renders the repository table', async ({ page }) => {
    await expect(page.getByRole('table')).toBeVisible()
  })

  test('Add Repository button opens the modal', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Repository' }).click()
    await expect(page.getByRole('dialog')).toBeVisible()
    await expect(page.getByPlaceholder(/github\.com/i)).toBeVisible()
  })

  test('closing the modal hides it', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Repository' }).click()
    await expect(page.getByRole('dialog')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog')).not.toBeVisible()
  })
})
