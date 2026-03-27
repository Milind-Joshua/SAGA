import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Hero } from '../Hero'

describe('Hero', () => {
  it('renders the hero title', () => {
    render(<Hero title="Test Artist" tagline="Test tagline" />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Test Artist'
    )
  })

  it('renders the tagline', () => {
    render(<Hero tagline="Original works in oil" />)
    expect(screen.getByText('Original works in oil')).toBeInTheDocument()
  })

  it('renders a CTA link to /gallery', () => {
    render(<Hero />)
    const cta = screen.getByRole('link', { name: /view gallery/i })
    expect(cta).toHaveAttribute('href', '/gallery')
  })

  it('hero image has non-empty alt text when image is provided', () => {
    render(
      <Hero
        image={{
          src: 'https://cdn.sanity.io/images/test/production/test.webp',
          alt: 'A coastal painting at dusk',
        }}
      />
    )
    const img = screen.getByRole('img')
    expect(img.getAttribute('alt')?.trim().length).toBeGreaterThan(0)
  })

  it('renders a gradient background when no image is provided', () => {
    const { container } = render(<Hero />)
    const gradient = container.querySelector('.bg-gradient-to-br')
    expect(gradient).toBeInTheDocument()
  })
})
