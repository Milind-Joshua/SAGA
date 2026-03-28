import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Gallery page', () => {
  test('loads with status 200', async ({ page }) => {
    const response = await page.goto('/gallery')
    expect(response?.status()).toBe(200)
  })

  test('has a non-empty h1', async ({ page }) => {
    await page.goto('/gallery')
    const h1 = page.locator('h1').first()
    await expect(h1).toBeVisible()
    const text = await h1.textContent()
    expect(text?.trim().length).toBeGreaterThan(0)
  })

  test('renders at least 3 artwork cards', async ({ page }) => {
    await page.goto('/gallery')
    const cards = page.getByTestId('artwork-card')
    await expect(cards.first()).toBeVisible()
    expect(await cards.count()).toBeGreaterThanOrEqual(3)
  })

  test('filtering by series shows relevant cards', async ({ page }) => {
    await page.goto('/gallery')

    await page.selectOption('[aria-label="Filter by series"]', 'mountains')
    await page.waitForURL(/series=mountains/)

    const filteredCards = await page.getByTestId('artwork-card').count()
    expect(filteredCards).toBeGreaterThan(0)
  })

  test('filter state is reflected in URL', async ({ page }) => {
    await page.goto('/gallery')
    await page.selectOption('[aria-label="Filter by series"]', 'mountains')
    await page.waitForURL(/series=mountains/)
    expect(page.url()).toContain('series=mountains')
  })

  test('URL with filter param pre-applies filter on load', async ({ page }) => {
    await page.goto('/gallery?series=mountains')
    const select = page.getByLabel('Filter by series')
    await expect(select).toHaveValue('mountains')
  })

  test('clicking artwork card navigates to detail page', async ({ page }) => {
    await page.goto('/gallery')
    const firstCard = page.getByTestId('artwork-card').first()
    const link = firstCard.locator('a').first()
    const href = await link.getAttribute('href')
    await link.click()
    await page.waitForURL(href!)
    expect(page.url()).toContain('/gallery/')
  })

  test('all images have non-empty alt attributes', async ({ page }) => {
    await page.goto('/gallery')
    const images = page.locator('img')
    const count = await images.count()
    expect(count).toBeGreaterThan(0)
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt')
      expect(alt).not.toBeNull()
      expect(alt?.trim().length).toBeGreaterThan(0)
    }
  })

  test('has no accessibility violations', async ({ page }) => {
    await page.goto('/gallery')
    const results = await new AxeBuilder({ page })
      .disableRules(['color-contrast'])
      .analyze()
    expect(results.violations).toEqual([])
  })
})

test.describe('Artwork detail page', () => {
  test('loads with status 200', async ({ page }) => {
    const response = await page.goto('/gallery/mountain-2')
    expect(response?.status()).toBe(200)
  })

  test('has a non-empty h1', async ({ page }) => {
    await page.goto('/gallery/mountain-2')
    const h1 = page.locator('h1').first()
    await expect(h1).toBeVisible()
    const text = await h1.textContent()
    expect(text?.trim().length).toBeGreaterThan(0)
  })

  test('Inquire button is visible for an available artwork', async ({
    page,
  }) => {
    await page.goto('/gallery/mountain-2')
    await expect(page.getByRole('link', { name: /inquire/i })).toBeVisible()
  })

  test('Back to Gallery link navigates to /gallery', async ({ page }) => {
    await page.goto('/gallery/mountain-2')
    await page.getByRole('link', { name: /back to gallery/i }).click()
    await page.waitForURL('/gallery')
    expect(page.url()).toContain('/gallery')
  })

  test('unknown slug returns 404', async ({ page }) => {
    const response = await page.goto('/gallery/nonexistent-artwork-xyz')
    expect(response?.status()).toBe(404)
  })

  test('lightbox opens when artwork image is clicked', async ({ page }) => {
    await page.goto('/gallery/mountain-2')
    await page.getByRole('button', { name: /view.*in full screen/i }).click()
    await expect(page.getByTestId('lightbox')).toBeVisible()
  })

  test('lightbox closes on Escape key', async ({ page }) => {
    await page.goto('/gallery/mountain-2')
    await page.getByRole('button', { name: /view.*in full screen/i }).click()
    await expect(page.getByTestId('lightbox')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByTestId('lightbox')).not.toBeVisible()
  })

  test('has no accessibility violations', async ({ page }) => {
    await page.goto('/gallery/mountain-2')
    const results = await new AxeBuilder({ page })
      .disableRules(['color-contrast'])
      .analyze()
    expect(results.violations).toEqual([])
  })
})

test.describe('Series pages', () => {
  test('/series loads with status 200', async ({ page }) => {
    const response = await page.goto('/series')
    expect(response?.status()).toBe(200)
  })

  test('/series has a non-empty h1', async ({ page }) => {
    await page.goto('/series')
    const h1 = page.locator('h1').first()
    await expect(h1).toBeVisible()
  })

  test('/series renders series cards', async ({ page }) => {
    await page.goto('/series')
    const cards = page.getByTestId('series-card')
    expect(await cards.count()).toBeGreaterThanOrEqual(1)
  })

  test('clicking a series card navigates to /series/[slug]', async ({
    page,
  }) => {
    await page.goto('/series')
    const firstCard = page.getByTestId('series-card').first()
    const href = await firstCard.getAttribute('href')
    await firstCard.click()
    await page.waitForURL(href!)
    expect(page.url()).toContain('/series/')
  })

  test('/series/mountains loads with status 200', async ({ page }) => {
    const response = await page.goto('/series/mountains')
    expect(response?.status()).toBe(200)
  })

  test('/series/mountains has h1 with series title', async ({ page }) => {
    await page.goto('/series/mountains')
    await expect(page.locator('h1')).toContainText('Mountains')
  })

  test('/series/mountains shows artwork cards', async ({ page }) => {
    await page.goto('/series/mountains')
    const cards = page.getByTestId('artwork-card')
    expect(await cards.count()).toBeGreaterThanOrEqual(1)
  })

  test('unknown series slug returns 404', async ({ page }) => {
    const response = await page.goto('/series/nonexistent-series-xyz')
    expect(response?.status()).toBe(404)
  })

  test('/series has no accessibility violations', async ({ page }) => {
    await page.goto('/series')
    const results = await new AxeBuilder({ page })
      .disableRules(['color-contrast'])
      .analyze()
    expect(results.violations).toEqual([])
  })

  test('/series/mountains has no accessibility violations', async ({
    page,
  }) => {
    await page.goto('/series/mountains')
    const results = await new AxeBuilder({ page })
      .disableRules(['color-contrast'])
      .analyze()
    expect(results.violations).toEqual([])
  })
})
