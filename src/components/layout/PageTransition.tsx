'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const reducedMotion = useReducedMotion()

  const variants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 8 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: reducedMotion ? 0 : -8 },
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{
        duration: reducedMotion ? 0 : 0.4,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  )
}
