import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ArtworkDetail } from '../ArtworkDetail'
import type { Artwork } from '@/types/artwork'

vi.mock('next/navigation', () => ({
  usePathname: () => '/gallery/coastal-light-i',
  useRouter: () => ({ push: vi.fn() }),
}))

vi.mock('framer-motion', () => ({
  motion: {
    article: ({ children, ...props }: React.ComponentProps<'article'>) => (
      <article {...props}>{children}</article>
    ),
    div: ({ children, ...props }: React.ComponentProps<'div'>) => (
      <div {...props}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  useReducedMotion: () => false,
}))

const artwork: Artwork = {
  id: '1',
  slug: 'coastal-light-i',
  title: 'Coastal Light I',
  year: 2024,
  medium: 'Oil on canvas',
  dimensions: '80 × 100 cm',
  description: 'A beautiful coastal painting.',
  image: {
    src: 'https://picsum.photos/seed/test/800/1000',
    thumbnailSrc: 'https://picsum.photos/seed/test/800/1000',
    lightboxSrc: 'https://picsum.photos/seed/test/800/1000',
    alt: 'Coastal landscape',
    width: 800,
    height: 1000,
  },
  series: 'coastal',
  seriesTitle: 'Coastal Light',
  available: true,
}

describe('ArtworkDetail', () => {
  it('renders the artwork title in h1', () => {
    render(
      <ArtworkDetail
        artwork={artwork}
        relatedArtworks={[]}
        seriesArtworks={[artwork]}
      />
    )
    expect(
      screen.getByRole('heading', { level: 1, name: 'Coastal Light I' })
    ).toBeInTheDocument()
  })

  it('renders medium and dimensions', () => {
    render(
      <ArtworkDetail
        artwork={artwork}
        relatedArtworks={[]}
        seriesArtworks={[artwork]}
      />
    )
    expect(screen.getByText('Oil on canvas')).toBeInTheDocument()
    expect(screen.getByText('80 × 100 cm')).toBeInTheDocument()
  })

  it('renders the description', () => {
    render(
      <ArtworkDetail
        artwork={artwork}
        relatedArtworks={[]}
        seriesArtworks={[artwork]}
      />
    )
    expect(
      screen.getByText('A beautiful coastal painting.')
    ).toBeInTheDocument()
  })

  it('renders the Inquire button linking to contact with artwork param', () => {
    render(
      <ArtworkDetail
        artwork={artwork}
        relatedArtworks={[]}
        seriesArtworks={[artwork]}
      />
    )
    const inquireLink = screen.getByRole('link', { name: /inquire/i })
    expect(inquireLink).toHaveAttribute(
      'href',
      '/contact?artwork=coastal-light-i'
    )
  })

  it('does not render Inquire button when artwork is not available', () => {
    render(
      <ArtworkDetail
        artwork={{ ...artwork, available: false }}
        relatedArtworks={[]}
        seriesArtworks={[artwork]}
      />
    )
    expect(
      screen.queryByRole('link', { name: /inquire/i })
    ).not.toBeInTheDocument()
  })

  it('renders Back to Gallery link', () => {
    render(
      <ArtworkDetail
        artwork={artwork}
        relatedArtworks={[]}
        seriesArtworks={[artwork]}
      />
    )
    expect(
      screen.getByRole('link', { name: /back to gallery/i })
    ).toHaveAttribute('href', '/gallery')
  })

  it('renders related works section when relatedArtworks is non-empty', () => {
    const related: Artwork[] = [
      {
        ...artwork,
        id: '2',
        slug: 'coastal-light-ii',
        title: 'Coastal Light II',
      },
    ]
    render(
      <ArtworkDetail
        artwork={artwork}
        relatedArtworks={related}
        seriesArtworks={[artwork]}
      />
    )
    expect(
      screen.getByRole('heading', { name: /related works/i })
    ).toBeInTheDocument()
  })
})
