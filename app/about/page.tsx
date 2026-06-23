import HeroBanner from "@/components/HeroBanner";
import { STATS_DATA, VALUES_DATA, TEAM_DATA } from "@/data/data";
import { getStatIcon } from "@/components/IconMapper";
import { Award, Shield, Star } from "lucide-react";

function getValueIcon(index: number) {
  const cn = "w-5 h-5 text-brand-primary";
  if (index === 0) return <Award className={cn} />;
  if (index === 1) return <Shield className={cn} />;
  return <Star className={cn} />;
}

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full text-left">
      <HeroBanner title="About Us" backgroundImage="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1440&q=80" />

      <section className="py-20 bg-white">
        <div className="max-w-[1240px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 rounded-lg overflow-hidden shadow-[0_12px_32px_rgba(7,20,43,0.05)] h-[380px] sm:h-[480px] relative">
              <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80" alt="Modern corporate architectural facade" className="w-full h-full object-cover object-center select-none" referrerPolicy="no-referrer" />
            </div>
            <div className="lg:col-span-5 text-left">
              <span className="text-xs font-bold tracking-widest text-brand-primary uppercase block mb-2">Profil Perusahaan</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-text mb-6 uppercase leading-none">Bangun Ciptadana</h2>
              <p className="text-brand-muted text-xs sm:text-sm leading-relaxed mb-4">Bangun Ciptadana merupakan perusahaan jasa konstruksi nasional yang bergerak di bidang pembangunan sipil, renovasi gedung komersial maupun ruko, pengerjaan interior custom, serta pasang struktur baja ringan, aluminium, dan sekat kaca.</p>
              <p className="text-brand-muted text-xs sm:text-sm leading-relaxed">Hadir dengan dedikasi tinggi dan komitmen profesional berakar pada kepuasan pelanggan, kami siap menjadi partner terpercaya yang mengawal proyek Anda dengan pengawasan ketat, pelaporan berkala transparan, dan estimasi pemakaian biaya seefektif mungkin tanpa memangkas kualitas.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-brand-bg border-y border-brand-border/60">
        <div className="max-w-[1240px] mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS_DATA.map((item) => (
              <div key={item.id} className="bg-white p-6 sm:p-8 rounded-lg border border-brand-border/40 flex items-center gap-5 hover:border-brand-primary/20 transition-colors duration-200 shadow-sm">
                <div className="w-14 h-14 rounded-lg bg-brand-secondary/10 flex items-center justify-center shrink-0">{getStatIcon(item.iconName)}</div>
                <div className="text-left">
                  <div className="text-2xl sm:text-3xl font-extrabold text-brand-text tracking-tight">{item.value}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-brand-muted mt-0.5">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[1240px] mx-auto px-4 text-center">
          <span className="text-xs font-bold tracking-widest text-brand-secondary uppercase block mb-1">Nilai Perusahaan</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-text mb-12 uppercase">Mengapa Memilih Kami?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES_DATA.map((val, idx) => (
              <div key={val.id} className="p-8 bg-brand-bg rounded-lg border border-brand-border/40 hover:border-brand-primary/20 transition-colors duration-200 hover:shadow-md text-left">
                <div className="w-12 h-12 rounded-lg bg-brand-primary/10 flex items-center justify-center mb-6">{getValueIcon(idx)}</div>
                <h3 className="text-base font-bold text-brand-text mb-3 uppercase tracking-wide">{val.title}</h3>
                <p className="text-brand-muted text-xs sm:text-sm leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-brand-bg border-t border-brand-border/60">
        <div className="max-w-[1240px] mx-auto px-4 text-center">
          <span className="text-xs font-bold tracking-widest text-brand-primary uppercase block mb-1">Struktur Organisasi</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-text mb-12 uppercase">Tim Profesional Kami</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {TEAM_DATA.map((member) => (
              <div key={member.id} className="bg-white rounded-lg overflow-hidden border border-brand-border/40 hover:border-brand-secondary/30 transition-colors duration-200 shadow-sm hover:shadow-[0_12px_24px_rgba(7,20,43,0.06)] flex flex-col items-center">
                <div className="w-full h-48 overflow-hidden relative bg-slate-50 border-b border-brand-border/40">
                  <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover object-top select-none" referrerPolicy="no-referrer" />
                </div>
                <div className="p-5 text-center w-full">
                  <h3 className="font-bold text-brand-text text-sm sm:text-base truncate mb-1">{member.name}</h3>
                  <p className="text-[10px] sm:text-xs font-bold text-brand-secondary uppercase tracking-wider">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
