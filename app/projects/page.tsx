import HeroBanner from "@/components/HeroBanner";
import ProjectFilter from "@/components/ProjectFilter";
import { readStore } from "@/data/store";
import { FolderKanban, Layers, Award } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const store = await readStore();
  const projects = store.projects;
  const categories = new Set(projects.map((p) => p.category)).size;

  return (
    <div className="flex flex-col w-full">
      <HeroBanner title="Projects" />
      <section className="py-12 bg-white border-b border-brand-border">
        <div className="max-w-[1240px] mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                <FolderKanban className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-2xl font-bold text-brand-text tracking-tight tabular-nums">{projects.length}</p>
                <p className="text-[11px] font-medium text-brand-muted uppercase tracking-wider">Total Proyek</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-brand-secondary/15 text-brand-secondary-dark flex items-center justify-center shrink-0">
                <Layers className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-2xl font-bold text-brand-text tracking-tight tabular-nums">{categories}</p>
                <p className="text-[11px] font-medium text-brand-muted uppercase tracking-wider">Kategori Layanan</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Award className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-2xl font-bold text-brand-text tracking-tight">Standar SNI</p>
                <p className="text-[11px] font-medium text-brand-muted uppercase tracking-wider">Material Bersertifikasi</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-14 bg-white">
        <div className="max-w-[1240px] mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-text mb-3">Portfolio Terbaru</h2>
          <p className="text-brand-muted text-sm leading-relaxed mb-8 max-w-lg mx-auto">
            Bukti komitmen konstruksi Bangun Ciptadana dalam mengawal pengerjaan bangunan dengan presisi tinggi.
          </p>
          <ProjectFilter projects={projects} />
        </div>
      </section>
    </div>
  );
}
