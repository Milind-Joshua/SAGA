import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GalleryFilters } from '../GalleryFilters'

const mockPush = vi.fn()
const mockPathname = '/gallery'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => mockPathname,
  useSearchParams: () => new URLSearchParams(),
}))

const seriesOptions = [
  { slug: 'coastal', title: 'Coastal Light' },
  { slug: 'forest', title: 'Forest Interiors' },
]

const emptyFilters = { medium: '', series: '', availability: '' }

describe('GalleryFilters', () => {
  beforeEach(() => {
    mockPush.mockClear()
  })

  it('renders all three filter selects', () => {
    render(
      <GalleryFilters
        seriesOptions={seriesOptions}
        activeFilters={emptyFilters}
      />
    )
    expect(screen.getByLabelText(/filter by medium/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/filter by series/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/filter by availability/i)).toBeInTheDocument()
  })

  it('renders series options from props', () => {
    render(
      <GalleryFilters
        seriesOptions={seriesOptions}
        activeFilters={emptyFilters}
      />
    )
    expect(
      screen.getByRole('option', { name: 'Coastal Light' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('option', { name: 'Forest Interiors' })
    ).toBeInTheDocument()
  })

  it('calls router.push with series param when series filter changes', () => {
    render(
      <GalleryFilters
        seriesOptions={seriesOptions}
        activeFilters={emptyFilters}
      />
    )
    fireEvent.change(screen.getByLabelText(/filter by series/i), {
      target: { value: 'coastal' },
    })
    expect(mockPush).toHaveBeenCalledWith(
      expect.stringContaining('series=coastal'),
      expect.anything()
    )
  })

  it('does not show "Clear filters" when no filters are active', () => {
    render(
      <GalleryFilters
        seriesOptions={seriesOptions}
        activeFilters={emptyFilters}
      />
    )
    expect(screen.queryByTestId('clear-filters')).not.toBeInTheDocument()
  })

  it('shows "Clear filters" button when a filter is active', () => {
    render(
      <GalleryFilters
        seriesOptions={seriesOptions}
        activeFilters={{ medium: 'oil', series: '', availability: '' }}
      />
    )
    expect(screen.getByTestId('clear-filters')).toBeInTheDocument()
  })

  it('"Clear filters" button navigates to pathname without params', () => {
    render(
      <GalleryFilters
        seriesOptions={seriesOptions}
        activeFilters={{ medium: 'oil', series: '', availability: '' }}
      />
    )
    fireEvent.click(screen.getByTestId('clear-filters'))
    expect(mockPush).toHaveBeenCalledWith(mockPathname, expect.anything())
  })
})
