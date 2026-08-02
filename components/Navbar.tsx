import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-slate-800 bg-slate-950">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-white transition hover:text-emerald-400"
        >
          🎲 Lucky Number Picker
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-slate-300 transition hover:text-emerald-400"
          >
            Home
          </Link>

          <Link
            href="/history"
            className="text-slate-300 transition hover:text-emerald-400"
          >
            History
          </Link>

          <Link
            href="/favorites"
            className="text-slate-300 transition hover:text-emerald-400"
          >
            Favorites
          </Link>

          <Link
            href="/about"
            className="text-slate-300 transition hover:text-emerald-400"
          >
            About
          </Link>
        </div>
      </nav>
    </header>
  );
}