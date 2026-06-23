import { readStore } from "@/data/store";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminKpiCard from "@/components/admin/AdminKpiCard";
import MessagesInbox from "@/components/admin/MessagesInbox";
import { Mail, MailOpen, Inbox } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const store = await readStore();
  const unread = store.messages.filter((m) => !m.read).length;

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <AdminPageHeader
        title="Pesan Masuk"
        description="Pesan formulir kontak dari landing page."
      />

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <AdminKpiCard icon={Inbox} label="Total Pesan" value={store.messages.length} accent="primary" />
        <AdminKpiCard icon={Mail} label="Belum Dibaca" value={unread} accent={unread > 0 ? "danger" : "primary"} />
        <AdminKpiCard icon={MailOpen} label="Sudah Dibaca" value={store.messages.length - unread} accent="secondary" />
      </div>

      <MessagesInbox initial={store.messages} />
    </div>
  );
}
