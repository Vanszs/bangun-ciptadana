import Link from "next/link";
import { SERVICES_DATA } from "@/data/data";
import { getServiceIcon } from "@/components/IconMapper";
import { MapPin, Globe, ArrowRight, Phone, Headphones } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full text-left">
      <section className="relative overflow-hidden min-h-[600px] lg:min-h-[720px] flex items-center bg-[#050F1E]">
        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80" alt="Bangun Ciptadana headquarter" className="absolute inset-0 w-full h-full object-cover object-center select-none" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(90deg, rgba(5,15,40,0.85), rgba(5,15,40,0.55), rgba(5,15,40,0.15))" }} />
        <div className="max-w-[1240px] mx-auto px-4 md:px-6 w-full relative z-20 py-24 lg:py-32">
          <div className="max-w-xl md:max-w-2xl text-left">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none uppercase text-white mb-2">
              <span className="block">BANGUN</span>
              <span className="block mt-1">CIPTADANA</span>
            </h1>
            <p className="text-xl sm:text-2xl font-bold tracking-wider text-brand-secondary mt-3 mb-6 uppercase leading-snug">Your Real Partner</p>
            <p className="text-white/90 text-xs sm:text-sm md:text-base leading-relaxed mb-8 max-w-lg">
              Solusi konstruksi profesional untuk bangunan komersial, residensial, renovasi, interior, aluminium, kaca, dan pekerjaan sipil.
            </p>
            <div className="flex flex-row items-center gap-4 flex-wrap">
              <Link href="/services" className="inline-flex items-center justify-center gap-2 h-14 px-8 bg-brand-secondary hover:bg-brand-secondary-dark text-white text-sm font-bold tracking-wide rounded-md transition-colors duration-200 shadow-md">
                Lihat Layanan <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 h-14 px-8 border-2 border-white/80 hover:border-white hover:bg-white/10 text-white text-sm font-bold tracking-wide rounded-md transition-colors duration-200">
                Hubungi Kami <Phone className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-30 -mt-10 px-4">
        <div className="max-w-[1240px] mx-auto bg-white rounded-lg shadow-[0_20px_40px_rgba(7,20,43,0.08)] border border-brand-border/60 p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-brand-border/80">
            <div className="flex items-center gap-5 pb-6 md:pb-0">
              <div className="w-14 h-14 bg-brand-primary/10 rounded-lg flex items-center justify-center shrink-0"><MapPin className="w-6 h-6 text-brand-primary" /></div>
              <div>
                <h4 className="text-[10px] font-bold tracking-widest text-brand-muted uppercase mb-1">Alamat Kantor</h4>
                <p className="text-brand-text font-bold text-sm sm:text-base">Jl. XXXXXXXX No. XX, Kota XXXXX</p>
              </div>
            </div>
            <div className="flex items-center gap-5 pt-6 md:pt-0 md:pl-8">
              <div className="w-14 h-14 bg-brand-secondary/10 rounded-lg flex items-center justify-center shrink-0"><Globe className="w-6 h-6 text-brand-secondary" /></div>
              <div>
                <h4 className="text-[10px] font-bold tracking-widest text-brand-secondary uppercase mb-1">Area Layanan</h4>
                <p className="text-brand-text font-bold text-sm sm:text-base">Melayani proyek konstruksi dan renovasi di seluruh Indonesia.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 max-w-[1240px] mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12 border-l-4 border-brand-primary pl-5">
          <div className="max-w-xl">
            <span className="text-xs font-bold tracking-widest text-brand-secondary uppercase block mb-1">Layanan Kami</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-text leading-tight uppercase">Layanan Konstruksi Terbaik untuk Anda</h2>
          </div>
          <div className="max-w-md md:self-end">
            <p className="text-brand-muted text-xs sm:text-sm leading-relaxed">Kami menyediakan berbagai layanan konstruksi profesional dengan standar kualitas terbaik, didukung oleh tenaga teknik sipil & arsitektural berpengalaman.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service) => (
            <Link key={service.id} href="/services" className="bg-white p-8 rounded-lg border border-brand-border/40 hover:border-brand-primary/20 transition-colors duration-200 shadow-[0_4px_12px_rgba(7,20,43,0.02)] hover:shadow-[0_12px_24px_rgba(7,20,43,0.06)] cursor-pointer group flex items-start gap-5">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-brand-secondary/10 shrink-0 group-hover:bg-brand-secondary/20 transition-colors duration-200">
                {getServiceIcon(service.iconName)}
              </div>
              <div>
                <h3 className="text-base font-bold text-brand-text mb-2 tracking-wide group-hover:text-brand-primary transition-colors">{service.title}</h3>
                <p className="text-brand-muted text-xs leading-relaxed">{service.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white py-20 border-y border-brand-border/60">
        <div className="max-w-[1240px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 flex flex-col items-start text-left">
              <span className="text-xs font-bold tracking-widest text-brand-primary uppercase block mb-1">Profil Perusahaan</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-text leading-tight mb-5 uppercase">Membangun dengan Kualitas, Mewujudkan Kepercayaan</h2>
              <p className="text-brand-muted text-xs sm:text-sm leading-relaxed mb-4">Bangun Ciptadana merupakan perusahaan yang bergerak di bidang jasa konstruksi, renovasi, interior, aluminium, kaca, serta berbagai pekerjaan bangunan lainnya dengan komitmen kualitas premium dan ketepatan waktu.</p>
              <p className="text-brand-muted text-xs sm:text-sm leading-relaxed mb-8">Kami didukung oleh tenaga profesional terdidik, sistem kerja transparan, dan material bersertifikasi SNI untuk memastikan setiap hasil pengerjaan kuat, tahan lama, dan bernilai estetis tinggi.</p>
              <Link href="/about" className="flex items-center justify-center gap-2 h-14 px-8 bg-brand-primary hover:bg-brand-primary-dark text-white text-sm font-bold tracking-wide rounded-md transition-colors duration-200 shadow-md">
                Selengkapnya Tentang Kami <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="lg:col-span-7 overflow-hidden rounded-lg border border-brand-border/60 shadow-[0_12px_24px_rgba(7,20,43,0.04)] h-[360px] sm:h-[450px] relative">
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" alt="Contemporary architecture" className="w-full h-full object-cover object-center select-none" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(135deg,#1491D0,#7BC255)] py-12 text-white relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="flex items-center gap-5 text-left">
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0 shadow-md"><Headphones className="w-7 h-7 text-brand-primary" /></div>
            <div>
              <span className="text-xs font-bold tracking-widest text-slate-100 block uppercase mb-1">Punya rencana proyek?</span>
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-wide leading-tight uppercase text-white">Konsultasikan kebutuhan Anda sekarang.</h3>
              <p className="text-white/95 text-xs sm:text-sm mt-1 max-w-xl">Tim teknik sipil & arsitek kami siap memberikan solusi premium paling efisien untuk proyek Anda.</p>
            </div>
          </div>
          <Link href="/contact" className="bg-[#07142B] hover:bg-[#0c1e3d] text-white px-8 h-14 rounded-md text-sm font-bold tracking-wide transition-colors duration-200 hover:shadow-xl flex items-center justify-center gap-2 whitespace-nowrap">
            Hubungi Kami Sekarang <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
