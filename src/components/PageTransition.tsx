'use client'

import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

// Default: fade + subtle Y slide
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const reducedMotion = useReducedMotion()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={reducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : { duration: 0.35, ease: [0.4, 0, 0.2, 1] }
        }
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// Variant: ink/iris clipPath wipe — swap into (site)/layout.tsx to use
export function IrisTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const reducedMotion = useReducedMotion()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={
          reducedMotion ? false : { clipPath: 'inset(0 100% 0 0)', opacity: 1 }
        }
        animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
        exit={
          reducedMotion
            ? undefined
            : { clipPath: 'inset(0 0 0 100%)', opacity: 1 }
        }
        transition={
          reducedMotion
            ? { duration: 0 }
            : { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
        }
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
