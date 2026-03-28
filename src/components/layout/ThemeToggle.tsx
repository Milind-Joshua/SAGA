'use client'

import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'

// Returns false on the server / first render, true after hydration.
// useSyncExternalStore is the idiomatic way to handle SSR-safe client detection.
function useIsMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useIsMounted()

  // Avoid hydration mismatch — render a stable placeholder until mounted
  if (!mounted) {
    return <div className="h-9 w-9" aria-hidden="true" />
  }

  const isDark = resolvedTheme === 'dark'

  function handleToggle() {
    const next = isDark ? 'light' : 'dark'
    if (!('startViewTransition' in document)) {
      setTheme(next)
      return
    }
    document.startViewTransition(() => setTheme(next))
  }

  return (
    <button
      onClick={handleToggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="flex h-9 w-9 items-center justify-center rounded text-[var(--color-muted)] transition-colors duration-300 hover:text-[var(--color-foreground)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}

function SunIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}
