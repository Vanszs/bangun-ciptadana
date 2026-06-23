import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h2 className="text-3xl font-bold text-brand-text mb-2">404</h2>
      <p className="text-brand-muted text-sm mb-6">Halaman tidak ditemukan.</p>
      <Link href="/" className="h-10 px-5 bg-brand-primary hover:bg-brand-primary-dark text-white text-sm font-semibold rounded-md transition-colors inline-flex items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary">
        Kembali ke Beranda
      </Link>
    </div>
  );
}
