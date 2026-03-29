import Image from 'next/image'
import Link from 'next/link'

interface HeroProps {
  image?: {
    src: string
    alt: string
    blurDataURL?: string
  } | null
  title?: string
  tagline?: string
}

export function Hero({
  image = null,
  title = 'Sangeeth',
  tagline = 'Original works in oil, watercolour, and mixed media',
}: HeroProps) {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex h-[calc(100vh-73px)] min-h-[560px] items-end overflow-hidden"
    >
      {/* Full-bleed image — or dark gradient background when no image is set */}
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          placeholder={image.blurDataURL ? 'blur' : 'empty'}
          blurDataURL={image.blurDataURL}
          className="object-cover object-center"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950"
        />
      )}

      {/* Dark gradient overlay for text legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
      />

      {/* Linen/canvas texture layer */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='l'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23l)'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          mixBlendMode: 'multiply',
          opacity: 0.08,
        }}
      />

      {/* Content */}
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 md:pb-24">
        <h1
          id="hero-title"
          className="mb-4 font-serif text-4xl text-white sm:text-5xl md:text-7xl"
        >
          {title}
        </h1>
        <p className="mb-8 max-w-md text-base text-white/80 sm:text-lg md:text-xl">
          {tagline}
        </p>
        <Link
          href="/gallery"
          className="block w-full rounded-none border border-white px-8 py-3 text-center text-sm tracking-widest text-white uppercase transition-all duration-300 hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-white sm:inline-block sm:w-auto"
        >
          View Gallery
        </Link>
      </div>
    </section>
  )
}
