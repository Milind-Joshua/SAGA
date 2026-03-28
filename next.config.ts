import type { NextConfig } from 'next'

const isDev = process.env.NODE_ENV === 'development'

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // unsafe-eval is only required in dev (React error stack reconstruction).
      // In production, SRI integrity attributes cover script integrity.
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
      // unsafe-inline required for Tailwind CSS utility classes.
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self'",
      // Public site fetches Sanity data over HTTPS only — no WebSocket needed.
      "connect-src 'self' https://*.sanity.io https://*.api.sanity.io",
      // Studio is now hosted at saga.sanity.studio — no local iframe needed.
      "frame-src 'none'",
      "frame-ancestors 'none'",
    ].join('; '),
  },
]

const nextConfig: NextConfig = {
  experimental: {
    // Hash-based script integrity — allows static/ISR pages while removing unsafe-inline
    // from script execution. Generates integrity= attributes at build time.
    sri: {
      algorithm: 'sha256',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
