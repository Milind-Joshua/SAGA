import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact — Sangeeth',
  description:
    'Get in touch with Sangeeth regarding artworks, commissions, or studio visits.',
}

export default function ContactPage() {
  return (
    <main
      id="main-content"
      className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center"
    >
      <h1 className="mb-4 font-serif text-4xl">Contact</h1>
      <p className="mb-8 text-[var(--color-muted)]">Coming soon — Phase 3.</p>
      <Link
        href="/"
        className="text-sm underline underline-offset-2 transition-colors hover:text-[var(--color-accent)]"
      >
        ← Back to home
      </Link>
    </main>
  )
}
