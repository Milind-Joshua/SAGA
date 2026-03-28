import { describe, it, expect, afterEach } from 'vitest'

describe('config', () => {
  afterEach(() => {
    vi.resetModules()
  })

  it('throws when NEXT_PUBLIC_SITE_URL is missing', async () => {
    const originalEnv = process.env.NEXT_PUBLIC_SITE_URL
    delete process.env.NEXT_PUBLIC_SITE_URL

    await expect(import('@/lib/config')).rejects.toThrow(
      'Missing required environment variable: NEXT_PUBLIC_SITE_URL'
    )

    process.env.NEXT_PUBLIC_SITE_URL = originalEnv
  })
})
