"use client";

export default function AdminError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="p-6 lg:p-8 flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h2 className="text-xl font-semibold text-brand-text mb-2">Gagal memuat panel admin</h2>
      <p className="text-brand-muted text-sm mb-6 max-w-md">
        Terjadi kesalahan saat membaca data CMS. Coba lagi, atau periksa file <code className="font-mono text-xs">data/cms-store.json</code>.
      </p>
      <button
        type="button"
        onClick={reset}
        className="h-10 px-5 bg-brand-primary hover:bg-brand-primary-dark text-white text-sm font-semibold rounded-md transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
      >
        Coba Lagi
      </button>
    </div>
  );
}
