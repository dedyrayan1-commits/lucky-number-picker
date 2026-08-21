import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10">
          <Link
            href="/"
            className="text-sm font-semibold text-cyan-300 hover:text-cyan-200"
          >
            ← Kembali ke Beranda
          </Link>

          <h1 className="mt-6 text-4xl font-black md:text-5xl">
            Hubungi Kami
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-slate-400">
            Jika Anda memiliki pertanyaan mengenai akun, membership,
            pembayaran, atau layanan Lucky Number Picker, silakan hubungi kami
            melalui informasi kontak berikut.
          </p>
        </div>

        <div className="grid gap-5">
          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-cyan-300">
              Email
            </p>

            <a
              href="mailto:bumibetuahpermata@gmail.com"
              className="mt-3 block text-lg font-bold text-white hover:text-cyan-300"
            >
              bumibetuahpermata@gmail.com
            </a>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-cyan-300">
              WhatsApp / Telepon
            </p>

            <a
              href="tel:+6282223798490"
              className="mt-3 block text-lg font-bold text-white hover:text-cyan-300"
            >
              0822-2379-8490
            </a>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-cyan-300">
              Alamat Usaha
            </p>

            <address className="mt-3 not-italic text-lg font-semibold leading-8 text-white">
              Dusun Bukit Suling
              <br />
              Desa Rantau Pauh, Kecamatan Rantau
              <br />
              Kabupaten Aceh Tamiang
              <br />
              Provinsi Aceh, Indonesia
            </address>
          </section>

          <section className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-6">
            <h2 className="text-xl font-bold">
              Bantuan Pelanggan
            </h2>

            <p className="mt-3 leading-7 text-slate-300">
              Untuk pertanyaan mengenai transaksi atau membership, sertakan
              informasi akun dan detail transaksi yang relevan agar kami dapat
              membantu melakukan pemeriksaan.
            </p>
          </section>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/faq"
            className="rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 font-semibold transition hover:border-cyan-400/40"
          >
            FAQ
          </Link>

          <Link
            href="/refund-policy"
            className="rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 font-semibold transition hover:border-cyan-400/40"
          >
            Refund Policy
          </Link>

          <Link
            href="/terms-and-conditions"
            className="rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 font-semibold transition hover:border-cyan-400/40"
          >
            Syarat & Ketentuan
          </Link>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-sm text-slate-500">
          Lucky Number Picker
        </div>
      </div>
    </main>
  );
}