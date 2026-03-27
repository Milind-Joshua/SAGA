'use server'

export interface ContactFormState {
  status: 'idle' | 'success' | 'error'
  message: string
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get('name')?.toString().trim()
  const email = formData.get('email')?.toString().trim()
  const type = formData.get('type')?.toString()
  const message = formData.get('message')?.toString().trim()

  if (!name || !email || !type || !message) {
    return { status: 'error', message: 'All fields are required.' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { status: 'error', message: 'Please enter a valid email address.' }
  }

  // TODO Phase 4+: send via Resend
  // const resend = new Resend(process.env.RESEND_API_KEY)
  // await resend.emails.send({ from: ..., to: ..., subject: ..., react: ... })

  console.log('[Contact form submission]', { name, email, type, message })

  return {
    status: 'success',
    message: "Thank you for getting in touch. I'll respond within a few days.",
  }
}
