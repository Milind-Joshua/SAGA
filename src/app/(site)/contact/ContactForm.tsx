'use client'

import { useActionState } from 'react'
import { useReducedMotion, motion, AnimatePresence } from 'framer-motion'
import { submitContactForm, type ContactFormState } from '@/app/actions/contact'

const initialState: ContactFormState = { status: 'idle', message: '' }

const inputClass =
  'w-full border-b border-[var(--color-border)] bg-transparent py-3 text-sm outline-none transition-colors focus:border-[var(--color-foreground)] placeholder:text-[var(--color-muted)]'

const labelClass =
  'mb-1 block text-xs tracking-widest uppercase text-[var(--color-muted)]'

export function ContactForm() {
  const reducedMotion = useReducedMotion()
  const [state, action, pending] = useActionState(
    submitContactForm,
    initialState
  )

  if (state.status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.5, ease: 'easeOut' }}
        className="py-12"
      >
        <p className="mb-2 font-serif text-2xl">Message sent.</p>
        <p className="text-[var(--color-muted)]">{state.message}</p>
      </motion.div>
    )
  }

  return (
    <form action={action} noValidate>
      <div className="space-y-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClass}>
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              maxLength={100}
              autoComplete="name"
              className={inputClass}
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              maxLength={254}
              autoComplete="email"
              className={inputClass}
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="type" className={labelClass}>
            Enquiry type
          </label>
          <select
            id="type"
            name="type"
            required
            className={`${inputClass} cursor-pointer`}
            defaultValue=""
          >
            <option value="" disabled>
              Select…
            </option>
            <option value="purchase">Purchase enquiry</option>
            <option value="commission">Commission</option>
            <option value="studio-visit">Studio visit</option>
            <option value="press">Press &amp; media</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className={labelClass}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            maxLength={2000}
            className={`${inputClass} resize-none`}
            placeholder="Your message…"
          />
        </div>

        <AnimatePresence>
          {state.status === 'error' && (
            <motion.p
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              role="alert"
              aria-live="polite"
              className="text-sm text-red-600"
            >
              {state.message}
            </motion.p>
          )}
        </AnimatePresence>

        <button
          type="submit"
          disabled={pending}
          className="block w-full border border-[var(--color-foreground)] px-8 py-3 text-center text-sm tracking-widest uppercase transition-all duration-300 hover:bg-[var(--color-foreground)] hover:text-[var(--color-background)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] disabled:opacity-50 sm:inline-block sm:w-auto"
        >
          {pending ? 'Sending…' : 'Send Message'}
        </button>
      </div>
    </form>
  )
}
