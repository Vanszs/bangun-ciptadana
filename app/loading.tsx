export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <output className="w-6 h-6 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" aria-label="Memuat halaman">
        <span className="sr-only">Memuat...</span>
      </output>
    </div>
  );
}
