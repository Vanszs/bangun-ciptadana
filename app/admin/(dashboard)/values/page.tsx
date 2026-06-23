import { readStore } from "@/data/store";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ValuesEditor from "@/components/admin/ValuesEditor";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminValuesPage() {
  const store = await readStore();
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <AdminPageHeader
        title="Nilai Perusahaan"
        description="Kelola nilai inti perusahaan yang ditampilkan di halaman About."
        actions={<Button><Plus className="h-4 w-4" /> Tambah</Button>}
      />
      <ValuesEditor initial={store.values} />
    </div>
  );
}
