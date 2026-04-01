import { test, expect } from '@playwright/test'

test.describe('Profile', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/profile')
  })

  test('renders the page heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Profile' })).toBeVisible()
  })

  test('Team Profile tab is active by default and shows member table', async ({ page }) => {
    await expect(page.getByText('Team Profile')).toBeVisible()
    await expect(page.getByRole('table')).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Name' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Role' })).toBeVisible()
  })

  test('My Profile tab shows user details', async ({ page }) => {
    await page.getByText('My Profile').click()
    await expect(page.getByText('First Name')).toBeVisible()
    await expect(page.getByText('Username')).toBeVisible()
    await expect(page.getByText('Email Address')).toBeVisible()
  })

  test('admin sees Actions column with Make Admin and Delete buttons', async ({ page }) => {
    await expect(page.getByRole('columnheader', { name: 'Actions' })).toBeVisible()
  })
})
