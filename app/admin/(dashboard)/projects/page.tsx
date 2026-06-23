import { readStore } from "@/data/store";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ProjectsTable from "@/components/admin/ProjectsTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const store = await readStore();
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <AdminPageHeader
        title="Proyek"
        description="Kelola portofolio proyek yang ditampilkan di halaman Projects."
        actions={
          <Button asChild>
            <Link href="/admin/projects/new"><Plus className="h-4 w-4" /> Tambah Proyek</Link>
          </Button>
        }
      />
      <ProjectsTable initial={store.projects} />
    </div>
  );
}
