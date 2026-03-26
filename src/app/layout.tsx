import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

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

export const metadata: Metadata = {
  title: {
    template: '%s | SAGA — Sangeeth Art Gallery & Atelier',
    default: 'SAGA — Sangeeth Art Gallery & Atelier',
  },
  description:
    'Original artworks by Sangeeth — paintings, drawings, and mixed media across multiple series.',
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
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  )
}
