import OfficialResultSection from "@/components/OfficialResultSection";
import PremiumPredictionSection from "@/components/PremiumPredictionSection";
import FeatureCard from "@/components/FeatureCard";
import ComparisonTable from "@/components/ComparisonTable";
import TestimonialCard from "@/components/TestimonialCard";
import FaqItem from "@/components/FaqItem";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
  <>
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">

        <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">
          Diperbarui Setiap Hari
        </p>

        <h1 className="mt-6 text-5xl font-bold md:text-7xl">
          Lucky Number Picker
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
  Dapatkan informasi prediksi Hong Kong, Singapore, Sydney, dan Toto Macau
  yang diperbarui setiap hari. Hasil resmi dapat diakses oleh semua pengguna,
  sedangkan prediksi harian tersedia khusus bagi Member Premium.
</p>

<div className="mt-10 flex flex-col gap-4 sm:flex-row">
  <Link
    href="/official-result"
    className="rounded-xl bg-emerald-500 px-8 py-4 text-center font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-emerald-600 hover:shadow-emerald-500/30"
  >
    📊 Lihat Hasil Resmi
  </Link>

  <Link
    href="/membership"
    className="rounded-xl border border-amber-400 px-8 py-4 text-center font-semibold text-amber-300 shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-amber-400 hover:text-slate-950 hover:shadow-amber-400/40"
  >
    👑 Jadi Member Premium
  </Link>
</div>

      </section>

      <OfficialResultSection />

      <PremiumPredictionSection />

      <section className="mx-auto max-w-6xl px-6 py-20 text-white">
  <div className="mx-auto max-w-3xl text-center">
    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
      MENGAPA MEMILIH KAMI
    </p>

    <h2 className="mt-4 text-3xl font-bold md:text-5xl">
      Informasi yang Mudah Diakses dan Selalu Diperbarui
    </h2>

    <p className="mt-6 text-lg leading-8 text-slate-300">
      Lucky Number Picker membantu Anda mendapatkan hasil resmi
      Hong Kong, Singapore, Sydney, dan Toto Macau dengan tampilan
      yang sederhana, cepat, dan mudah dipahami.
    </p>

    <p className="mt-4 text-lg leading-8 text-slate-300">
      Semua pengguna dapat melihat hasil resmi secara gratis,
      sedangkan prediksi harian tersedia khusus bagi Member Premium
      yang menginginkan informasi lebih lengkap.
    </p>
  </div>
</section>
<section className="mx-auto max-w-6xl px-6 py-20 text-white">

  <div className="text-center">

    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
      KEUNGGULAN LAYANAN
    </p>

    <h2 className="mt-4 text-3xl font-bold md:text-5xl">
      Mengapa Banyak Pengguna Memilih Lucky Number Picker?
    </h2>
    <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

  <FeatureCard
    icon="🛡️"
    title="Data Resmi"
    description="Hasil resmi diperbarui setiap hari sehingga informasi selalu akurat dan mudah diakses."
  />

  <FeatureCard
    icon="⚡"
    title="Cepat Diakses"
    description="Tampilan sederhana membuat pengguna dapat menemukan informasi hanya dalam beberapa detik."
  />

  <FeatureCard
    icon="👑"
    title="Member Premium"
    description="Prediksi harian eksklusif tersedia bagi Member Premium dengan pembaruan setiap hari."
  />

  <FeatureCard
    icon="📱"
    title="Mudah Digunakan"
    description="Nyaman digunakan baik melalui komputer maupun perangkat mobile kapan saja."
  />

</div>

    <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
      Kami menghadirkan layanan yang mudah digunakan,
      informatif, dan terus diperbarui agar pengguna
      memperoleh informasi secara cepat dan nyaman.
    </p>

  </div>

</section>

      <ComparisonTable />

      <section className="mx-auto max-w-6xl px-6 py-20 text-white">
  <div className="mx-auto max-w-3xl text-center">
    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
      TESTIMONI PENGGUNA
    </p>

    <h2 className="mt-4 text-3xl font-bold md:text-5xl">
      Apa Kata Pengguna Kami?
    </h2>

    <p className="mt-6 text-lg leading-8 text-slate-300">
      Pengalaman pengguna menjadi motivasi kami untuk terus menghadirkan layanan
      yang mudah digunakan, cepat, dan selalu diperbarui.
    </p>
  </div>

  <div className="mt-14 grid gap-8 md:grid-cols-3">
    <TestimonialCard
      name="Andi"
      text="Tampilannya bersih dan sangat mudah dipahami. Saya tidak perlu mencari informasi ke banyak tempat."
    />

    <TestimonialCard
      name="Budi"
      text="Member Premium memberikan informasi yang lebih lengkap dan update setiap hari."
    />

    <TestimonialCard
      name="Rina"
      text="Website terasa cepat, profesional, dan nyaman digunakan baik di komputer maupun di ponsel."
    />
  </div>
</section>

<section className="mx-auto max-w-6xl px-6 py-20 text-white">

  <div className="mx-auto max-w-3xl text-center">
    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
      PERTANYAAN UMUM
    </p>

    <h2 className="mt-4 text-3xl font-bold md:text-5xl">
      Pertanyaan yang Sering Diajukan
    </h2>

    <p className="mt-6 text-lg leading-8 text-slate-300">
      Berikut beberapa pertanyaan yang paling sering diajukan oleh pengguna Lucky Number Picker.
    </p>
  </div>

  <div className="mt-14 space-y-6">

    <FaqItem
      question="Apakah hasil resmi dapat diakses secara gratis?"
      answer="Ya. Semua pengguna dapat melihat hasil resmi setiap hari tanpa biaya."
    />

    <FaqItem
      question="Apa keuntungan menjadi Member Premium?"
      answer="Member Premium memperoleh akses prediksi harian, riwayat prediksi, serta fitur tambahan yang diperbarui secara berkala."
    />

    <FaqItem
      question="Apakah data diperbarui setiap hari?"
      answer="Ya. Informasi diperbarui setiap hari sesuai jadwal pembaruan yang tersedia."
    />

    <FaqItem
      question="Bagaimana cara menjadi Member Premium?"
      answer="Klik tombol 'Jadi Member Premium', kemudian pilih paket yang sesuai dan selesaikan proses pembayaran."
    />

  </div>

</section>

    </main>

<Footer />

</>
);
}