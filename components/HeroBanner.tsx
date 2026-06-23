export default function HeroBanner({ title, backgroundImage }: { title: string; backgroundImage?: string }) {
  return (
    <div className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden bg-slate-900">
      <div className="absolute inset-0 bg-black/60 z-10" />
      <img
        src={backgroundImage || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1440&q=80"}
        alt={`${title} - Bangun Ciptadana`}
        className="absolute inset-0 w-full h-full object-cover object-center select-none"
        referrerPolicy="no-referrer"
      />
      <div className="relative z-20 text-center px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-3 uppercase">{title}</h1>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-300 font-medium">
          <a href="/" className="hover:text-brand-secondary transition-colors">Home</a>
          <span className="text-gray-500">/</span>
          <span className="text-brand-secondary font-semibold">{title}</span>
        </div>
      </div>
    </div>
  );
}
