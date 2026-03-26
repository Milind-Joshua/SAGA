import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ArtworkCard } from '../ArtworkCard'
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
  },
  useReducedMotion: () => false,
}))

const artwork: Artwork = {
  id: '1',
  slug: 'coastal-light-i',
  title: 'Coastal Light I',
  year: 2024,
  medium: 'Oil on canvas',
  dimensions: '80 × 100 cm',
  description: 'A test description.',
  image: {
    src: 'https://picsum.photos/seed/test/800/1000',
    alt: 'Test artwork image',
    width: 800,
    height: 1000,
  },
  available: true,
}

describe('ArtworkCard', () => {
  it('renders the artwork title', () => {
    render(<ArtworkCard artwork={artwork} />)
    expect(screen.getByText('Coastal Light I')).toBeInTheDocument()
  })

  it('renders the year and dimensions', () => {
    render(<ArtworkCard artwork={artwork} />)
    expect(screen.getByText(/2024/)).toBeInTheDocument()
    expect(screen.getByText(/80 × 100 cm/)).toBeInTheDocument()
  })

  it('image has non-empty alt text', () => {
    render(<ArtworkCard artwork={artwork} />)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('alt', 'Test artwork image')
  })

  it('renders "Available" badge when available', () => {
    render(<ArtworkCard artwork={artwork} />)
    expect(screen.getByText('Available')).toBeInTheDocument()
  })

  it('renders "Sold" badge when not available', () => {
    render(<ArtworkCard artwork={{ ...artwork, available: false }} />)
    expect(screen.getByText('Sold')).toBeInTheDocument()
  })

  it('links to the correct gallery slug', () => {
    render(<ArtworkCard artwork={artwork} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/gallery/coastal-light-i')
  })
})
