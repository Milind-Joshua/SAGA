'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

interface AboutPageContentProps {
  heroImageUrl: string | null
  portraitUrl: string | null
  studioImageUrl: string | null
}

export function AboutPageContent({
  heroImageUrl,
  portraitUrl,
  studioImageUrl,
}: AboutPageContentProps) {
  const reducedMotion = useReducedMotion()

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: reducedMotion ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: {
      duration: reducedMotion ? 0 : 0.6,
      delay: reducedMotion ? 0 : delay,
      ease: 'easeOut' as const,
    },
  })

  return (
    <>
      {/* Hero */}
      <section
        aria-labelledby="about-hero-title"
        className="relative flex h-[50vh] min-h-[400px] items-end overflow-hidden"
      >
        {heroImageUrl ? (
          <Image
            src={heroImageUrl}
            alt="Detail of a painting in progress on an easel in the studio"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950"
          />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
        />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-12 md:pb-16">
          <h1
            id="about-hero-title"
            className="font-serif text-5xl text-white md:text-7xl"
          >
            About
          </h1>
        </div>
      </section>

      {/* Bio */}
      <section
        aria-labelledby="bio-title"
        className="py-[var(--spacing-section)]"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 px-6 lg:grid-cols-2">
          <motion.div {...fadeUp()}>
            <h2 id="bio-title" className="mb-6 font-serif text-3xl md:text-4xl">
              Sangeeth
            </h2>
            <div className="space-y-4 leading-relaxed text-[var(--color-muted)]">
              <p>
                Sangeeth is a painter and draughtsperson working across oil,
                watercolour, and mixed media. Her practice centres on the quiet
                intensity of the observed world — coastal light, forest
                interiors, domestic still lives — rendered with a disciplined
                yet expressive hand.
              </p>
              <p>
                Trained at the National College of Art and Design, Dublin, and
                the Accademia di Belle Arti in Florence, she draws on a deep
                formal education while maintaining an instinctive, process-led
                approach in the studio. Each work begins with sustained looking
                — hours spent before the subject before a mark is made.
              </p>
              <p>
                Based between Dublin and the west coast of Ireland, she exhibits
                regularly in Ireland and across Europe. Her work is held in
                private collections in Ireland, the United Kingdom, France, and
                the United States.
              </p>
              <p>
                Commissions are accepted for portrait, landscape, and still
                life. Studio visits are welcome by appointment.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/gallery"
                className="inline-block border-b border-[var(--color-foreground)] pb-1 text-sm tracking-widest uppercase transition-colors duration-300 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                View Gallery
              </Link>
              <Link
                href="/contact"
                className="inline-block border-b border-[var(--color-foreground)] pb-1 text-sm tracking-widest uppercase transition-colors duration-300 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp(0.15)}
            className="relative aspect-[4/5] overflow-hidden bg-[var(--color-border)]"
          >
            {portraitUrl ? (
              <Image
                src={portraitUrl}
                alt="Sangeeth in her studio, standing before a large canvas"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-[var(--color-border)]" />
            )}
          </motion.div>
        </div>
      </section>

      {/* Education & Recognition */}
      <section
        aria-labelledby="recognition-title"
        className="border-t border-[var(--color-border)] bg-[var(--color-border)]/10 py-[var(--spacing-section)]"
      >
        <div className="mx-auto max-w-7xl px-6">
          <motion.h2
            {...fadeUp()}
            id="recognition-title"
            className="mb-12 font-serif text-3xl md:text-4xl"
          >
            Education &amp; Recognition
          </motion.h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <motion.div {...fadeUp(0.1)}>
              <h3 className="mb-6 text-xs tracking-widest text-[var(--color-muted)] uppercase">
                Education
              </h3>
              <ul className="space-y-4">
                {[
                  {
                    year: '2008–2012',
                    detail:
                      'BA Fine Art (Painting), National College of Art and Design, Dublin',
                  },
                  {
                    year: '2012–2013',
                    detail:
                      'Postgraduate Studies, Accademia di Belle Arti, Florence',
                  },
                  {
                    year: '2015',
                    detail: 'Residency, Cill Rialaig Project, County Kerry',
                  },
                ].map(({ year, detail }) => (
                  <li key={year} className="flex gap-6">
                    <span className="w-24 shrink-0 text-sm text-[var(--color-accent)]">
                      {year}
                    </span>
                    <span className="text-sm leading-relaxed text-[var(--color-muted)]">
                      {detail}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...fadeUp(0.2)}>
              <h3 className="mb-6 text-xs tracking-widest text-[var(--color-muted)] uppercase">
                Awards &amp; Recognition
              </h3>
              <ul className="space-y-4">
                {[
                  {
                    year: '2023',
                    detail: 'Shortlisted, RHA Annual Exhibition, Dublin',
                  },
                  {
                    year: '2021',
                    detail: 'Visual Arts Bursary, Arts Council of Ireland',
                  },
                  {
                    year: '2019',
                    detail: 'Selected, Wexford Arts Centre Open Submission',
                  },
                  {
                    year: '2016',
                    detail: 'Prize, West Cork Arts Centre Annual Exhibition',
                  },
                ].map(({ year, detail }) => (
                  <li key={year + detail} className="flex gap-6">
                    <span className="w-16 shrink-0 text-sm text-[var(--color-accent)]">
                      {year}
                    </span>
                    <span className="text-sm leading-relaxed text-[var(--color-muted)]">
                      {detail}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Atelier */}
      <section
        id="atelier"
        aria-labelledby="atelier-title"
        className="relative overflow-hidden"
      >
        <div className="relative aspect-[16/9] min-h-[420px]">
          {studioImageUrl ? (
            <Image
              src={studioImageUrl}
              alt="The SAGA atelier — a bright, north-facing studio with works in progress"
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
          ) : (
            <div className="absolute inset-0 bg-neutral-900" />
          )}
          <div aria-hidden="true" className="absolute inset-0 bg-black/55" />

          <div className="absolute inset-0 flex items-center justify-center px-6">
            <motion.div
              {...fadeUp()}
              className="w-full max-w-2xl text-center text-white"
            >
              <h2
                id="atelier-title"
                className="mb-4 font-serif text-3xl md:text-5xl"
              >
                The Atelier
              </h2>
              <p className="mb-8 leading-relaxed text-white/80">
                A working studio on the west coast of Ireland, open to
                collectors and patrons by appointment. See works in progress,
                discuss commissions, and experience painting in the space it was
                made.
              </p>
              <Link
                href="/contact"
                className="block w-full border border-white px-8 py-3 text-center text-sm tracking-widest uppercase transition-all duration-300 hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-white sm:inline-block sm:w-auto"
              >
                Arrange a Visit
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
