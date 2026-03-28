import type { Metadata } from 'next'
import Link from 'next/link'
import { ContactForm } from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact — Sangeeth',
  description:
    'Get in touch with Sangeeth regarding artworks, commissions, or studio visits.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact — Sangeeth',
    description:
      'Get in touch with Sangeeth regarding artworks, commissions, or studio visits.',
    type: 'website',
  },
}

export default function ContactPage() {
  return (
    <div className="py-[var(--spacing-section)]">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <header className="mb-16 border-b border-[var(--color-border)] pb-10">
          <h1 className="font-serif text-4xl md:text-5xl">Contact</h1>
          <p className="mt-4 max-w-lg text-[var(--color-muted)]">
            For purchase enquiries, commissions, press, or to arrange a studio
            visit — get in touch below.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_320px]">
          {/* Form */}
          <section aria-labelledby="form-title">
            <h2 id="form-title" className="sr-only">
              Enquiry form
            </h2>
            <ContactForm />
          </section>

          {/* Contact info */}
          <aside aria-label="Contact information">
            <div className="space-y-10 text-sm">
              <div>
                <h2 className="mb-3 text-xs tracking-widest text-[var(--color-muted)] uppercase">
                  Studio
                </h2>
                <p className="leading-relaxed text-[var(--color-muted)]">
                  The Atelier
                  <br />
                  Connemara, County Galway
                  <br />
                  Ireland
                </p>
                <p className="mt-2 text-[var(--color-muted)]">
                  Open by appointment only.
                </p>
              </div>

              <div>
                <h2 className="mb-3 text-xs tracking-widest text-[var(--color-muted)] uppercase">
                  Email
                </h2>
                <a
                  href="mailto:studio@sangeeth.art"
                  className="transition-colors duration-300 hover:text-[var(--color-accent)]"
                >
                  studio@sangeeth.art
                </a>
              </div>

              <div>
                <h2 className="mb-3 text-xs tracking-widest text-[var(--color-muted)] uppercase">
                  Follow
                </h2>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors duration-300 hover:text-[var(--color-accent)]"
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors duration-300 hover:text-[var(--color-accent)]"
                    >
                      Facebook
                    </a>
                  </li>
                </ul>
              </div>

              <div className="border-t border-[var(--color-border)] pt-8">
                <p className="leading-relaxed text-[var(--color-muted)]">
                  Interested in original works?{' '}
                  <Link
                    href="/gallery"
                    className="underline underline-offset-2 transition-colors hover:text-[var(--color-accent)]"
                  >
                    Browse the gallery
                  </Link>{' '}
                  or{' '}
                  <Link
                    href="/about"
                    className="underline underline-offset-2 transition-colors hover:text-[var(--color-accent)]"
                  >
                    read about the artist
                  </Link>
                  .
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
