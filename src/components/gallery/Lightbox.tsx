'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { Artwork } from '@/types/artwork'

interface LightboxProps {
  artworks: Artwork[]
  initialIndex: number
  isOpen: boolean
  onClose: () => void
}

export function Lightbox({
  artworks,
  initialIndex,
  isOpen,
  onClose,
}: LightboxProps) {
  // navIndex tracks user navigation within a session; null = use initialIndex
  const [navIndex, setNavIndex] = useState<number | null>(null)
  const index = navIndex !== null ? navIndex : Math.max(0, initialIndex)
  const reducedMotion = useReducedMotion()
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<Element | null>(null)
  const touchStartX = useRef<number | null>(null)

  // Scroll lock + trigger capture — no setState here
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Focus management
  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus()
    } else {
      if (triggerRef.current instanceof HTMLElement) {
        triggerRef.current.focus()
      }
    }
  }, [isOpen])

  // Close handler — resets nav index as a side effect of the user action
  const handleClose = useCallback(() => {
    setNavIndex(null)
    onClose()
  }, [onClose])

  const handlePrev = useCallback(() => {
    setNavIndex((prev) => {
      const cur = prev !== null ? prev : Math.max(0, initialIndex)
      return (cur - 1 + artworks.length) % artworks.length
    })
  }, [artworks.length, initialIndex])

  const handleNext = useCallback(() => {
    setNavIndex((prev) => {
      const cur = prev !== null ? prev : Math.max(0, initialIndex)
      return (cur + 1) % artworks.length
    })
  }, [artworks.length, initialIndex])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, handleClose, handleNext, handlePrev])

  // Touch swipe navigation
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }, [])

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null) return
      const diff = touchStartX.current - e.changedTouches[0].clientX
      if (Math.abs(diff) > 50) {
        diff > 0 ? handleNext() : handlePrev()
      }
      touchStartX.current = null
    },
    [handleNext, handlePrev]
  )

  // Focus trap
  const handleTabKey = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab') return
    const focusable = e.currentTarget.querySelectorAll<HTMLElement>(
      'button, [href], input, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault()
        last?.focus()
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault()
        first?.focus()
      }
    }
  }, [])

  const current = artworks[index]

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }
  const transition = { duration: reducedMotion ? 0 : 0.2 }

  if (typeof window === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Artwork lightbox"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={transition}
          onClick={handleClose}
          onKeyDown={handleTabKey}
          data-testid="lightbox"
        >
          {/* Inner panel — sizes to image, stop propagation so clicks inside don't close */}
          <div
            className="flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close — fixed top-right of viewport */}
            <button
              ref={closeButtonRef}
              onClick={handleClose}
              aria-label="Close lightbox"
              className="fixed top-4 right-4 z-20 rounded-sm bg-black/50 p-2 text-white/80 transition-colors hover:bg-black/70 hover:text-white focus-visible:outline-2 focus-visible:outline-white"
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
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Image — drives the panel width */}
            <div
              className="relative"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <Image
                src={current.image.lightboxSrc}
                alt={current.image.alt}
                width={current.image.width}
                height={current.image.height}
                unoptimized
                className="block h-auto max-h-[85vh] w-auto max-w-[90vw] object-contain"
              />

              {/* Nav — overlaid on image edges */}
              {artworks.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    aria-label="Previous artwork"
                    className="absolute top-1/2 left-0 -translate-y-1/2 bg-black/40 p-3 text-white/80 transition-colors hover:bg-black/60 hover:text-white focus-visible:outline-2 focus-visible:outline-white"
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
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next artwork"
                    className="absolute top-1/2 right-0 -translate-y-1/2 bg-black/40 p-3 text-white/80 transition-colors hover:bg-black/60 hover:text-white focus-visible:outline-2 focus-visible:outline-white"
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
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Caption */}
            <p className="mt-3 px-4 text-center text-sm text-white/70">
              {current.title} · {current.medium}, {current.year}
            </p>

            {/* Position indicator */}
            {artworks.length > 1 && (
              <p className="mt-1 text-xs text-white/50">
                {index + 1} / {artworks.length}
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
