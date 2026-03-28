function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`Missing required environment variable: ${name}`)
  return value
}

export const config = {
  siteUrl: requireEnv('NEXT_PUBLIC_SITE_URL'),
} as const
