import Link from "next/link";
import Image from "next/image";
import { readStore } from "@/data/store";
import { getServiceIcon, getStatIcon } from "@/components/IconMapper";
import { MapPin, Globe, ArrowRight, Phone, Headphones } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const store = await readStore();
  const SERVICES_DATA = store.services;
  const STATS_DATA = store.stats;
  const profile = store.profile;
  return (
    <div className="flex flex-col w-full bg-slate-50/50">
      {/* 1. HERO — full-bleed image with directional gradient backdrop behind text */}
      <section className="relative overflow-hidden min-h-[500px] sm:min-h-[520px] lg:h-[540px]">
        {/* Image — full-bleed background */}
        <Image
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1920&q=80"
          alt="Gedung komersial modern — portofolio Bangun Ciptadana"
          fill
          priority
          sizes="100vw"
          unoptimized
          className="object-cover object-center"
        />

        {/* Gradient overlay — left 40% solid, fading to transparent on right (image visible) */}
        <div
          className="absolute inset-0 lg:bg-[linear-gradient(to_right,#0F172A_0%,#0F172A_38%,rgba(15,23,42,0.65)_55%,rgba(15,23,42,0.3)_75%,transparent_100%)] bg-[linear-gradient(to_bottom,#0F172Acc_0%,#0F172A99_60%,#0F172A66_100%)]"
          aria-hidden="true"
        />

        {/* Faint diagonal grid pattern on right (overlay blend, very subtle) */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none mix-blend-overlay hidden lg:block"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern id="hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#ffffff" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>

        {/* Content — vertically centered, text constrained to left */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 w-full relative">
            <div className="max-w-[640px] relative z-10">
              <h1 className="text-[56px] sm:text-[64px] lg:text-[72px] font-extrabold leading-[0.95] text-white uppercase tracking-tight">
                <span className="block">Bangun</span>
                <span className="block">Ciptadana</span>
              </h1>
              <p className="text-sm sm:text-base font-bold text-brand-secondary tracking-[0.2em] uppercase mt-5">
                Your Real Partner
              </p>
              <p className="text-slate-200 text-base sm:text-[17px] leading-[1.65] max-w-[520px] mt-5">
                {profile.description}
              </p>

              {/* CTA Buttons — h-14 (56px), rounded-full, primary gradient + secondary outlined white */}
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap mt-8">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 h-14 px-7 rounded-full text-white text-sm font-semibold transition-all shadow-lg hover:shadow-2xl hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  style={{ background: "linear-gradient(135deg, #1491D0 0%, #7BC255 100%)" }}
                >
                  Lihat Layanan <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 h-14 px-7 rounded-full border-2 border-white/80 bg-white/10 backdrop-blur-sm hover:bg-white hover:text-brand-primary text-white text-sm font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Hubungi Kami <Phone className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>

              {/* Trust micro-row */}
              <div className="flex items-center gap-5 mt-8 text-[11px] text-slate-300 font-medium">
                <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-brand-secondary" aria-hidden="true" /> Material SNI</span>
                <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-brand-primary" aria-hidden="true" /> Tim Bersertifikat</span>
                <span className="hidden sm:inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-brand-secondary" aria-hidden="true" /> Garansi Tertulis</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FLOATING INFO CARD — overlaps hero (~200px), pulled up for prominence */}
      <section className="relative z-30 px-4">
        <div className="max-w-[1100px] mx-auto bg-white rounded-[20px] shadow-2xl border border-brand-border/60 p-8 md:p-10 -mt-[200px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:divide-x divide-brand-border">
            <div className="flex items-center gap-5 pb-6 md:pb-0">
              <div className="w-12 h-12 bg-brand-primary/8 rounded-lg flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-brand-primary" aria-hidden="true" />
              </div>
              <div className="text-left">
                <h4 className="text-[11px] font-semibold text-brand-muted uppercase tracking-wider mb-1">Alamat Kantor</h4>
                <p className="text-[#0F172A] font-semibold text-sm sm:text-base">{profile.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-5 pt-6 md:pt-0 md:pl-8">
              <div className="w-12 h-12 bg-brand-secondary/8 rounded-lg flex items-center justify-center shrink-0">
                <Globe className="w-6 h-6 text-brand-secondary" aria-hidden="true" />
              </div>
              <div className="text-left">
                <h4 className="text-[11px] font-semibold text-brand-secondary uppercase tracking-wider mb-1">Area Layanan</h4>
                <p className="text-[#0F172A] font-semibold text-sm sm:text-base">{profile.serviceArea}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION - Varied grid */}
      <section className="pt-16 pb-20 max-w-[1240px] mx-auto px-4">
        <div className="mb-10 text-left">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A] leading-tight">
            Layanan Konstruksi Terbaik untuk Anda
          </h2>
          <p className="text-brand-muted text-sm leading-relaxed mt-3 max-w-lg">
            Berbagai layanan profesional dengan standar kualitas terbaik, didukung tenaga teknik sipil & arsitektural berpengalaman.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service) => (
            <Link
              key={service.id}
              href="/services"
              className="bg-white p-6 rounded-md border border-brand-border/50 hover:border-brand-primary/30 transition-colors duration-150 group flex items-start gap-4"
            >
              <div className="mt-0.5 text-brand-secondary shrink-0">
                {getServiceIcon(service.iconName)}
              </div>
              <div className="text-left">
                <h3 className="text-sm font-semibold text-brand-text mb-1.5 group-hover:text-brand-primary transition-colors">{service.title}</h3>
                <p className="text-brand-muted text-xs leading-relaxed">{service.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. STATS ROW */}
      <section className="bg-white py-10 border-y border-brand-border">
        <div className="max-w-[1240px] mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS_DATA.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="text-brand-secondary shrink-0">{getStatIcon(item.iconName)}</div>
                <div className="text-left">
                  <div className="text-xl font-bold text-brand-text tracking-tight">{item.value}</div>
                  <div className="text-[11px] font-medium text-brand-muted">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROFILE TEASER */}
      <section className="py-14 bg-brand-bg">
        <div className="max-w-[1240px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 flex flex-col items-start text-left">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A] leading-tight mb-4">
                Membangun dengan Kualitas, Mewujudkan Kepercayaan
              </h2>
              <p className="text-brand-muted text-sm leading-relaxed mb-3">
                Perusahaan jasa konstruksi nasional bergerak di bidang pembangunan sipil, renovasi, interior, aluminium, kaca, dan berbagai pekerjaan bangunan dengan komitmen kualitas premium.
              </p>
              <p className="text-brand-muted text-sm leading-relaxed mb-6">
                Didukung tenaga profesional terdidik, sistem kerja transparan, dan material bersertifikasi SNI.
              </p>
              <Link href="/about" className="inline-flex items-center gap-2 h-10 px-5 bg-brand-primary hover:bg-brand-primary-dark text-white text-sm font-semibold rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary">
                Selengkapnya <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="lg:col-span-7 overflow-hidden rounded-lg h-[340px] sm:h-[420px] relative">
              <Image src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" alt="Contemporary architecture by Bangun Ciptadana" fill className="object-cover object-center" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA RIBBON */}
      <section className="bg-brand-primary py-10 text-white">
        <div className="max-w-[1240px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0">
              <Headphones className="w-6 h-6 text-brand-primary" aria-hidden="true" />
            </div>
            <div className="text-left">
              <p className="text-base font-bold tracking-wide">Konsultasikan kebutuhan proyek Anda.</p>
              <p className="text-white/80 text-sm mt-0.5">Tim sipil & arsitek siap memberikan solusi terbaik.</p>
            </div>
          </div>
          <Link
            href="/contact"
            className="bg-[#07142B] hover:bg-[#0c1e3d] text-white px-6 h-11 rounded-md text-sm font-semibold transition-colors flex items-center gap-2 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Hubungi Sekarang <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
