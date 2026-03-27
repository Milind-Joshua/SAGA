export function DemoBanner() {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 bg-[var(--color-accent)] px-4 py-2 text-center text-xs tracking-widest text-white uppercase">
      <span className="font-semibold">Demo</span>
      <span className="mx-2 opacity-60">·</span>
      Static preview — live content will be managed via Sanity CMS in v2
    </div>
  )
}
