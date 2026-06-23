"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/toast";
import { Badge } from "@/components/ui/badge";
import { Search, Mail, MailOpen, Trash2, Loader2, Inbox as InboxIcon, ChevronRight } from "lucide-react";
import type { ContactMessage } from "@/data/store";
import { cn } from "@/lib/utils";

interface Props { initial: ContactMessage[]; }

type Filter = "all" | "unread" | "read";

export default function MessagesInbox({ initial }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [items, setItems] = useState(initial);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<ContactMessage | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<ContactMessage | null>(null);
  const [busy, setBusy] = useState(false);

  const filtered = useMemo(() => {
    return items.filter((m) => {
      if (filter === "unread" && m.read) return false;
      if (filter === "read" && !m.read) return false;
      if (!q) return true;
      const hay = `${m.name} ${m.email} ${m.subject} ${m.message}`.toLowerCase();
      return hay.includes(q.toLowerCase());
    });
  }, [items, q, filter]);

  const counts = useMemo(() => ({
    all: items.length,
    unread: items.filter((m) => !m.read).length,
    read: items.filter((m) => m.read).length,
  }), [items]);

  async function markRead(id: string) {
    const res = await fetch(`/api/admin/messages/${id}`, { method: "PATCH" });
    if (res.ok) {
      setItems((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
      router.refresh();
    }
  }

  async function deleteMsg() {
    if (!confirmDelete) return;
    setBusy(true);
    const res = await fetch(`/api/admin/messages/${confirmDelete.id}`, { method: "DELETE" });
    setBusy(false);
    if (!res.ok) { toast({ title: "Gagal menghapus", variant: "error" }); return; }
    setItems((prev) => prev.filter((m) => m.id !== confirmDelete.id));
    if (active?.id === confirmDelete.id) setActive(null);
    setConfirmDelete(null);
    toast({ title: "Pesan dihapus", variant: "success" });
    router.refresh();
  }

  function openMessage(m: ContactMessage) {
    setActive(m);
    if (!m.read) markRead(m.id);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4">
      {/* List */}
      <div className="rounded-lg border border-brand-border bg-white overflow-hidden flex flex-col h-[640px]">
        <div className="p-3 border-b border-brand-border space-y-2.5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-muted" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari pesan..." className="pl-9 h-9" />
          </div>
          <div className="flex items-center gap-1" role="radiogroup" aria-label="Filter pesan">
            {([
              { key: "all", label: "Semua" },
              { key: "unread", label: "Belum dibaca" },
              { key: "read", label: "Sudah dibaca" },
            ] as { key: Filter; label: string }[]).map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                role="radio"
                aria-checked={filter === f.key}
                className={cn(
                  "inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md transition-colors",
                  filter === f.key
                    ? "bg-slate-100 text-brand-text"
                    : "text-brand-muted hover:bg-slate-50 hover:text-brand-text",
                )}
              >
                {f.label}
                <span className={cn(
                  "inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold",
                  filter === f.key ? "bg-brand-primary text-white" : "bg-slate-200 text-brand-muted",
                )}>
                  {counts[f.key]}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-brand-border">
          {filtered.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-brand-muted">
              <InboxIcon className="h-8 w-8 mb-2" />
              <p className="text-sm">Tidak ada pesan.</p>
            </div>
          ) : (
            filtered.map((m) => (
              <button
                key={m.id}
                onClick={() => openMessage(m)}
                className={cn(
                  "w-full text-left p-3 hover:bg-slate-50 transition-colors flex items-start gap-3",
                  active?.id === m.id && "bg-brand-primary/5",
                  !m.read && "bg-white",
                )}
              >
                <div className="h-9 w-9 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center text-xs font-semibold shrink-0">
                  {m.name[0]?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className={cn("text-sm truncate", !m.read ? "font-bold text-brand-text" : "font-medium text-brand-text/80")}>
                      {m.name}
                    </p>
                    {!m.read && <Badge variant="warning">Baru</Badge>}
                  </div>
                  <p className="text-xs text-brand-text font-medium truncate mt-0.5">{m.subject}</p>
                  <p className="text-xs text-brand-muted truncate mt-0.5">{m.message}</p>
                </div>
                <span className="text-[10px] text-brand-muted whitespace-nowrap">
                  {new Date(m.createdAt).toLocaleDateString("id-ID", { day: "2-digit", month: "short" })}
                </span>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Detail */}
      <div className="rounded-lg border border-brand-border bg-white h-[640px] flex flex-col">
        {active ? (
          <>
            <div className="p-5 border-b border-brand-border flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="text-base font-semibold text-brand-text">{active.subject}</h3>
                <div className="mt-2 flex items-center gap-2 text-xs text-brand-muted">
                  <span className="font-semibold text-brand-text">{active.name}</span>
                  <span>&lt;{active.email}&gt;</span>
                </div>
                {active.phone && (
                  <p className="text-xs text-brand-muted mt-0.5">📞 {active.phone}</p>
                )}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Button size="icon" variant="ghost" onClick={() => setConfirmDelete(active)} aria-label="Delete" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex-1 p-5 overflow-y-auto">
              <p className="text-xs text-brand-muted mb-3">
                Diterima {new Date(active.createdAt).toLocaleString("id-ID", { dateStyle: "long", timeStyle: "short" })}
              </p>
              <p className="text-sm text-brand-text leading-relaxed whitespace-pre-wrap">{active.message}</p>
            </div>
            <div className="p-4 border-t border-brand-border flex items-center gap-2">
              <Button asChild variant="outline">
                <a href={`mailto:${active.email}?subject=Re: ${encodeURIComponent(active.subject)}`}>
                  <Mail className="h-4 w-4" /> Balas via Email
                </a>
              </Button>
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 text-brand-muted">
            <Mail className="h-10 w-10 mb-3" />
            <p className="text-sm font-medium text-brand-text">Pilih pesan untuk membaca</p>
            <p className="text-xs mt-1">Pesan dari formulir kontak akan muncul di sini.</p>
          </div>
        )}
      </div>

      <Dialog open={!!confirmDelete} onOpenChange={(o) => !o && setConfirmDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus pesan?</DialogTitle>
            <DialogDescription>Pesan dari <strong>{confirmDelete?.name}</strong> akan dihapus permanen.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDelete(null)} disabled={busy}>Batal</Button>
            <Button variant="destructive" onClick={deleteMsg} disabled={busy}>
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
