import Link from "next/link";

export default function TermsAndConditionsPage() {
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
            Syarat & Ketentuan
          </h1>

          <p className="mt-4 text-slate-400">
            Syarat dan ketentuan penggunaan layanan Lucky Number Picker.
          </p>
        </div>

        <div className="space-y-5">
          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">
              1. Penerimaan Syarat
            </h2>

            <p className="mt-3 leading-7 text-slate-300">
              Dengan menggunakan website Lucky Number Picker, pengguna dianggap
              telah membaca, memahami, dan menyetujui syarat dan ketentuan yang
              berlaku pada layanan ini.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">
              2. Akun Pengguna
            </h2>

            <p className="mt-3 leading-7 text-slate-300">
              Pengguna bertanggung jawab atas keamanan akun, informasi login,
              serta seluruh aktivitas yang dilakukan melalui akun tersebut.
              Informasi yang diberikan pada saat registrasi harus benar dan dapat
              digunakan untuk keperluan layanan.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">
              3. Layanan Membership
            </h2>

            <p className="mt-3 leading-7 text-slate-300">
              Lucky Number Picker menyediakan beberapa jenis membership
              berbayar dengan cakupan akses yang berbeda. Membership aktif
              selama masa berlaku paket setelah pembayaran berhasil
              dikonfirmasi oleh sistem.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">
              4. Pembayaran
            </h2>

            <p className="mt-3 leading-7 text-slate-300">
              Pembayaran dilakukan melalui metode pembayaran yang tersedia pada
              payment gateway yang digunakan oleh Lucky Number Picker. Pengguna
              wajib memastikan data dan nominal pembayaran telah sesuai sebelum
              menyelesaikan transaksi.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">
              5. Informasi dan Prediksi
            </h2>

            <p className="mt-3 leading-7 text-slate-300">
              Informasi dan prediksi yang tersedia di Lucky Number Picker
              disediakan sebagai layanan informasi. Tidak terdapat jaminan bahwa
              informasi atau prediksi akan menghasilkan hasil tertentu.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">
              6. Tanggung Jawab Pengguna
            </h2>

            <p className="mt-3 leading-7 text-slate-300">
              Setiap keputusan yang dibuat berdasarkan informasi yang tersedia
              pada Lucky Number Picker merupakan tanggung jawab pengguna.
              Pengguna wajib menggunakan layanan sesuai hukum dan ketentuan yang
              berlaku.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">
              7. Pengembalian Dana
            </h2>

            <p className="mt-3 leading-7 text-slate-300">
              Ketentuan mengenai pengembalian dana mengikuti Kebijakan
              Pengembalian Dana yang tersedia secara terpisah pada website Lucky
              Number Picker.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">
              8. Perubahan Layanan
            </h2>

            <p className="mt-3 leading-7 text-slate-300">
              Lucky Number Picker dapat melakukan pembaruan, perubahan fitur,
              atau penyesuaian layanan apabila diperlukan untuk meningkatkan
              kualitas dan keamanan layanan.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">
              9. Perubahan Syarat & Ketentuan
            </h2>

            <p className="mt-3 leading-7 text-slate-300">
              Syarat dan ketentuan ini dapat diperbarui dari waktu ke waktu.
              Versi terbaru yang dipublikasikan pada website akan menjadi
              ketentuan yang berlaku.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">
              10. Hubungi Kami
            </h2>

            <p className="mt-3 leading-7 text-slate-300">
              Apabila pengguna memiliki pertanyaan mengenai syarat dan ketentuan
              ini, pengguna dapat menghubungi kami melalui halaman Kontak yang
              tersedia pada website Lucky Number Picker.
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