import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { DemoBanner } from '@/components/layout/DemoBanner'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-[var(--color-accent)] focus:px-4 focus:py-2 focus:text-white focus:outline-none"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="flex-1 pt-[73px]">
        {children}
      </main>
      <Footer />
      <DemoBanner />
    </>
  )
}
