import Link from "next/link";
import Image from "next/image";
import { SERVICES_DATA, STATS_DATA } from "@/data/data";
import { getServiceIcon, getStatIcon } from "@/components/IconMapper";
import { MapPin, Globe, ArrowRight, Phone, Headphones } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero — left-aligned, ONE dominant CTA + text-link secondary */}
      <section className="relative overflow-hidden min-h-[560px] lg:min-h-[680px] flex items-center bg-[#050F1E]">
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80"
          alt="Bangun Ciptadana headquarter"
          fill
          className="object-cover object-center select-none"
          priority
        />
        <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(90deg, rgba(5,15,40,0.88), rgba(5,15,40,0.5), rgba(5,15,40,0.12))" }} />
        <div className="max-w-[1240px] mx-auto px-4 md:px-6 w-full relative z-20 py-20 lg:py-28">
          <div className="max-w-lg text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-white mb-3 uppercase">
              Bangun Ciptadana
            </h1>
            <p className="text-lg sm:text-xl font-semibold text-brand-secondary mb-6 uppercase tracking-wide leading-snug">
              Your Real Partner
            </p>
            <p className="text-white/85 text-sm leading-relaxed mb-8 max-w-md">
              Solusi konstruksi profesional untuk bangunan komersial, residensial, renovasi, interior, aluminium, kaca, dan pekerjaan sipil.
            </p>
            <div className="flex items-center gap-5 flex-wrap">
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 h-11 px-6 bg-brand-primary hover:bg-brand-primary-dark text-white text-sm font-semibold rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Lihat Layanan <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link href="/contact" className="text-sm text-white/80 hover:text-white font-medium transition-colors underline underline-offset-4 decoration-white/40 hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded">
                Hubungi Kami <Phone className="w-3.5 h-3.5 inline" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Overlap info card — addresses immediately */}
      <section className="relative z-30 -mt-8 px-4">
        <div className="max-w-[1240px] mx-auto bg-white rounded-lg border border-brand-border p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 md:divide-x divide-brand-border">
            <div className="flex items-center gap-4 pb-4 md:pb-0">
              <div className="w-11 h-11 bg-brand-primary/8 rounded-md flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-brand-primary" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-brand-muted uppercase tracking-wide mb-0.5">Alamat Kantor</p>
                <p className="text-brand-text font-semibold text-sm">Jl. XXXXXXXX No. XX, Kota XXXXX</p>
              </div>
            </div>
            <div className="flex items-center gap-4 pt-4 md:pt-0 md:pl-8">
              <div className="w-11 h-11 bg-brand-secondary/8 rounded-md flex items-center justify-center shrink-0">
                <Globe className="w-5 h-5 text-brand-secondary" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-brand-secondary uppercase tracking-wide mb-0.5">Area Layanan</p>
                <p className="text-brand-text font-semibold text-sm">Melayani proyek konstruksi dan renovasi di seluruh Indonesia.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services — varied grid (dominant first card), NO border-l accent, NO icon bg containers */}
      <section className="pt-16 pb-20 max-w-[1240px] mx-auto px-4">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-text leading-tight">
            Layanan Konstruksi Terbaik untuk Anda
          </h2>
          <p className="text-brand-muted text-sm leading-relaxed mt-3 max-w-lg">
            Berbagai layanan profesional dengan standar kualitas terbaik, didukung tenaga teknik sipil & arsitektural berpengalaman.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service, i) => (
            <Link
              key={service.id}
              href="/services"
              className={`bg-white p-6 rounded-md border border-brand-border/50 hover:border-brand-primary/30 transition-colors duration-150 cursor-pointer group flex items-start gap-4 ${i === 0 ? "lg:col-span-2 lg:row-span-1" : ""}`}
            >
              <div className="mt-0.5 text-brand-secondary shrink-0">
                {getServiceIcon(service.iconName)}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-brand-text mb-1.5 group-hover:text-brand-primary transition-colors">{service.title}</h3>
                <p className="text-brand-muted text-xs leading-relaxed">{service.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats bar — compact inline, not cards */}
      <section className="bg-white py-10 border-y border-brand-border">
        <div className="max-w-[1240px] mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS_DATA.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="text-brand-secondary shrink-0">{getStatIcon(item.iconName)}</div>
                <div>
                  <div className="text-xl font-bold text-brand-text tracking-tight">{item.value}</div>
                  <div className="text-[11px] font-medium text-brand-muted">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Profile teaser — asymmetric (text 5 / image 7), different rhythm */}
      <section className="py-14 bg-brand-bg">
        <div className="max-w-[1240px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 flex flex-col items-start">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-text leading-tight mb-4">
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

      {/* CTA ribbon — ONE gradient budgeted, solid dark CTA */}
      <section className="bg-brand-primary py-10 text-white">
        <div className="max-w-[1240px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0">
              <Headphones className="w-6 h-6 text-brand-primary" aria-hidden="true" />
            </div>
            <div>
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
