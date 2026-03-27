import Image from 'next/image'
import Link from 'next/link'

interface HeroProps {
  image?: {
    src: string
    alt: string
  }
  title?: string
  tagline?: string
}

export function Hero({
  image = {
    src: 'https://images.metmuseum.org/CRDImages/ep/web-large/DP-34962-001.jpg',
    alt: 'Andreas Achenbach — Sunset after a Storm on the Coast of Sicily, 1853, oil on canvas',
  },
  title = 'Sangeeth',
  tagline = 'Original works in oil, watercolour, and mixed media',
}: HeroProps) {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex h-[calc(100vh-73px)] min-h-[560px] items-end overflow-hidden"
    >
      {/* Full-bleed image */}
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Dark gradient overlay for text legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
      />

      {/* Content */}
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 md:pb-24">
        <h1
          id="hero-title"
          className="mb-4 font-serif text-5xl text-white md:text-7xl"
        >
          {title}
        </h1>
        <p className="mb-8 max-w-md text-lg text-white/80 md:text-xl">
          {tagline}
        </p>
        <Link
          href="/gallery"
          className="inline-block rounded-none border border-white px-8 py-3 text-sm tracking-widest text-white uppercase transition-all duration-300 hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-white"
        >
          View Gallery
        </Link>
      </div>
    </section>
  )
}
