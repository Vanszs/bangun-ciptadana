import Image from "next/image";
import HeroBanner from "@/components/HeroBanner";
import AnimatedSection from "@/components/AnimatedSection";
import { readStore } from "@/data/store";
import { getStatIcon } from "@/components/IconMapper";
import { Award, Shield, Star, Eye, Target } from "lucide-react";

function getValueIcon(index: number) {
  const cn = "w-5 h-5 text-brand-primary";
  if (index === 0) return <Award className={cn} aria-hidden="true" />;
  if (index === 1) return <Shield className={cn} aria-hidden="true" />;
  return <Star className={cn} aria-hidden="true" />;
}

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const store = await readStore();
  const { values, team, stats, profile } = store;

  return (
    <div className="flex flex-col w-full bg-brand-bg">
      <HeroBanner title="Tentang" titleItalic="Kami" />

      {/* Profile — manifesto style */}
      <section className="py-16 md:py-24 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <AnimatedSection className="lg:col-span-7 rounded-2xl overflow-hidden h-[360px] sm:h-[440px] relative">
            <Image
              src="/images/dnoin/project_1_1782401315964.jpg"
              alt="Bangun Ciptadana project"
              fill
              className="object-cover object-center"
              unoptimized
            />
          </AnimatedSection>

          <AnimatedSection delay={0.15} className="lg:col-span-5 text-left">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-brand-primary" />
              <span className="font-sans font-bold text-sm text-brand-text tracking-wider uppercase">
                Profil Perusahaan
              </span>
            </div>
            <h2 className="font-serif italic text-3xl md:text-4xl text-brand-text mb-5 leading-tight">
              {profile.name}
            </h2>
            <p className="text-brand-muted text-sm leading-relaxed mb-4">{profile.description}</p>
            <p className="text-brand-muted text-sm leading-relaxed">
              Hadir dengan dedikasi dan komitmen profesional, kami siap menjadi partner terpercaya yang mengawal proyek Anda dengan pengawasan ketat, pelaporan berkala transparan, dan estimasi biaya seefektif mungkin.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Visi Misi */}
      <section className="py-16 md:py-24 bg-white border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatedSection className="bg-brand-bg rounded-2xl p-8 md:p-10 border border-brand-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                <Eye className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-brand-text uppercase tracking-widest">Visi</h3>
            </div>
            <p className="text-brand-text text-lg md:text-xl font-medium leading-snug">{profile.vision}</p>
          </AnimatedSection>

          <AnimatedSection delay={0.15} className="bg-brand-bg rounded-2xl p-8 md:p-10 border border-brand-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-brand-secondary/10 text-brand-secondary-dark flex items-center justify-center">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-brand-text uppercase tracking-widest">Misi</h3>
            </div>
            <p className="text-brand-text text-lg md:text-xl font-medium leading-snug">{profile.mission}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="w-full h-[1px] bg-brand-border mb-12" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="text-brand-secondary shrink-0">{getStatIcon(item.iconName)}</div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-brand-text tracking-tight">{item.value}</div>
                  <div className="text-[11px] font-semibold text-brand-muted uppercase tracking-wider">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <AnimatedSection className="mb-12">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-brand-primary" />
              <span className="font-sans font-bold text-sm text-brand-text tracking-wider uppercase">Nilai Kami</span>
            </div>
            <h2 className="flex flex-col text-brand-text leading-none">
              <span className="font-sans font-extrabold text-4xl sm:text-5xl tracking-tight uppercase">Mengapa</span>
              <span className="font-serif italic text-4xl sm:text-5xl text-brand-muted mt-1">Memilih Kami?</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, idx) => (
              <AnimatedSection key={val.id} delay={idx * 0.15} className="p-6 bg-brand-bg rounded-2xl border border-brand-border/50 text-left">
                <div className="mb-4">{getValueIcon(idx)}</div>
                <h3 className="text-lg font-semibold text-brand-text mb-2 tracking-tight">{val.title}</h3>
                <p className="text-brand-muted text-sm leading-relaxed">{val.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24 bg-brand-bg border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <AnimatedSection className="mb-12">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-brand-primary" />
              <span className="font-sans font-bold text-sm text-brand-text tracking-wider uppercase">Tim Kami</span>
            </div>
            <h2 className="flex flex-col text-brand-text leading-none">
              <span className="font-sans font-extrabold text-4xl sm:text-5xl tracking-tight uppercase">Profesional</span>
              <span className="font-serif italic text-4xl sm:text-5xl text-brand-muted mt-1">Bersertifikat</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {team.map((member, idx) => (
              <AnimatedSection key={member.id} delay={idx * 0.1} className="group relative bg-white rounded-2xl overflow-hidden border border-brand-border/50 flex flex-col">
                <div className="w-full h-44 overflow-hidden relative bg-slate-50">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                </div>
                <div className="p-4 text-center w-full">
                  <p className="font-semibold text-brand-text text-sm truncate">{member.name}</p>
                  <p className="text-[11px] font-medium text-brand-secondary uppercase tracking-wide mt-0.5">{member.position}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
