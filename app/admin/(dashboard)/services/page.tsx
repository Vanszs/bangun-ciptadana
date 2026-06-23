import { readStore } from "@/data/store";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ServicesTable from "@/components/admin/ServicesTable";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const store = await readStore();
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <AdminPageHeader
        title="Layanan"
        description="Daftar layanan yang tampil di halaman utama."
      />
      <ServicesTable initial={store.services} />
    </div>
  );
}
