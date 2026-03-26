import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Header } from '../Header'

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('Header', () => {
  it('renders all nav links', () => {
    render(<Header />)
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /gallery/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /exhibitions/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument()
  })

  it('renders the site logo link', () => {
    render(<Header />)
    const logo = screen.getByRole('link', { name: 'SAGA' })
    expect(logo).toHaveAttribute('href', '/')
  })

  it('renders the hamburger button for mobile', () => {
    render(<Header />)
    expect(
      screen.getByRole('button', { name: /open navigation menu/i })
    ).toBeInTheDocument()
  })
})
