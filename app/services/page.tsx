import HeroBanner from "@/components/HeroBanner";
import { readStore } from "@/data/store";
import { getServiceIcon } from "@/components/IconMapper";
import { CheckCircle2 } from "lucide-react";

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
    <div className="flex flex-col w-full">
      <HeroBanner title="Services" />

      {/* Services — 2-col layout (not 3-col again), no icon bg containers */}
      <section className="py-14 bg-white">
        <div className="max-w-[1240px] mx-auto px-4">
          <div className="mb-10 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-text mb-3">Solusi Konstruksi Terlengkap</h2>
            <p className="text-brand-muted text-sm leading-relaxed">Layanan konstruksi profesional berskala komersial maupun hunian, disesuaikan kebutuhan proyek Anda.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {services.map((service, i) => (
              <div key={service.id} className={`bg-brand-bg p-6 rounded-md border border-brand-border/50 text-left flex gap-4 ${i === 0 ? "md:col-span-2" : ""}`}>
                <div className="mt-0.5 text-brand-secondary shrink-0">{getServiceIcon(service.iconName)}</div>
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-sm font-semibold text-brand-text mb-1.5">{service.title}</h3>
                    <p className="text-brand-muted text-xs leading-relaxed mb-4">{service.description}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-brand-secondary text-[11px] font-medium tracking-wide">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" /> Profesional & Terjamin
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow — numbered steps, NOT 4-col cards → horizontal numbered list */}
      <section className="bg-white py-14 border-t border-brand-border">
        <div className="max-w-[1240px] mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-text mb-8">Proses Kerja Terstruktur</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WORKFLOW.map((wf) => (
              <div key={wf.step} className="relative pl-8">
                <span className="absolute left-0 top-0 text-2xl font-bold text-brand-primary/15 select-none">{wf.step}</span>
                <h4 className="font-semibold text-brand-text text-sm mb-1">{wf.title}</h4>
                <p className="text-brand-muted text-xs leading-relaxed">{wf.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
