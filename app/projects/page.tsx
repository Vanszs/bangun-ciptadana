import HeroBanner from "@/components/HeroBanner";
import AnimatedSection from "@/components/AnimatedSection";
import ProjectFilter from "@/components/ProjectFilter";
import { readStore } from "@/data/store";
import { FolderKanban, Layers, Award } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const store = await readStore();
  const projects = store.projects;
  const categories = new Set(projects.map((p) => p.category)).size;

  return (
    <div className="flex flex-col w-full bg-brand-bg">
      <HeroBanner title="Proyek" titleItalic="Kami" />

      {/* Stats bar */}
      <section className="py-16 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="w-full h-[1px] bg-brand-border mb-12" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <AnimatedSection className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                <FolderKanban className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-2xl font-bold text-brand-text tracking-tight tabular-nums">{projects.length}</p>
                <p className="text-[11px] font-semibold text-brand-muted uppercase tracking-wider">Total Proyek</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1} className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-brand-secondary/10 text-brand-secondary-dark flex items-center justify-center shrink-0">
                <Layers className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-2xl font-bold text-brand-text tracking-tight tabular-nums">{categories}</p>
                <p className="text-[11px] font-semibold text-brand-muted uppercase tracking-wider">Kategori Layanan</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Award className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-2xl font-bold text-brand-text tracking-tight">Standar SNI</p>
                <p className="text-[11px] font-semibold text-brand-muted uppercase tracking-wider">Material Bersertifikasi</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="pb-16 md:pb-24 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <AnimatedSection className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-brand-primary" />
              <span className="font-sans font-bold text-sm text-brand-text tracking-wider uppercase">Portfolio</span>
            </div>
            <h2 className="flex flex-col text-brand-text leading-none">
              <span className="font-sans font-extrabold text-4xl sm:text-5xl tracking-tight uppercase">Hasil</span>
              <span className="font-serif italic text-4xl sm:text-5xl text-brand-muted mt-1">Kerja Nyata</span>
            </h2>
            <p className="text-brand-muted text-sm leading-relaxed mt-5 max-w-lg mx-auto">
              Bukti komitmen konstruksi Bangun Ciptadana dalam mengawal pengerjaan bangunan dengan presisi tinggi.
            </p>
          </AnimatedSection>

          <ProjectFilter projects={projects} />
        </div>
      </section>
    </div>
  );
}
