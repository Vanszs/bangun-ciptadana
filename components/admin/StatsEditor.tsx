"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toast";
import { Pencil, Trash2, Loader2, Plus } from "lucide-react";
import { getStatIcon } from "@/components/IconMapper";
import type { CompanyStat } from "@/data/types";

const ICON_OPTIONS = ["Calendar", "Briefcase", "Smile", "UserCheck", "Award", "TrendingUp", "Star", "Trophy"];

interface Props { initial: CompanyStat[]; }

export default function StatsEditor({ initial }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [items, setItems] = useState(initial);
  const [editing, setEditing] = useState<CompanyStat | null>(null);
  const [creating, setCreating] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<CompanyStat | null>(null);
  const [busy, setBusy] = useState(false);

  async function save(payload: Partial<CompanyStat>, id?: string) {
    setBusy(true);
    const url = id ? `/api/admin/stats/${id}` : `/api/admin/stats`;
    const res = await fetch(url, { method: id ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    setBusy(false);
    if (!res.ok) { toast({ title: "Gagal menyimpan", variant: "error" }); return null; }
    const data = await res.json();
    return data.stat as CompanyStat;
  }

  async function handleCreate(values: Partial<CompanyStat>) {
    const c = await save(values);
    if (c) { setItems((p) => [...p, c]); setCreating(false); toast({ title: "Statistik ditambah", variant: "success" }); router.refresh(); }
  }
  async function handleUpdate(values: Partial<CompanyStat>) {
    if (!editing) return;
    const u = await save(values, editing.id);
    if (u) { setItems((p) => p.map((s) => (s.id === u.id ? u : s))); setEditing(null); toast({ title: "Statistik diperbarui", variant: "success" }); router.refresh(); }
  }
  async function handleDelete() {
    if (!confirmDelete) return;
    setBusy(true);
    const res = await fetch(`/api/admin/stats/${confirmDelete.id}`, { method: "DELETE" });
    setBusy(false);
    if (!res.ok) { toast({ title: "Gagal menghapus", variant: "error" }); return; }
    setItems((p) => p.filter((s) => s.id !== confirmDelete.id));
    setConfirmDelete(null);
    toast({ title: "Statistik dihapus", variant: "success" });
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {items.map((s) => (
          <div key={s.id} className="rounded-lg border border-brand-border bg-white p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="h-9 w-9 rounded-md bg-brand-secondary/10 text-brand-secondary-dark flex items-center justify-center">
                {getStatIcon(s.iconName)}
              </div>
              <div className="flex gap-0.5">
                <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setEditing(s)} aria-label="Edit"><Pencil className="h-3.5 w-3.5" /></Button>
                <Button size="icon" variant="ghost" className="h-7 w-7 text-red-600 hover:bg-red-50" onClick={() => setConfirmDelete(s)} aria-label="Delete"><Trash2 className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
            <p className="text-2xl font-bold text-brand-text mt-3 tracking-tight">{s.value}</p>
            <p className="text-xs text-brand-muted mt-0.5">{s.label}</p>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setCreating(true)}
          className="rounded-lg border-2 border-dashed border-brand-border bg-white hover:border-brand-primary/50 hover:bg-brand-primary/5 transition-colors p-4 flex flex-col items-center justify-center text-brand-muted min-h-[140px]"
        >
          <Plus className="h-5 w-5 mb-1" />
          <span className="text-xs font-medium">Tambah Statistik</span>
        </button>
      </div>

      <StatFormDialog key="create" open={creating} onOpenChange={setCreating} onSubmit={handleCreate} busy={busy} title="Tambah Statistik" />
      <StatFormDialog key={editing?.id ?? "new"} open={!!editing} onOpenChange={(o) => !o && setEditing(null)} initial={editing || undefined} onSubmit={handleUpdate} busy={busy} title="Edit Statistik" />

      <Dialog open={!!confirmDelete} onOpenChange={(o) => !o && setConfirmDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus statistik?</DialogTitle>
            <DialogDescription>Statistik <strong>{confirmDelete?.label}</strong> akan dihapus dari landing page.</DialogDescription>
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

function StatFormDialog({ open, onOpenChange, initial, onSubmit, busy, title }: { open: boolean; onOpenChange: (o: boolean) => void; initial?: CompanyStat; onSubmit: (v: Partial<CompanyStat>) => void | Promise<void>; busy: boolean; title: string; }) {
  const [v, setV] = useState(initial?.value || "");
  const [l, setL] = useState(initial?.label || "");
  const [ic, setIc] = useState(initial?.iconName || "Calendar");
  const [err, setErr] = useState<string | null>(null);

  function submit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    if (!v.trim() || !l.trim()) { setErr("Value dan label wajib diisi."); return; }
    onSubmit({ value: v.trim(), label: l.trim(), iconName: ic });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Statistik ini akan muncul di section stats landing page.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="v">Value</Label>
            <Input id="v" value={v} onChange={(e) => setV(e.target.value)} placeholder="cth: 10+ atau 200+" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="l">Label</Label>
            <Input id="l" value={l} onChange={(e) => setL(e.target.value)} placeholder="cth: Tahun Pengalaman" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ic">Ikon</Label>
            <Select id="ic" value={ic} onChange={(e) => setIc(e.target.value)}>
              {ICON_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </Select>
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
