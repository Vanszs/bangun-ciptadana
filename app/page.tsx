import Link from "next/link";
import Image from "next/image";
import { readStore } from "@/data/store";
import { getServiceIcon } from "@/components/IconMapper";
import { MapPin, ArrowRight, ArrowUpRight, Phone } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const store = await readStore();
  const SERVICES_DATA = store.services;
  const STATS_DATA = store.stats;
  const PROJECTS_DATA = store.projects.slice(0, 3);
  const profile = store.profile;

  return (
    <div className="flex flex-col w-full bg-brand-bg space-y-20 pb-24">

      {/* 1. HERO — rounded card with brand deep navy backdrop, logo blue & green accents */}
      <section className="px-4 md:px-6 lg:px-8 pt-6">
        <div className="relative min-h-[560px] lg:min-h-[660px] rounded-[2.5rem] overflow-hidden flex flex-col justify-between p-8 lg:p-14 bg-[#0F1E36]">
          {/* BG image */}
          <Image
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1920&q=80"
            alt="Gedung komersial modern"
            fill
            priority
            sizes="100vw"
            unoptimized
            className="object-cover object-center opacity-40"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F1E36]/65 via-[#0F1E36]/45 to-[#0F1E36]/90 z-0" />

          {/* Top row */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <p className="text-white/75 text-xs lg:text-sm max-w-sm font-light leading-relaxed tracking-wide">
              {profile.tagline} — konstruksi sipil, renovasi, interior, aluminium &amp; kaca di seluruh Indonesia.
            </p>
            <div className="hidden md:flex justify-end">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-brand-primary/10 border border-brand-primary/25 backdrop-blur-md rounded-full text-[11px] font-semibold tracking-widest uppercase text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary animate-pulse" />
                Est. {profile.establishedYear}
              </span>
            </div>
          </div>

          {/* Main headline */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mt-20 lg:mt-32">
            <div className="lg:col-span-8 space-y-2">
              <h1 className="leading-none flex flex-col text-white">
                <span className="font-bold uppercase tracking-tight text-5xl md:text-7xl lg:text-8xl">
                  Bangun
                </span>
                <span className="font-light italic tracking-wide text-5xl md:text-7xl lg:text-8xl mt-1 text-white/95">
                  Ciptadana
                </span>
              </h1>

              <div className="pt-6 flex items-center gap-3 flex-wrap">
                <Link
                  href="/services"
                  className="group inline-flex items-center gap-2 bg-brand-secondary hover:bg-brand-secondary-dark text-white px-6 py-3 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 shadow-md shadow-brand-secondary/20"
                >
                  Lihat Layanan
                  <span className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-white/30 text-white hover:bg-white/10 px-6 py-3 rounded-full text-xs font-semibold tracking-wide transition-all duration-300"
                >
                  <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                  Hubungi Kami
                </Link>
              </div>
            </div>

            {/* Right trust block */}
            <div className="lg:col-span-4 lg:text-right text-left space-y-3 lg:border-l lg:border-white/10 lg:pl-6 pb-2">
              <span className="text-brand-secondary uppercase tracking-widest text-[10px] font-bold block">
                Kenapa Kami
              </span>
              <h3 className="font-semibold text-base lg:text-lg text-white">
                Konstruksi berkualitas,<br />tepat waktu
              </h3>
              <p className="text-white/60 text-xs font-light leading-relaxed max-w-xs lg:ml-auto">
                Tim teknik sipil &amp; arsitek bersertifikat, material SNI, sistem kerja transparan, garansi tertulis.
              </p>
            </div>
          </div>

          {/* Scroll indicator dots */}
          <div className="relative z-10 flex justify-center gap-2 mt-8">
            <span className="w-2 h-2 rounded-full bg-brand-secondary block" />
            <span className="w-2 h-2 rounded-full bg-white/30 block" />
            <span className="w-2 h-2 rounded-full bg-white/30 block" />
          </div>
        </div>
      </section>

      {/* 2. ABOUT BRIEF — editorial blurb using logo colors */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-brand-primary flex-shrink-0" />
          <h2 className="font-semibold text-sm tracking-widest uppercase text-brand-text/80">
            Tentang Kami
          </h2>
        </div>
        <div className="lg:col-span-8">
          <p className="font-light text-2xl md:text-3xl lg:text-4xl text-brand-text leading-snug tracking-tight">
            {profile.description}
          </p>
          <Link
            href="/about"
            className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-primary hover:text-brand-primary-dark hover:underline transition-colors"
          >
            Selengkapnya <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* 3. STATS ROW */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="bg-white border border-brand-border rounded-2xl p-8 grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-brand-border">
          {STATS_DATA.map((item) => (
            <div key={item.id} className="flex flex-col items-start pl-6 first:pl-0">
              <div className="text-3xl font-bold text-brand-text tracking-tight">{item.value}</div>
              <div className="text-xs font-semibold text-brand-muted mt-1 uppercase tracking-wider">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. RECENT PROJECTS */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-brand-border">
          <div>
            <h2 className="flex flex-col text-brand-text leading-none">
              <span className="font-bold uppercase tracking-tight text-4xl lg:text-5xl">
                Proyek
              </span>
              <span className="font-light italic tracking-wide text-4xl lg:text-5xl mt-1 text-brand-muted">
                Terbaru
              </span>
            </h2>
          </div>
          <div className="max-w-md space-y-4">
            <p className="text-brand-muted text-xs md:text-sm font-light leading-relaxed">
              Hasil kerja nyata dari berbagai proyek konstruksi, renovasi, dan interior yang kami kerjakan di seluruh Indonesia.
            </p>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white px-6 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all shadow-md shadow-brand-primary/10"
            >
              Lihat Semua
              <span className="w-5 h-5 rounded-full bg-white text-brand-primary flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROJECTS_DATA.map((project, idx) => (
            <Link
              key={project.id}
              href="/projects"
              className="group cursor-pointer space-y-4"
            >
              <div className="relative overflow-hidden rounded-[2rem] aspect-[4/3] bg-brand-bg border border-brand-border">
                {project.imageUrl ? (
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 flex items-center justify-center">
                    <span className="font-mono text-brand-primary/30 text-4xl font-bold">0{idx + 1}</span>
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-brand-primary/90 backdrop-blur-sm text-white text-[10px] uppercase font-mono tracking-widest px-3 py-1 rounded-full">
                  0{idx + 1} / Konstruksi
                </div>
              </div>
              <div className="space-y-1.5 px-2">
                {project.category && (
                  <div className="flex items-center gap-1.5 text-xs text-brand-secondary font-semibold uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5" />
                    {project.category}
                  </div>
                )}
                <h3 className="font-semibold text-lg text-brand-text group-hover:text-brand-primary transition-colors">
                  {project.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. SERVICES — deep navy panel with brand secondary green list highlights */}
      <section className="px-4 md:px-6 lg:px-8">
        <div className="relative min-h-[480px] rounded-[2.5rem] overflow-hidden flex flex-col justify-between p-8 lg:p-14 bg-[#0F1E36]">
          {/* subtle grid overlay */}
          <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:32px_32px]" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center my-auto">
            {/* Title column */}
            <div className="space-y-6">
              <h2 className="flex flex-col text-white leading-none">
                <span className="font-bold uppercase tracking-tight text-4xl lg:text-5xl">
                  Layanan
                </span>
                <span className="font-light italic tracking-wide text-4xl lg:text-5xl mt-1 text-white/80">
                  Profesional
                </span>
              </h2>
              <p className="text-white/55 text-sm font-light max-w-sm leading-relaxed">
                Berbagai layanan konstruksi profesional dengan standar kualitas premium, didukung tenaga teknik sipil &amp; arsitektural berpengalaman.
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 bg-brand-secondary hover:bg-brand-secondary-dark text-white px-6 py-3 rounded-full text-xs font-semibold tracking-wide transition-all shadow-md shadow-brand-secondary/20"
              >
                Konsultasi Gratis
                <span className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            </div>

            {/* Service list */}
            <div className="bg-white/8 backdrop-blur-sm rounded-2xl p-6 lg:p-8 divide-y divide-white/10 border border-white/10">
              {SERVICES_DATA.map((service) => (
                <div
                  key={service.id}
                  className="group py-4 flex items-center justify-between first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-brand-secondary w-4 h-4 shrink-0">
                      {getServiceIcon(service.iconName)}
                    </span>
                    <h3 className="font-medium text-base text-white group-hover:text-brand-secondary transition-colors">
                      {service.title}
                    </h3>
                  </div>
                  <Link
                    href="/services"
                    className="w-8 h-8 rounded-full border border-white/20 group-hover:border-brand-secondary group-hover:bg-brand-secondary group-hover:text-white flex items-center justify-center text-white transition-all"
                    aria-label={`Detail ${service.title}`}
                  >
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA RIBBON */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="bg-brand-primary rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-brand-primary/10">
          <div className="text-white space-y-1 text-center md:text-left">
            <p className="text-xl font-bold tracking-tight">Konsultasikan kebutuhan proyek Anda.</p>
            <p className="text-white/75 text-sm font-light">Tim sipil &amp; arsitek siap memberikan solusi terbaik.</p>
          </div>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 bg-white text-brand-primary hover:bg-[#F8FAFC] px-7 py-3.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap shadow-md shadow-brand-primary/10"
          >
            Hubungi Sekarang
            <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" aria-hidden="true" />
          </Link>
        </div>
      </section>

    </div>
  );
}
