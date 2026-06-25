import Link from "next/link";
import Image from "next/image";
import { readStore } from "@/data/store";
import { getServiceIcon } from "@/components/IconMapper";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import HomeHero from "@/components/HomeHero";
import AnimatedSection from "@/components/AnimatedSection";

export const dynamic = "force-dynamic";

const DN_PROJECT_IMAGES = [
  "/images/dnoin/project_1_1782401315964.jpg",
  "/images/dnoin/project_2_1782401340614.jpg",
  "/images/dnoin/project_3_1782401358964.jpg",
];

export default async function HomePage() {
  const store = await readStore();
  const SERVICES_DATA = store.services;
  const STATS_DATA = store.stats;
  const PROJECTS_DATA = store.projects.slice(0, 3).map((p, i) => ({
    ...p,
    imageUrl: DN_PROJECT_IMAGES[i] || p.imageUrl,
  }));
  const profile = store.profile;

  return (
    <div className="flex flex-col w-full bg-brand-bg">
      {/* 1. HERO — fullscreen DNOIN carousel */}
      <HomeHero />

      {/* 2. ABOUT — label + manifesto */}
      <section className="bg-brand-bg w-full py-16 md:py-24 overflow-hidden" id="about-us-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <AnimatedSection direction="left" className="md:col-span-3 flex items-start pt-1 md:pt-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-primary" />
              <span className="font-sans font-bold text-sm text-brand-text tracking-wider uppercase">
                Tentang Kami
              </span>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="md:col-span-9">
            <p className="font-sans font-medium text-2xl sm:text-3xl md:text-[32px] lg:text-[40px] text-brand-text leading-snug tracking-tight text-left">
              {profile.description}
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-primary hover:text-brand-primary-dark hover:underline transition-colors"
            >
              Selengkapnya <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* 3. STATS ROW */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 w-full pb-16 md:pb-24">
        <div className="w-full h-[1px] bg-brand-border mb-12" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS_DATA.map((item) => (
            <div key={item.id} className="flex flex-col items-start">
              <div className="text-3xl md:text-4xl font-bold text-brand-text tracking-tight font-sans">{item.value}</div>
              <div className="text-xs font-semibold text-brand-muted mt-1 uppercase tracking-wider">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. RECENT PROJECTS — DNOIN card style */}
      <section className="bg-brand-bg w-full pb-24 pt-4 overflow-hidden" id="recent-projects-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Separator */}
          <div className="w-full h-[1px] bg-brand-border mb-16" />

          {/* Header row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
            <div className="lg:col-span-4">
              <h2 className="flex flex-col text-left text-brand-text leading-none">
                <span className="font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-none uppercase">
                  Proyek
                </span>
                <span className="font-serif italic font-normal text-4xl sm:text-5xl md:text-6xl leading-tight mt-1 text-brand-muted">
                  Terbaru
                </span>
              </h2>
            </div>

            <div className="lg:col-span-5">
              <p className="font-sans text-xs sm:text-sm text-brand-muted leading-relaxed max-w-md text-left">
                Hasil kerja nyata dari berbagai proyek konstruksi, renovasi, dan interior yang kami kerjakan dengan standar kualitas premium.
              </p>
            </div>

            <div className="lg:col-span-3 flex lg:justify-end justify-start">
              <Link
                href="/projects"
                className="group flex items-center gap-4 pl-6 pr-1.5 py-1.5 rounded-full border border-zinc-950 hover:bg-zinc-950 hover:text-white text-zinc-950 font-sans text-sm font-medium transition-all duration-300"
              >
                <span>Lihat Semua</span>
                <span className="w-7 h-7 rounded-full bg-zinc-950 text-white flex items-center justify-center shadow-sm group-hover:bg-white group-hover:text-zinc-950 transition-colors duration-300">
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </span>
              </Link>
            </div>
          </div>

          {/* Project cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROJECTS_DATA.map((project, index) => (
              <AnimatedSection key={project.id} delay={index * 0.2} className="group relative flex flex-col overflow-hidden bg-zinc-100 rounded-2xl shadow-sm cursor-pointer">
                <Link href="/projects" className="relative w-full aspect-[3/4] overflow-hidden block">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    unoptimized
                  />

                  {/* Custom top-left SVG mask */}
                  <div className="absolute top-0 left-0 w-[140px] h-[30px] text-brand-bg select-none pointer-events-none">
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 140 30"
                      fill="currentColor"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path d="M 0 0 L 0 30 C 50 30, 80 0, 140 0 Z" />
                    </svg>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Floating caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-zinc-300 uppercase mb-1">
                      <MapPin className="w-3 h-3" />
                      {project.category}
                    </div>
                    <h4 className="font-sans font-bold text-white text-lg tracking-tight leading-snug">
                      {project.title}
                    </h4>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SERVICES — deep panel */}
      <section className="px-4 md:px-6 lg:px-8 pb-24">
        <div className="relative min-h-[480px] rounded-[2.5rem] overflow-hidden flex flex-col justify-between p-8 lg:p-14 bg-brand-text">
          {/* subtle grid overlay */}
          <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:32px_32px]" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center my-auto">
            <div className="space-y-6">
              <h2 className="flex flex-col text-white leading-none">
                <span className="font-sans font-bold uppercase tracking-tight text-4xl lg:text-5xl">
                  Layanan
                </span>
                <span className="font-serif italic tracking-wide text-4xl lg:text-5xl mt-1 text-white/80">
                  Profesional
                </span>
              </h2>
              <p className="text-white/55 text-sm font-light max-w-sm leading-relaxed">
                Berbagai layanan konstruksi profesional dengan standar kualitas premium, didukung tenaga teknik sipil & arsitektural berpengalaman.
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

            <div className="bg-white/8 backdrop-blur-sm rounded-2xl p-6 lg:p-8 divide-y divide-white/10 border border-white/10">
              {SERVICES_DATA.slice(0, 6).map((service) => (
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
      <section className="max-w-7xl mx-auto px-6 md:px-12 w-full pb-24">
        <div className="bg-brand-primary rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-brand-primary/10">
          <div className="text-white space-y-1 text-center md:text-left">
            <p className="text-xl font-bold tracking-tight">Konsultasikan kebutuhan proyek Anda.</p>
            <p className="text-white/75 text-sm font-light">Tim sipil & arsitek siap memberikan solusi terbaik.</p>
          </div>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 bg-white text-brand-primary hover:bg-brand-surface-soft px-7 py-3.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap shadow-md shadow-brand-primary/10"
          >
            Hubungi Sekarang
            <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
