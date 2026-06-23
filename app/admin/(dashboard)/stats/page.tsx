import { readStore } from "@/data/store";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import StatsEditor from "@/components/admin/StatsEditor";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdminStatsPage() {
  const store = await readStore();
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <AdminPageHeader
        title="Statistik"
        description="Kelola data statistik perusahaan yang tampil di landing page."
        actions={<Button><Plus className="h-4 w-4" /> Tambah</Button>}
      />
      <StatsEditor initial={store.stats} />
    </div>
  );
}
