import HeroBanner from "@/components/HeroBanner";
import AnimatedSection from "@/components/AnimatedSection";
import { readStore } from "@/data/store";
import { getServiceIcon } from "@/components/IconMapper";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

const WORKFLOW = [
  { step: "01", title: "Konsultasi & Survey", desc: "Analisis kebutuhan awal dan peninjauan langsung area lokasi proyek." },
  { step: "02", title: "Estimasi Biaya & RAB", desc: "Penyusunan Rencana Anggaran Biaya terperinci dan transparan." },
  { step: "03", title: "Pengerjaan & Kontrak", desc: "Kesepakatan tertulis dan pelaksanaan konstruksi diawasi site engineer ahli." },
  { step: "04", title: "Serah Terima & Garansi", desc: "Pemeriksaan hasil akhir, serah terima, dan garansi pemeliharaan tertulis." },
];

export default async function ServicesPage() {
  const store = await readStore();
  const services = store.services;

  return (
    <div className="flex flex-col w-full bg-brand-bg">
      <HeroBanner title="Layanan" titleItalic="Kami" />

      {/* Intro */}
      <section className="py-16 md:py-24 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <AnimatedSection direction="left" className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-brand-primary" />
              <span className="font-sans font-bold text-sm text-brand-text tracking-wider uppercase">Solusi Konstruksi</span>
            </div>
            <h2 className="flex flex-col text-brand-text leading-none">
              <span className="font-sans font-extrabold text-4xl sm:text-5xl tracking-tight uppercase">Layanan</span>
              <span className="font-serif italic text-4xl sm:text-5xl text-brand-muted mt-1">Terlengkap</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="lg:col-span-8">
            <p className="font-sans font-medium text-xl md:text-2xl text-brand-text leading-snug tracking-tight max-w-2xl">
              Layanan konstruksi profesional berskala komersial maupun hunian, disesuaikan kebutuhan proyek Anda dari fondasi hingga finishing.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services grid */}
      <section className="pb-16 md:pb-24 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="w-full h-[1px] bg-brand-border mb-16" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {services.map((service, index) => (
              <AnimatedSection
                key={service.id}
                delay={index * 0.05}
                className="group p-6 md:p-8 border-b md:border-r border-brand-border first:border-t md:first:border-t hover:bg-white transition-colors duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <span className="text-brand-secondary w-5 h-5 shrink-0 mt-0.5">
                      {getServiceIcon(service.iconName)}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-brand-text mb-2 group-hover:text-brand-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-brand-muted text-sm leading-relaxed max-w-md">{service.description}</p>
                    </div>
                  </div>
                  <Link
                    href="/contact"
                    className="w-8 h-8 rounded-full border border-brand-border group-hover:border-brand-primary group-hover:bg-brand-primary group-hover:text-white flex items-center justify-center text-brand-muted transition-all shrink-0"
                    aria-label={`Konsultasi ${service.title}`}
                  >
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-16 md:py-24 bg-white border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <AnimatedSection className="mb-12">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-brand-primary" />
              <span className="font-sans font-bold text-sm text-brand-text tracking-wider uppercase">Cara Kerja</span>
            </div>
            <h2 className="flex flex-col text-brand-text leading-none">
              <span className="font-sans font-extrabold text-4xl sm:text-5xl tracking-tight uppercase">Proses</span>
              <span className="font-serif italic text-4xl sm:text-5xl text-brand-muted mt-1">Terstruktur</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {WORKFLOW.map((wf, idx) => (
              <AnimatedSection key={wf.step} delay={idx * 0.15} className="relative pl-8 md:pl-10">
                <span className="absolute left-0 top-0 text-4xl md:text-5xl font-serif italic font-light text-brand-border select-none">
                  {wf.step}
                </span>
                <h4 className="font-semibold text-brand-text text-base mb-2 pt-2">{wf.title}</h4>
                <p className="text-slate-700 text-sm leading-relaxed">{wf.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
