"use client";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h2 className="text-xl font-bold text-brand-text mb-2">Terjadi Kesalahan</h2>
      <p className="text-brand-muted text-sm mb-6">Gagal memuat halaman. Silakan coba lagi.</p>
      <button type="button" onClick={reset} className="h-10 px-5 bg-brand-primary hover:bg-brand-primary-dark text-white text-sm font-semibold rounded-md transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary">
        Coba Lagi
      </button>
    </div>
  );
}
