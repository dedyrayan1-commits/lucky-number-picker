export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 text-center text-slate-400 md:flex-row">

        <div>
          <h3 className="text-lg font-bold text-white">
            Lucky Number Picker
          </h3>

          <p className="mt-2 text-sm">
            Informasi hasil resmi dan layanan Member Premium.
          </p>
        </div>

        <div className="flex gap-6 text-sm">
          <a href="/" className="hover:text-white">
            Beranda
          </a>

          <a href="/predictions" className="hover:text-white">
            Hasil Resmi
          </a>

          <a href="/premium" className="hover:text-white">
            Member Premium
          </a>
        </div>

      </div>

      <div className="border-t border-slate-800 py-6 text-center text-sm text-slate-500">
        © 2026 Lucky Number Picker. Seluruh hak cipta dilindungi.
      </div>
    </footer>
  );
}