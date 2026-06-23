import Image from "next/image";
import Link from "next/link";

export default function HeroBanner({ title, backgroundImage }: { title: string; backgroundImage?: string }) {
  return (
    <div className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden bg-slate-900">
      <Image
        src={backgroundImage || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1440&q=80"}
        alt={`${title} - Bangun Ciptadana`}
        fill
        sizes="100vw"
        className="object-cover object-center select-none"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/55 to-slate-900/75 z-10" />
      <div className="relative z-20 text-center px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-3 uppercase">{title}</h1>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-300 font-medium">
          <Link href="/" className="hover:text-brand-secondary transition-colors">Home</Link>
          <span className="text-gray-500" aria-hidden="true">/</span>
          <span className="text-brand-secondary font-semibold">{title}</span>
        </div>
      </div>
    </div>
  );
}
