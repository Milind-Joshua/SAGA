import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { GalleryGrid } from '../GalleryGrid'
import type { Artwork } from '@/types/artwork'

vi.mock('next/navigation', () => ({
  usePathname: () => '/gallery',
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
  useReducedMotion: () => false,
}))

const makeArtwork = (id: string): Artwork => ({
  id,
  slug: `artwork-${id}`,
  title: `Artwork ${id}`,
  year: 2024,
  medium: 'Oil on canvas',
  dimensions: '80 × 100 cm',
  image: {
    src: `https://picsum.photos/seed/artwork-${id}/800/1000`,
    thumbnailSrc: `https://picsum.photos/seed/artwork-${id}/800/1000`,
    lightboxSrc: `https://picsum.photos/seed/artwork-${id}/800/1000`,
    alt: `Artwork ${id} image`,
    width: 800,
    height: 1000,
  },
  available: true,
})

describe('GalleryGrid', () => {
  it('renders the correct number of artwork cards', () => {
    const artworks = [makeArtwork('1'), makeArtwork('2'), makeArtwork('3')]
    render(<GalleryGrid artworks={artworks} />)
    expect(screen.getAllByTestId('artwork-card')).toHaveLength(3)
  })

  it('renders empty state when given an empty array', () => {
    render(<GalleryGrid artworks={[]} />)
    expect(screen.getByTestId('gallery-empty-state')).toBeInTheDocument()
    expect(
      screen.getByText(/no works match these filters/i)
    ).toBeInTheDocument()
  })

  it('renders "Clear filters" button in empty state when onClearFilters is provided', () => {
    const onClearFilters = vi.fn()
    render(<GalleryGrid artworks={[]} onClearFilters={onClearFilters} />)
    expect(
      screen.getByRole('button', { name: /clear filters/i })
    ).toBeInTheDocument()
  })
})
