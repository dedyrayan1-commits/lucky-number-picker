import Link from "next/link";

export default function FAQPage() {
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
            Frequently Asked Questions
          </h1>

          <p className="mt-4 text-slate-400">
            Pertanyaan umum mengenai layanan dan membership Lucky Number Picker.
          </p>
        </div>

        <div className="space-y-5">
          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">
              Apa itu Lucky Number Picker?
            </h2>
            <p className="mt-3 leading-7 text-slate-300">
              Lucky Number Picker adalah layanan berbasis website yang menyediakan
              informasi dan akses prediksi angka untuk beberapa market yang
              tersedia di dalam platform.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">
              Apakah saya harus membuat akun?
            </h2>
            <p className="mt-3 leading-7 text-slate-300">
              Ya. Pengguna perlu melakukan registrasi dan login untuk mengakses
              dashboard serta fitur membership yang tersedia.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">
              Paket membership apa saja yang tersedia?
            </h2>
            <p className="mt-3 leading-7 text-slate-300">
              Lucky Number Picker menyediakan Premium Regular, Premium Toto Macau
              4D, dan VIP. Setiap paket memiliki cakupan akses yang berbeda.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">
              Berapa lama membership aktif?
            </h2>
            <p className="mt-3 leading-7 text-slate-300">
              Membership berbayar aktif selama 7 hari sejak pembayaran berhasil
              dikonfirmasi.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">
              Bagaimana cara melakukan pembayaran?
            </h2>
            <p className="mt-3 leading-7 text-slate-300">
              Pengguna memilih paket membership, melanjutkan ke proses checkout,
              lalu menyelesaikan pembayaran melalui metode pembayaran yang
              tersedia pada payment gateway yang digunakan.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">
              Kapan akses premium aktif?
            </h2>
            <p className="mt-3 leading-7 text-slate-300">
              Akses premium akan diaktifkan setelah pembayaran berhasil
              diverifikasi oleh sistem.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">
              Apakah hasil atau prediksi dijamin selalu tepat?
            </h2>
            <p className="mt-3 leading-7 text-slate-300">
              Tidak. Informasi yang tersedia pada Lucky Number Picker tidak
              merupakan jaminan hasil tertentu. Pengguna tetap bertanggung jawab
              atas keputusan yang dibuat berdasarkan informasi yang tersedia.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">
              Bagaimana jika saya mengalami masalah pada akun atau pembayaran?
            </h2>
            <p className="mt-3 leading-7 text-slate-300">
              Pengguna dapat menghubungi kami melalui halaman Kontak yang tersedia
              pada website untuk mendapatkan bantuan lebih lanjut.
            </p>
          </section>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-sm text-slate-500">
          Lucky Number Picker
        </div>
      </div>
    </main>
  );
}