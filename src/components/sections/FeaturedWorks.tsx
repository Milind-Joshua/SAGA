import type { Artwork } from '@/types/artwork'
import { FeaturedWorkCard } from './FeaturedWorkCard'

interface FeaturedWorksProps {
  artworks: Artwork[]
}

export function FeaturedWorks({ artworks }: FeaturedWorksProps) {
  return (
    <section
      aria-labelledby="featured-works-title"
      className="mx-auto max-w-7xl px-6 py-[var(--spacing-section)]"
    >
      <div className="mb-12">
        <h2
          id="featured-works-title"
          className="mb-3 font-serif text-3xl md:text-4xl"
        >
          Featured Works
        </h2>
        <p className="text-[var(--color-muted)]">
          A selection of recent paintings and drawings
        </p>
      </div>

      <div
        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        data-testid="featured-works-grid"
      >
        {artworks.map((artwork, index) => (
          <FeaturedWorkCard key={artwork.id} artwork={artwork} index={index} />
        ))}
      </div>
    </section>
  )
}
