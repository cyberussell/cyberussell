export function AuthHeader() {
  return (
    <header className="border-b border-white/10 px-4 py-4">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <a href="https://www.cyberussell.com" className="text-sm font-semibold tracking-tight text-white">
          Cyberussell<span className="text-[#38BDF8]">.</span>
        </a>
        <a
          href="https://www.cyberussell.com"
          className="text-xs text-white/40 transition hover:text-[#38BDF8]"
        >
          ← Back to cyberussell.com
        </a>
      </div>
    </header>
  )
}

export function AuthFooter() {
  return (
    <footer className="border-t border-white/10 px-4 py-6 text-center text-xs text-white/30">
      <p>
        &copy; {new Date().getFullYear()} Cyberussell. Laundry Management System is a product of{' '}
        <a href="https://www.cyberussell.com" className="text-[#38BDF8] hover:underline">
          cyberussell.com
        </a>
        .
      </p>
    </footer>
  )
}
