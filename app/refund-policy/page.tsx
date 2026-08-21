import Link from "next/link";

export default function RefundPolicyPage() {
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
            Kebijakan Pengembalian Dana
          </h1>

          <p className="mt-4 text-slate-400">
            Kebijakan pengembalian dana untuk pembelian membership Lucky Number
            Picker.
          </p>
        </div>

        <div className="space-y-5">
          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">1. Ketentuan Umum</h2>
            <p className="mt-3 leading-7 text-slate-300">
              Setiap pembelian membership memberikan pengguna akses ke layanan
              digital Lucky Number Picker sesuai dengan paket dan masa aktif
              yang dipilih.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">
              2. Pengajuan Pengembalian Dana
            </h2>
            <p className="mt-3 leading-7 text-slate-300">
              Pengguna dapat mengajukan permintaan pengembalian dana apabila
              pembayaran telah berhasil tetapi akses membership yang dibeli
              tidak dapat digunakan karena kesalahan teknis pada sistem Lucky
              Number Picker.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">
              3. Kondisi yang Tidak Memenuhi Pengembalian Dana
            </h2>
            <p className="mt-3 leading-7 text-slate-300">
              Pengembalian dana tidak dapat diberikan apabila layanan
              membership telah berhasil diaktifkan dan dapat diakses oleh
              pengguna, atau apabila permintaan didasarkan pada hasil maupun
              tingkat keberhasilan informasi atau prediksi yang tersedia pada
              layanan.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">
              4. Pemeriksaan Permintaan
            </h2>
            <p className="mt-3 leading-7 text-slate-300">
              Setiap permintaan pengembalian dana akan diperiksa berdasarkan
              catatan transaksi dan kondisi layanan pada akun pengguna. Kami
              dapat meminta informasi tambahan yang diperlukan untuk
              memverifikasi transaksi.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">
              5. Proses Pengembalian Dana
            </h2>
            <p className="mt-3 leading-7 text-slate-300">
              Apabila permintaan pengembalian dana disetujui, proses
              pengembalian akan dilakukan melalui metode yang tersedia dan
              mengikuti prosedur penyedia layanan pembayaran yang digunakan
              pada transaksi tersebut.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">6. Hubungi Kami</h2>
            <p className="mt-3 leading-7 text-slate-300">
              Untuk mengajukan permintaan pengembalian dana atau mendapatkan
              bantuan mengenai transaksi, pengguna dapat menghubungi kami
              melalui halaman Kontak pada website Lucky Number Picker.
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