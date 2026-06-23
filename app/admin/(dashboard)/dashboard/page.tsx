import { readStore } from "@/data/store";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminKpiCard from "@/components/admin/AdminKpiCard";
import Link from "next/link";
import Image from "next/image";
import { Briefcase, FolderKanban, Users, MessageSquare, ArrowUpRight, Mail, Phone, Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const store = await readStore();
  const unread = store.messages.filter((m) => !m.read).length;
  const recent = store.messages.slice(0, 5);
  const recentProjects = store.projects.slice(0, 4);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <AdminPageHeader
        title="Dashboard"
        description="Ringkasan singkat kondisi konten landing page dan pesan masuk."
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminKpiCard
          icon={Briefcase}
          label="Layanan"
          value={store.services.length}
          accent="primary"
          href="/admin/services"
        />
        <AdminKpiCard
          icon={FolderKanban}
          label="Proyek"
          value={store.projects.length}
          accent="secondary"
          href="/admin/projects"
        />
        <AdminKpiCard
          icon={Users}
          label="Anggota Tim"
          value={store.team.length}
          accent="primary"
          href="/admin/team"
        />
        <AdminKpiCard
          icon={MessageSquare}
          label={unread > 0 ? `Pesan (${unread} baru)` : "Pesan"}
          value={store.messages.length}
          accent={unread > 0 ? "danger" : "primary"}
          href="/admin/messages"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent messages */}
        <div className="lg:col-span-2 rounded-lg border border-brand-border bg-white">
          <div className="flex items-center justify-between p-5 border-b border-brand-border">
            <div>
              <h3 className="text-sm font-semibold text-brand-text">Pesan Terbaru</h3>
              <p className="text-xs text-brand-muted mt-0.5">5 pesan masuk paling baru</p>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin/messages" className="text-xs">
                Lihat semua <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
          <div className="divide-y divide-brand-border">
            {recent.length === 0 ? (
              <div className="p-10 text-center">
                <p className="text-sm text-brand-muted">Belum ada pesan masuk.</p>
              </div>
            ) : (
              recent.map((m) => (
                <Link
                  key={m.id}
                  href={`/admin/messages`}
                  className="block p-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0 text-xs font-semibold">
                      {m.name[0]?.toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-brand-text">{m.name}</p>
                        {!m.read && <Badge variant="warning">Baru</Badge>}
                      </div>
                      <p className="text-xs text-brand-muted mt-0.5 line-clamp-1">{m.subject}</p>
                      <p className="text-xs text-brand-muted/80 mt-1 line-clamp-1">{m.message}</p>
                    </div>
                    <span className="text-[10px] text-brand-muted whitespace-nowrap">
                      {new Date(m.createdAt).toLocaleDateString("id-ID", { day: "2-digit", month: "short" })}
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Quick links */}
        <div className="space-y-4">
          <div className="rounded-lg border border-brand-border bg-white p-5">
            <h3 className="text-sm font-semibold text-brand-text mb-3">Aksi Cepat</h3>
            <div className="space-y-2">
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/admin/services"><Briefcase className="h-4 w-4" /> Tambah Layanan</Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/admin/projects"><FolderKanban className="h-4 w-4" /> Tambah Proyek</Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/admin/profile"><User className="h-4 w-4" /> Edit Profil</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-lg border border-brand-border bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 p-5">
            <h3 className="text-sm font-semibold text-brand-text">Info Perusahaan</h3>
            <dl className="mt-3 space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <Calendar className="h-3.5 w-3.5 text-brand-muted mt-0.5 shrink-0" />
                <div>
                  <dt className="text-brand-muted">Berdiri sejak</dt>
                  <dd className="font-semibold text-brand-text">{store.profile.establishedYear}</dd>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="h-3.5 w-3.5 text-brand-muted mt-0.5 shrink-0" />
                <div>
                  <dt className="text-brand-muted">Telepon</dt>
                  <dd className="font-semibold text-brand-text">{store.profile.phone}</dd>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="h-3.5 w-3.5 text-brand-muted mt-0.5 shrink-0" />
                <div>
                  <dt className="text-brand-muted">Email</dt>
                  <dd className="font-semibold text-brand-text break-all">{store.profile.email}</dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Recent projects */}
      <div className="rounded-lg border border-brand-border bg-white">
        <div className="flex items-center justify-between p-5 border-b border-brand-border">
          <div>
            <h3 className="text-sm font-semibold text-brand-text">Proyek Terbaru</h3>
            <p className="text-xs text-brand-muted mt-0.5">4 proyek paling baru di landing page</p>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/projects" className="text-xs">
              Kelola <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5">
          {recentProjects.map((p) => (
            <div key={p.id} className="rounded-md border border-brand-border overflow-hidden bg-white">
              <div className="relative aspect-[4/3] bg-slate-100">
                <Image src={p.imageUrl} alt={p.title} fill unoptimized sizes="(max-width: 640px) 50vw, 25vw" className="object-cover" />
              </div>
              <div className="p-3">
                <Badge variant="secondary" className="mb-1.5">{p.category}</Badge>
                <p className="text-xs font-semibold text-brand-text line-clamp-1">{p.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
