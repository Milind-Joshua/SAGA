export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <p className="font-serif text-lg tracking-widest uppercase">SAGA</p>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center gap-6 text-sm text-[var(--color-muted)]">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-300 hover:text-[var(--color-foreground)]"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-300 hover:text-[var(--color-foreground)]"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </nav>

          <p className="text-sm text-[var(--color-muted)]">
            &copy; {new Date().getFullYear()} Sangeeth Art Gallery &amp; Atelier
          </p>
        </div>
      </div>
    </footer>
  )
}
