import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — Sangeeth',
  description:
    'Sangeeth is a painter working in oil, watercolour, and mixed media. Based between Dublin and the west coast of Ireland.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About — Sangeeth',
    description:
      'Sangeeth is a painter working in oil, watercolour, and mixed media. Based between Dublin and the west coast of Ireland.',
    type: 'website',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
