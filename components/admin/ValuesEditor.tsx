"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toast";
import { Pencil, Trash2, Loader2, Plus, Award } from "lucide-react";
import type { CompanyValue } from "@/data/types";

interface Props { initial: CompanyValue[]; }

export default function ValuesEditor({ initial }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [items, setItems] = useState(initial);
  const [editing, setEditing] = useState<CompanyValue | null>(null);
  const [creating, setCreating] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<CompanyValue | null>(null);
  const [busy, setBusy] = useState(false);

  async function save(payload: Partial<CompanyValue>, id?: string) {
    setBusy(true);
    const url = id ? `/api/admin/values/${id}` : `/api/admin/values`;
    const res = await fetch(url, { method: id ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    setBusy(false);
    if (!res.ok) { toast({ title: "Gagal menyimpan", variant: "error" }); return null; }
    const data = await res.json();
    return data.value as CompanyValue;
  }

  async function handleCreate(values: Partial<CompanyValue>) {
    const c = await save(values);
    if (c) { setItems((p) => [...p, c]); setCreating(false); toast({ title: "Nilai ditambah", variant: "success" }); router.refresh(); }
  }
  async function handleUpdate(values: Partial<CompanyValue>) {
    if (!editing) return;
    const u = await save(values, editing.id);
    if (u) { setItems((p) => p.map((v) => (v.id === u.id ? u : v))); setEditing(null); toast({ title: "Nilai diperbarui", variant: "success" }); router.refresh(); }
  }
  async function handleDelete() {
    if (!confirmDelete) return;
    setBusy(true);
    const res = await fetch(`/api/admin/values/${confirmDelete.id}`, { method: "DELETE" });
    setBusy(false);
    if (!res.ok) { toast({ title: "Gagal menghapus", variant: "error" }); return; }
    setItems((p) => p.filter((v) => v.id !== confirmDelete.id));
    setConfirmDelete(null);
    toast({ title: "Nilai dihapus", variant: "success" });
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((v) => (
          <div key={v.id} className="rounded-lg border border-brand-border bg-white p-5">
            <div className="flex items-start justify-between gap-2">
              <div className="h-10 w-10 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                <Award className="h-5 w-5" />
              </div>
              <div className="flex gap-0.5">
                <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setEditing(v)} aria-label="Edit"><Pencil className="h-3.5 w-3.5" /></Button>
                <Button size="icon" variant="ghost" className="h-7 w-7 text-red-600 hover:bg-red-50" onClick={() => setConfirmDelete(v)} aria-label="Delete"><Trash2 className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
            <p className="text-base font-semibold text-brand-text mt-3">{v.title}</p>
            <p className="text-xs text-brand-muted mt-1.5 leading-relaxed">{v.description}</p>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setCreating(true)}
          className="rounded-lg border-2 border-dashed border-brand-border bg-white hover:border-brand-primary/50 hover:bg-brand-primary/5 transition-colors p-5 flex flex-col items-center justify-center text-brand-muted min-h-[160px]"
        >
          <Plus className="h-5 w-5 mb-1" />
          <span className="text-xs font-medium">Tambah Nilai</span>
        </button>
      </div>

      <ValueFormDialog key="create" open={creating} onOpenChange={setCreating} onSubmit={handleCreate} busy={busy} title="Tambah Nilai" />
      <ValueFormDialog key={editing?.id ?? "new"} open={!!editing} onOpenChange={(o) => !o && setEditing(null)} initial={editing || undefined} onSubmit={handleUpdate} busy={busy} title="Edit Nilai" />

      <Dialog open={!!confirmDelete} onOpenChange={(o) => !o && setConfirmDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus nilai?</DialogTitle>
            <DialogDescription>Nilai <strong>{confirmDelete?.title}</strong> akan dihapus dari halaman About.</DialogDescription>
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

function ValueFormDialog({ open, onOpenChange, initial, onSubmit, busy, title }: { open: boolean; onOpenChange: (o: boolean) => void; initial?: CompanyValue; onSubmit: (v: Partial<CompanyValue>) => void | Promise<void>; busy: boolean; title: string; }) {
  const [t, setT] = useState(initial?.title || "");
  const [d, setD] = useState(initial?.description || "");
  const [err, setErr] = useState<string | null>(null);

  function submit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    if (!t.trim() || !d.trim()) { setErr("Judul dan deskripsi wajib diisi."); return; }
    onSubmit({ title: t.trim(), description: d.trim() });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Nilai ini akan tampil di section nilai perusahaan pada halaman About.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="t">Judul</Label>
            <Input id="t" value={t} onChange={(e) => setT(e.target.value)} placeholder="cth: Kualitas" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="d">Deskripsi</Label>
            <Textarea id="d" rows={3} value={d} onChange={(e) => setD(e.target.value)} placeholder="Penjelasan singkat nilai ini." />
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
