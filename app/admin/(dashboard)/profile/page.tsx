import { readStore } from "@/data/store";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ProfileEditor from "@/components/admin/ProfileEditor";

export const dynamic = "force-dynamic";

export default async function AdminProfilePage() {
  const store = await readStore();
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <AdminPageHeader
        title="Profil Perusahaan"
        description="Informasi utama tentang perusahaan. Data ini tampil di halaman About dan Hero landing page."
      />
      <ProfileEditor initial={store.profile} />
    </div>
  );
}
