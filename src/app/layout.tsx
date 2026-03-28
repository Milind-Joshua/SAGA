import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

// Cormorant loaded as variable font via @fontsource-variable
// We declare it as a CSS variable in globals.css
const cormorant = localFont({
  src: '../../node_modules/@fontsource-variable/cormorant/files/cormorant-latin-wght-normal.woff2',
  variable: '--font-cormorant',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafaf8' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0f0d' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  ),
  title: {
    template: '%s | SAGA — Sangeeth Art Gallery & Atelier',
    default: 'SAGA — Sangeeth Art Gallery & Atelier',
  },
  description:
    'Original artworks by Sangeeth — paintings, drawings, and mixed media across multiple series.',
  openGraph: {
    siteName: 'SAGA — Sangeeth Art Gallery & Atelier',
    type: 'website',
    locale: 'en_IE',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
