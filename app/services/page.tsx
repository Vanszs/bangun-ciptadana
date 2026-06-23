import HeroBanner from "@/components/HeroBanner";
import { SERVICES_DATA } from "@/data/data";
import { getServiceIcon } from "@/components/IconMapper";
import { CheckCircle2 } from "lucide-react";

const WORKFLOW = [
  { step: "01", title: "Konsultasi & Survey", desc: "Kami melakukan analisis kebutuhan awal dan peninjauan langsung area lokasi proyek secara gratis." },
  { step: "02", title: "Estimasi Biaya & RAB", desc: "Penyusunan Rencana Anggaran Biaya (RAB) terperinci dan transparan dengan mengajukan material terbaik." },
  { step: "03", title: "Pengerjaan & Kontrak", desc: "Penyusunan kesepakatan tertulis dan pelaksanaan konstruksi yang diawasi oleh site engineer ahli." },
  { step: "04", title: "Serah Terima & Garansi", desc: "Proses pemeriksaan hasil akhir bersama klien dilanjutkan serah terima kunci serta garansi pemeliharaan tertulis." },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col w-full text-left">
      <HeroBanner title="Services" backgroundImage="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1440&q=80" />

      <section className="py-20 bg-white">
        <div className="max-w-[1240px] mx-auto px-4 text-center">
          <div className="mb-14 max-w-2xl mx-auto">
            <span className="text-xs font-bold tracking-widest text-brand-secondary uppercase block mb-2">Layanan Kami</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-text mb-4 uppercase">Solusi Konstruksi Terlengkap</h2>
            <p className="text-brand-muted text-xs sm:text-sm leading-relaxed">Kami berkomitmen menyediakan berbagai layanan konstruksi profesional berskala komersial maupun hunian yang dapat disesuaikan dengan kebutuhan proyek Anda.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES_DATA.map((service) => (
              <div key={service.id} className="bg-brand-bg p-8 rounded-lg border border-brand-border/30 text-left hover:border-brand-primary/20 transition-colors duration-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-white border border-brand-border/40 mb-6 shadow-sm">{getServiceIcon(service.iconName)}</div>
                  <h3 className="text-lg font-bold text-brand-text mb-2.5 tracking-wide">{service.title}</h3>
                  <p className="text-brand-muted text-xs sm:text-sm leading-relaxed mb-6">{service.description}</p>
                </div>
                <div className="flex items-center gap-2 pt-4 border-t border-brand-border/60 text-brand-secondary text-[10px] font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 shrink-0" /> Pekerjaan Profesional & Terjamin
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-bg py-20 border-t border-brand-border/60">
        <div className="max-w-[1240px] mx-auto px-4 text-center">
          <span className="text-xs font-bold tracking-widest text-brand-primary uppercase block mb-1">Cara Kerja Kami</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-text mb-12 uppercase">Proses Kerja Terstruktur & Transparan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {WORKFLOW.map((wf) => (
              <div key={wf.step} className="bg-white p-6 rounded-lg border border-brand-border/40 text-left relative hover:border-brand-secondary/30 transition-colors duration-200 shadow-sm">
                <div className="text-3xl font-black text-brand-primary/10 tracking-tight mb-3 select-none">{wf.step}</div>
                <h4 className="font-bold text-brand-text text-sm sm:text-base uppercase mb-2 tracking-wide">{wf.title}</h4>
                <p className="text-brand-muted text-xs leading-relaxed">{wf.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
