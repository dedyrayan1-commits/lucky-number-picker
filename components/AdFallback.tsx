export default function AdFallback() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-slate-900 px-6 py-8 text-center shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-cyan-500/10 to-amber-400/5" />

      <div className="absolute -left-24 top-0 h-full w-24 animate-[adShimmer_6s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent blur-xl" />

      <div className="relative z-10">
        <h3 className="animate-[adGlow_4s_ease-in-out_infinite] bg-gradient-to-r from-emerald-300 via-cyan-300 to-amber-300 bg-clip-text text-xl font-extrabold tracking-[0.15em] text-transparent md:text-3xl">
          PILIHAN ANDA TETAP YANG UTAMA
        </h3>

        <p className="mx-auto mt-3 max-w-3xl animate-[adFade_5s_ease-in-out_infinite] text-sm leading-6 text-slate-300 md:text-base">
          Kolaborasikan angka pilihan Anda dengan prediksi Lucky Number Picker
          sebagai referensi tambahan.
        </p>
      </div>

      <style>
        {`
          @keyframes adShimmer {
            0% {
              transform: translateX(-150%);
              opacity: 0;
            }

            20% {
              opacity: 1;
            }

            60% {
              opacity: 1;
            }

            100% {
              transform: translateX(1400%);
              opacity: 0;
            }
          }

          @keyframes adGlow {
            0%, 100% {
              filter: drop-shadow(0 0 4px rgba(16, 185, 129, 0.15));
              transform: translateY(0);
            }

            50% {
              filter: drop-shadow(0 0 14px rgba(34, 211, 238, 0.35));
              transform: translateY(-2px);
            }
          }

          @keyframes adFade {
            0%, 100% {
              opacity: 0.75;
            }

            50% {
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
}