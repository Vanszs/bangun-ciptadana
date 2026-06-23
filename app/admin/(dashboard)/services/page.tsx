import { readStore } from "@/data/store";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ServicesTable from "@/components/admin/ServicesTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const store = await readStore();
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <AdminPageHeader
        title="Layanan"
        description="Kelola daftar layanan yang ditampilkan di landing page."
        actions={
          <Button asChild>
            <Link href="/admin/services/new"><Plus className="h-4 w-4" /> Tambah Layanan</Link>
          </Button>
        }
      />
      <ServicesTable initial={store.services} />
    </div>
  );
}
