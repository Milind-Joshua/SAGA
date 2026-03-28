import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MobileMenu } from '../MobileMenu'

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('MobileMenu', () => {
  it('renders nothing when closed', () => {
    const { container } = render(
      <MobileMenu isOpen={false} onClose={vi.fn()} />
    )
    expect(container.firstChild).toBeNull()
  })

  it('renders nav links when open', () => {
    render(<MobileMenu isOpen={true} onClose={vi.fn()} />)
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /gallery/i })).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn()
    render(<MobileMenu isOpen={true} onClose={onClose} />)
    fireEvent.click(screen.getByRole('button', { name: /close navigation/i }))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('calls onClose when Escape key is pressed', () => {
    const onClose = vi.fn()
    render(<MobileMenu isOpen={true} onClose={onClose} />)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledOnce()
  })
})
