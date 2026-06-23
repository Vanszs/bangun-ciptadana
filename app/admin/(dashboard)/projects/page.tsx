import { readStore } from "@/data/store";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ProjectsTable from "@/components/admin/ProjectsTable";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const store = await readStore();
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <AdminPageHeader
        title="Proyek"
        description="Portofolio proyek yang tampil di halaman Projects."
      />
      <ProjectsTable initial={store.projects} />
    </div>
  );
}
