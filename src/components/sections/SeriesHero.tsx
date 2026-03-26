import Image from 'next/image'
import type { Series } from '@/types/series'

interface SeriesHeroProps {
  series: Series
  artworkCount: number
}

export function SeriesHero({ series, artworkCount }: SeriesHeroProps) {
  return (
    <div className="relative aspect-[16/7] min-h-[320px] overflow-hidden bg-[var(--color-border)]">
      <Image
        src={series.coverImage.src}
        alt={series.coverImage.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
      />
      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto w-full max-w-7xl px-6 pb-12">
          <p className="mb-2 text-xs tracking-widest text-white/60 uppercase">
            Series · {series.year} · {artworkCount}{' '}
            {artworkCount === 1 ? 'work' : 'works'}
          </p>
          <h1 className="font-serif text-4xl text-white md:text-6xl">
            {series.title}
          </h1>
        </div>
      </div>
    </div>
  )
}
