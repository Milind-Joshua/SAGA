import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Home page', () => {
  test('loads with status 200', async ({ page }) => {
    const response = await page.goto('/')
    expect(response?.status()).toBe(200)
  })

  test('has a non-empty h1', async ({ page }) => {
    await page.goto('/')
    const h1 = page.locator('h1').first()
    await expect(h1).toBeVisible()
    const text = await h1.textContent()
    expect(text?.trim().length).toBeGreaterThan(0)
  })

  test('nav links are visible and have valid hrefs', async ({ page }) => {
    await page.goto('/')
    const navLinks = page.locator('header nav a')
    const count = await navLinks.count()
    expect(count).toBeGreaterThan(0)

    for (let i = 0; i < count; i++) {
      const href = await navLinks.nth(i).getAttribute('href')
      expect(href).toBeTruthy()
      expect(href?.startsWith('/')).toBe(true)
    }
  })

  test('mobile menu opens and closes at 375px viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')

    const hamburger = page.getByRole('button', {
      name: /open navigation menu/i,
    })
    await expect(hamburger).toBeVisible()

    await hamburger.click()
    const dialog = page.getByRole('dialog', { name: /navigation menu/i })
    await expect(dialog).toBeVisible()

    await page.getByRole('button', { name: /close navigation/i }).click()
    await expect(dialog).not.toBeVisible()
  })

  test('no unhandled console errors on load', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (err) => errors.push(err.message))
    await page.goto('/')
    expect(errors).toEqual([])
  })

  test('all images have non-empty alt attributes', async ({ page }) => {
    await page.goto('/')
    const images = page.locator('img')
    const count = await images.count()

    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt')
      expect(alt).not.toBeNull()
      expect(alt?.trim().length).toBeGreaterThan(0)
    }
  })

  test('has no accessibility violations', async ({ page }) => {
    await page.goto('/')
    const results = await new AxeBuilder({ page }).analyze()
    expect(results.violations).toEqual([])
  })
})
