import { readStore } from "@/data/store";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import TeamEditor from "@/components/admin/TeamEditor";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminTeamPage() {
  const store = await readStore();
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <AdminPageHeader
        title="Tim"
        description="Kelola anggota tim yang ditampilkan di halaman About."
        actions={<Button><Plus className="h-4 w-4" /> Tambah</Button>}
      />
      <TeamEditor initial={store.team} />
    </div>
  );
}
