import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { FeaturedWorks } from '../FeaturedWorks'
import { featuredArtworks } from '@/data/artworks'

describe('FeaturedWorks', () => {
  it('renders the correct number of artwork cards', () => {
    render(<FeaturedWorks artworks={featuredArtworks} />)
    const grid = screen.getByTestId('featured-works-grid')
    expect(grid.querySelectorAll('article').length).toBe(
      featuredArtworks.length
    )
  })

  it('renders artwork titles', () => {
    render(<FeaturedWorks artworks={featuredArtworks} />)
    featuredArtworks.forEach((artwork) => {
      expect(screen.getByText(artwork.title)).toBeInTheDocument()
    })
  })

  it('links to /gallery/[slug] for each card', () => {
    const { container } = render(<FeaturedWorks artworks={featuredArtworks} />)
    featuredArtworks.forEach((artwork) => {
      const link = container.querySelector(`a[href="/gallery/${artwork.slug}"]`)
      expect(link).not.toBeNull()
    })
  })
})
