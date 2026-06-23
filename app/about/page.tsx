import Image from "next/image";
import HeroBanner from "@/components/HeroBanner";
import { readStore } from "@/data/store";
import { getStatIcon } from "@/components/IconMapper";
import { Award, Shield, Star, Target, Eye } from "lucide-react";

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
    <div className="flex flex-col w-full">
      <HeroBanner title="About Us" />

      {/* Profile — 7/5 split, text right */}
      <section className="py-14 bg-white">
        <div className="max-w-[1240px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 rounded-md overflow-hidden h-[360px] sm:h-[440px] relative">
              <Image src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80" alt="Modern corporate architectural facade" fill className="object-cover object-center" />
            </div>
            <div className="lg:col-span-5 text-left">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-text mb-5">{profile.name}</h2>
              <p className="text-brand-muted text-sm leading-relaxed mb-3">{profile.description}</p>
              <p className="text-brand-muted text-sm leading-relaxed">
                Hadir dengan dedikasi dan komitmen profesional berakar pada kepuasan pelanggan, kami siap menjadi partner terpercaya yang mengawal proyek Anda dengan pengawasan ketat, pelaporan berkala transparan, dan estimasi biaya seefektif mungkin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visi Misi */}
      <section className="py-12 bg-brand-bg border-y border-brand-border">
        <div className="max-w-[1240px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-lg border border-brand-border bg-white p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-9 w-9 rounded-md bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                <Eye className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-semibold text-brand-text uppercase tracking-wider">Visi</h3>
            </div>
            <p className="text-sm text-brand-muted leading-relaxed">{profile.vision}</p>
          </div>
          <div className="rounded-lg border border-brand-border bg-white p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-9 w-9 rounded-md bg-brand-secondary/10 text-brand-secondary-dark flex items-center justify-center">
                <Target className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-semibold text-brand-text uppercase tracking-wider">Misi</h3>
            </div>
            <p className="text-sm text-brand-muted leading-relaxed">{profile.mission}</p>
          </div>
        </div>
      </section>

      {/* Stats — horizontal bar, not cards */}
      <section className="py-8 bg-white border-b border-brand-border">
        <div className="max-w-[1240px] mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((item) => (
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

      {/* Values — 3-col but with dominant first */}
      <section className="py-14 bg-white">
        <div className="max-w-[1240px] mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-text mb-8">Mengapa Memilih Kami?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((val, idx) => (
              <div key={val.id} className="p-6 bg-brand-bg rounded-md border border-brand-border/50 text-left first:md:border-l-2 first:md:border-l-brand-primary">
                <div className="mb-4">{getValueIcon(idx)}</div>
                <h3 className="text-sm font-semibold text-brand-text mb-2 uppercase tracking-wide">{val.title}</h3>
                <p className="text-brand-muted text-sm leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team — 4-col, compact cards */}
      <section className="py-14 bg-brand-bg border-t border-brand-border">
        <div className="max-w-[1240px] mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-text mb-8">Tim Profesional</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {team.map((member) => (
              <div key={member.id} className="bg-white rounded-md overflow-hidden border border-brand-border/50 flex flex-col items-center">
                <div className="w-full h-40 overflow-hidden relative bg-slate-50">
                  <Image src={member.imageUrl} alt={member.name} fill className="object-cover object-top" />
                </div>
                <div className="p-4 text-center w-full">
                  <p className="font-semibold text-brand-text text-sm truncate">{member.name}</p>
                  <p className="text-[11px] font-medium text-brand-secondary uppercase tracking-wide mt-0.5">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
