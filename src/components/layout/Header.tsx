'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { Nav } from './Nav'
import { MobileMenu } from './MobileMenu'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const handleClose = useCallback(() => setMobileMenuOpen(false), [])

  return (
    <>
      <header className="fixed top-0 right-0 left-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-background)]/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="font-serif text-lg tracking-widest uppercase focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
          >
            SAGA
          </Link>

          {/* Desktop nav + theme toggle */}
          <div className="hidden items-center gap-4 md:flex">
            <Nav />
            <ThemeToggle />
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              className="flex h-11 w-11 items-center justify-center rounded focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileMenuOpen(true)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={handleClose} />
    </>
  )
}
