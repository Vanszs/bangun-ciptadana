"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toast";
import { Pencil, Trash2, Loader2, Plus } from "lucide-react";
import type { TeamMember } from "@/data/types";

interface Props { initial: TeamMember[]; }

export default function TeamEditor({ initial }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [items, setItems] = useState(initial);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [creating, setCreating] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<TeamMember | null>(null);
  const [busy, setBusy] = useState(false);

  async function save(payload: Partial<TeamMember>, id?: string) {
    setBusy(true);
    const url = id ? `/api/admin/team/${id}` : `/api/admin/team`;
    const res = await fetch(url, { method: id ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    setBusy(false);
    if (!res.ok) { toast({ title: "Gagal menyimpan", variant: "error" }); return null; }
    const data = await res.json();
    return data.member as TeamMember;
  }

  async function handleCreate(values: Partial<TeamMember>) {
    const c = await save(values);
    if (c) { setItems((p) => [...p, c]); setCreating(false); toast({ title: "Anggota tim ditambah", variant: "success" }); router.refresh(); }
  }
  async function handleUpdate(values: Partial<TeamMember>) {
    if (!editing) return;
    const u = await save(values, editing.id);
    if (u) { setItems((p) => p.map((m) => (m.id === u.id ? u : m))); setEditing(null); toast({ title: "Data tim diperbarui", variant: "success" }); router.refresh(); }
  }
  async function handleDelete() {
    if (!confirmDelete) return;
    setBusy(true);
    const res = await fetch(`/api/admin/team/${confirmDelete.id}`, { method: "DELETE" });
    setBusy(false);
    if (!res.ok) { toast({ title: "Gagal menghapus", variant: "error" }); return; }
    setItems((p) => p.filter((m) => m.id !== confirmDelete.id));
    setConfirmDelete(null);
    toast({ title: "Anggota tim dihapus", variant: "success" });
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((m) => (
          <div key={m.id} className="rounded-lg border border-brand-border bg-white p-4 text-center">
            <div className="relative h-20 w-20 mx-auto rounded-full overflow-hidden border-2 border-brand-border bg-slate-100">
              <Image src={m.imageUrl} alt={m.name} fill unoptimized sizes="80px" className="object-cover" />
            </div>
            <p className="text-sm font-semibold text-brand-text mt-3 truncate">{m.name}</p>
            <p className="text-xs text-brand-muted mt-0.5 truncate">{m.position}</p>
            <div className="flex items-center justify-center gap-1 mt-3">
              <Button size="sm" variant="ghost" onClick={() => setEditing(m)}><Pencil className="h-3.5 w-3.5" /> Edit</Button>
              <Button size="sm" variant="ghost" className="text-red-600 hover:bg-red-50" onClick={() => setConfirmDelete(m)}><Trash2 className="h-3.5 w-3.5" /></Button>
            </div>
          </div>
        ))}
        <button
          onClick={() => setCreating(true)}
          className="rounded-lg border-2 border-dashed border-brand-border bg-white hover:border-brand-primary/50 hover:bg-brand-primary/5 transition-colors p-4 flex flex-col items-center justify-center text-brand-muted min-h-[200px]"
        >
          <Plus className="h-5 w-5 mb-1" />
          <span className="text-xs font-medium">Tambah Anggota</span>
        </button>
      </div>

      <MemberFormDialog key="create" open={creating} onOpenChange={setCreating} onSubmit={handleCreate} busy={busy} title="Tambah Anggota Tim" />
      <MemberFormDialog key={editing?.id ?? "new"} open={!!editing} onOpenChange={(o) => !o && setEditing(null)} initial={editing || undefined} onSubmit={handleUpdate} busy={busy} title="Edit Anggota Tim" />

      <Dialog open={!!confirmDelete} onOpenChange={(o) => !o && setConfirmDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus anggota tim?</DialogTitle>
            <DialogDescription>Anggota <strong>{confirmDelete?.name}</strong> akan dihapus dari halaman About.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDelete(null)} disabled={busy}>Batal</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={busy}>{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Hapus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function MemberFormDialog({ open, onOpenChange, initial, onSubmit, busy, title }: { open: boolean; onOpenChange: (o: boolean) => void; initial?: TeamMember; onSubmit: (v: Partial<TeamMember>) => void | Promise<void>; busy: boolean; title: string; }) {
  const [n, setN] = useState(initial?.name || "");
  const [p, setP] = useState(initial?.position || "");
  const [u, setU] = useState(initial?.imageUrl || "");
  const [err, setErr] = useState<string | null>(null);

  function submit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    if (!n.trim() || !p.trim()) { setErr("Nama dan jabatan wajib diisi."); return; }
    onSubmit({ name: n.trim(), position: p.trim(), imageUrl: u.trim() || undefined });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Anggota tim akan muncul di section tim halaman About.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="n">Nama Lengkap</Label>
            <Input id="n" value={n} onChange={(e) => setN(e.target.value)} placeholder="cth: Budi Santoso, S.T." />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="p">Jabatan</Label>
            <Input id="p" value={p} onChange={(e) => setP(e.target.value)} placeholder="cth: Manajer Proyek" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="u">URL Foto</Label>
            <Input id="u" value={u} onChange={(e) => setU(e.target.value)} placeholder="https://..." />
          </div>
          {err && <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">{err}</p>}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={busy}>Batal</Button>
            <Button type="submit" disabled={busy}>{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Simpan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
