'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/series', label: 'Series' },
  { href: '/about', label: 'About' },
  { href: '/exhibitions', label: 'Exhibitions' },
  { href: '/contact', label: 'Contact' },
]

export function Nav() {
  const pathname = usePathname()

  return (
    <nav aria-label="Main navigation">
      <ul className="flex items-center gap-8">
        {navLinks.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              aria-current={pathname === href ? 'page' : undefined}
              className="text-sm tracking-wide transition-colors duration-300 hover:text-[var(--color-accent)] aria-[current=page]:text-[var(--color-accent)]"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export { navLinks }
