export default function SeriesLoading() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <header className="mb-12">
        <div className="mb-3 h-12 w-32 animate-pulse rounded bg-[var(--color-border)]" />
        <div className="h-5 w-80 animate-pulse rounded bg-[var(--color-border)]" />
      </header>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} aria-hidden="true">
            <div className="mb-4 aspect-[4/3] animate-pulse bg-[var(--color-border)]" />
            <div className="mb-2 h-6 w-2/3 animate-pulse rounded bg-[var(--color-border)]" />
            <div className="h-4 w-1/4 animate-pulse rounded bg-[var(--color-border)]" />
          </div>
        ))}
      </div>
    </main>
  )
}
