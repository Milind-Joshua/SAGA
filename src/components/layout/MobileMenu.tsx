'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navLinks } from './Nav'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const mountedRef = useRef(false)

  // Close on route change (skip initial mount)
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true
      return
    }
    onClose()
  }, [pathname, onClose])

  // Focus trap + Escape key
  useEffect(() => {
    if (!isOpen) return

    closeButtonRef.current?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return

      const menu = menuRef.current
      if (!menu) return
      const focusable = menu.querySelectorAll<HTMLElement>(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      )
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      ref={menuRef}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className="fixed inset-0 z-50 flex flex-col bg-[var(--color-background)]"
    >
      <div className="flex items-center justify-between px-6 py-4">
        <span className="font-serif text-lg tracking-widest uppercase">
          SAGA
        </span>
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close navigation menu"
          className="flex h-11 w-11 items-center justify-center rounded focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
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
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <nav
        aria-label="Mobile navigation"
        className="flex flex-1 flex-col justify-center px-8"
      >
        <ul className="space-y-6">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={pathname === href ? 'page' : undefined}
                className="block font-serif text-3xl tracking-wide transition-colors duration-300 hover:text-[var(--color-accent)] aria-[current=page]:text-[var(--color-accent)]"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
