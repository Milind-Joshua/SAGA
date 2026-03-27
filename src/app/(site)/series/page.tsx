import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/lib/sanity/client'
import { allSeriesQuery } from '@/lib/sanity/queries'
import { mapSeries } from '@/lib/sanity/mappers'
import type { SanitySeries } from '@/lib/sanity/types'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Series — Sangeeth',
  description:
    'Explore thematic series and collections of paintings by Sangeeth.',
  alternates: { canonical: '/series' },
  openGraph: {
    title: 'Series — Sangeeth',
    description:
      'Explore thematic series and collections of paintings by Sangeeth.',
    type: 'website',
  },
}

export default async function SeriesIndexPage() {
  const docs = await client.fetch<SanitySeries[]>(allSeriesQuery)
  const series = docs.map(mapSeries)

  return (
    <main id="main-content" className="mx-auto max-w-7xl px-6 py-16">
      <header className="mb-12">
        <h1 className="mb-3 font-serif text-4xl md:text-5xl">Series</h1>
        <p className="text-[var(--color-muted)]">
          Thematic collections and ongoing bodies of work
        </p>
      </header>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
        {series.map((s, i) => {
          const count = (docs[i] as SanitySeries).artworkCount ?? 0
          return (
            <Link
              key={s.slug}
              href={`/series/${s.slug}`}
              className="group block focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
              data-testid="series-card"
            >
              <div className="relative mb-4 aspect-[4/3] overflow-hidden bg-[var(--color-border)]">
                {s.coverImage && (
                  <Image
                    src={s.coverImage.thumbnailSrc}
                    alt={s.coverImage.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    placeholder={s.coverImage.blurDataURL ? 'blur' : 'empty'}
                    blurDataURL={s.coverImage.blurDataURL}
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
                  />
                )}
                <div className="absolute top-3 right-3 bg-black/50 px-2 py-1 text-xs text-white/80">
                  {count} {count === 1 ? 'work' : 'works'}
                </div>
              </div>
              <h2 className="mb-1 font-serif text-xl">{s.title}</h2>
              <p className="text-sm text-[var(--color-muted)]">{s.year}</p>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
