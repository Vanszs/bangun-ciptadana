import HeroBanner from "@/components/HeroBanner";
import ProjectFilter from "@/components/ProjectFilter";
import { readStore } from "@/data/store";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const store = await readStore();
  return (
    <div className="flex flex-col w-full">
      <HeroBanner title="Projects" />
      <section className="py-14 bg-white">
        <div className="max-w-[1240px] mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-text mb-3">Portfolio Terbaru</h2>
          <p className="text-brand-muted text-sm leading-relaxed mb-8 max-w-lg mx-auto">
            Bukti komitmen konstruksi Bangun Ciptadana dalam mengawal pengerjaan bangunan dengan presisi tinggi.
          </p>
          <ProjectFilter projects={store.projects} />
        </div>
      </section>
    </div>
  );
}
