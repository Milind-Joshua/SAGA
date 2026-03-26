'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback } from 'react'

export interface FilterState {
  medium: string
  series: string
  availability: string
}

const MEDIUMS = ['Oil', 'Watercolour', 'Mixed Media']
const AVAILABILITIES = ['Available', 'Sold']

interface SeriesOption {
  slug: string
  title: string
}

interface GalleryFiltersProps {
  seriesOptions: SeriesOption[]
  activeFilters: FilterState
}

export function GalleryFilters({
  seriesOptions,
  activeFilters,
}: GalleryFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateFilter = useCallback(
    (key: keyof FilterState, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [router, pathname, searchParams]
  )

  const clearFilters = useCallback(() => {
    router.push(pathname, { scroll: false })
  }, [router, pathname])

  const hasActiveFilters =
    activeFilters.medium || activeFilters.series || activeFilters.availability

  return (
    <div
      className="mb-10 flex flex-wrap items-center gap-3"
      role="group"
      aria-label="Filter artworks"
      data-testid="gallery-filters"
    >
      {/* Medium filter */}
      <select
        value={activeFilters.medium}
        onChange={(e) => updateFilter('medium', e.target.value)}
        aria-label="Filter by medium"
        className="border border-[var(--color-border)] bg-transparent px-4 py-2 text-sm text-[var(--color-foreground)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
      >
        <option value="">All Mediums</option>
        {MEDIUMS.map((m) => (
          <option key={m} value={m.toLowerCase()}>
            {m}
          </option>
        ))}
      </select>

      {/* Series filter */}
      <select
        value={activeFilters.series}
        onChange={(e) => updateFilter('series', e.target.value)}
        aria-label="Filter by series"
        className="border border-[var(--color-border)] bg-transparent px-4 py-2 text-sm text-[var(--color-foreground)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
      >
        <option value="">All Series</option>
        {seriesOptions.map((s) => (
          <option key={s.slug} value={s.slug}>
            {s.title}
          </option>
        ))}
        <option value="ungrouped">Ungrouped</option>
      </select>

      {/* Availability filter */}
      <select
        value={activeFilters.availability}
        onChange={(e) => updateFilter('availability', e.target.value)}
        aria-label="Filter by availability"
        className="border border-[var(--color-border)] bg-transparent px-4 py-2 text-sm text-[var(--color-foreground)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
      >
        <option value="">All Works</option>
        {AVAILABILITIES.map((a) => (
          <option key={a} value={a.toLowerCase()}>
            {a}
          </option>
        ))}
      </select>

      {/* Clear filters */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="text-sm text-[var(--color-muted)] underline underline-offset-2 transition-colors hover:text-[var(--color-foreground)]"
          data-testid="clear-filters"
        >
          Clear filters
        </button>
      )}
    </div>
  )
}
