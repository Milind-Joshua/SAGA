'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Nav } from './Nav'
import { MobileMenu } from './MobileMenu'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

          {/* Desktop nav */}
          <div className="hidden md:block">
            <Nav />
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex h-11 w-11 items-center justify-center rounded focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] md:hidden"
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
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  )
}
