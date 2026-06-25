import { readStore } from "@/data/store";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminKpiCard from "@/components/admin/AdminKpiCard";
import Link from "next/link";
import Image from "next/image";
import { Briefcase, FolderKanban, Users, MessageSquare, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const store = await readStore();
  const unread = store.messages.filter((m) => !m.read).length;
  const recent = store.messages.slice(0, 5);
  const recentProjects = store.projects.slice(0, 3);

  const categoryCounts = store.projects.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] ?? 0) + 1;
    return acc;
  }, {});
  const categoryEntries = Object.entries(categoryCounts).sort(([, a], [, b]) => b - a);
  const totalProjects = store.projects.length || 1;

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
          delta={`${store.services.length} aktif`}
          trend="flat"
        />
        <AdminKpiCard
          icon={FolderKanban}
          label="Proyek"
          value={store.projects.length}
          accent="secondary"
          href="/admin/projects"
          delta={`${categoryEntries.length} kategori`}
          trend="flat"
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
          delta={unread > 0 ? `${unread} belum dibaca` : "Semua terbaca"}
          trend={unread > 0 ? "up" : "flat"}
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

        {/* Project distribution */}
        <div className="rounded-lg border border-brand-border bg-white p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-brand-text">Distribusi Proyek</h3>
              <p className="text-xs text-brand-muted mt-0.5">Per kategori</p>
            </div>
            <FolderKanban className="h-4 w-4 text-brand-muted" aria-hidden="true" />
          </div>
          {categoryEntries.length === 0 ? (
            <p className="text-sm text-brand-muted">Belum ada proyek.</p>
          ) : (
            <div className="space-y-3">
              {categoryEntries.map(([cat, count]) => {
                const pct = Math.round((count / totalProjects) * 100);
                return (
                  <div key={cat}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-medium text-brand-text">{cat}</span>
                      <span className="text-brand-muted tabular-nums">{count} · {pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <progress
                        className="h-full w-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full transition-all appearance-none [&::-webkit-progress-bar]:bg-transparent [&::-webkit-progress-value]:bg-gradient-to-r [&::-webkit-progress-value]:from-brand-primary [&::-webkit-progress-value]:to-brand-secondary"
                        style={{ width: `${pct}%` }}
                        value={pct}
                        max={100}
                        aria-label={`${cat}: ${pct}%`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Recent projects */}
      <div className="rounded-lg border border-brand-border bg-white">
        <div className="flex items-center justify-between p-5 border-b border-brand-border">
          <div>
            <h3 className="text-sm font-semibold text-brand-text">Proyek Terbaru</h3>
            <p className="text-xs text-brand-muted mt-0.5">3 proyek paling baru di landing page</p>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/projects" className="text-xs">
              Kelola <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-brand-border">
          {recentProjects.map((p) => (
            <Link key={p.id} href="/admin/projects" className="group block">
              <div className="relative aspect-[16/9] bg-slate-100">
                <Image src={p.imageUrl} alt={p.title} fill unoptimized sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition-transform group-hover:scale-[1.02]" />
              </div>
              <div className="p-4">
                <Badge variant="secondary" className="mb-1.5">{p.category}</Badge>
                <p className="text-sm font-semibold text-brand-text line-clamp-1 group-hover:text-brand-primary transition-colors">{p.title}</p>
                <p className="text-xs text-brand-muted mt-1 line-clamp-2">{p.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
