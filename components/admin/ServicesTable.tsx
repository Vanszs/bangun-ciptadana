"use client";

import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";
import { Pencil, Trash2, Loader2, Search, Plus, ArrowUp, ArrowDown, ChevronsUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import { getServiceIcon } from "@/components/IconMapper";
import type { ServiceItem } from "@/data/types";

const ICON_OPTIONS = [
  "Building2", "Home", "LayoutGrid", "Compass", "Layers", "Scaling",
  "Paintbrush", "Lightbulb", "Armchair", "Briefcase", "Hammer", "Wrench",
];
const PAGE_SIZE = 25;
type SortKey = "title";
type SortDir = "asc" | "desc";

interface Props {
  initial: ServiceItem[];
}

export default function ServicesTable({ initial }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [items, setItems] = useState<ServiceItem[]>(initial);
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<ServiceItem | null>(null);
  const [creating, setCreating] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<ServiceItem | null>(null);
  const [busy, setBusy] = useState(false);
  const [sort, setSort] = useState<{ key: SortKey; dir: SortDir }>({ key: "title", dir: "asc" });
  const [page, setPage] = useState(1);

  const filtered = items.filter((s) =>
    [s.title, s.description].some((t) => t.toLowerCase().includes(q.toLowerCase())),
  );

  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      const cmp = a.title.localeCompare(b.title, "id");
      return sort.dir === "asc" ? cmp : -cmp;
    });
    return arr;
  }, [filtered, sort]);

  useEffect(() => { setPage(1); }, [q]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const paged = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function toggleSort(key: SortKey) {
    setSort((prev) => prev.key === key ? { key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" });
    setPage(1);
  }

  async function save(payload: Partial<ServiceItem>, id?: string) {
    setBusy(true);
    const url = id ? `/api/admin/services/${id}` : `/api/admin/services`;
    const method = id ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    setBusy(false);
    if (!res.ok) {
      toast({ title: "Gagal menyimpan", variant: "error" });
      return null;
    }
    const data = await res.json();
    return (id ? data.service : data.service) as ServiceItem;
  }

  async function handleCreate(values: Partial<ServiceItem>) {
    const created = await save(values);
    if (created) {
      setItems((prev) => [...prev, created]);
      setCreating(false);
      toast({ title: "Layanan ditambahkan", variant: "success" });
      router.refresh();
    }
  }

  async function handleUpdate(values: Partial<ServiceItem>) {
    if (!editing) return;
    const updated = await save(values, editing.id);
    if (updated) {
      setItems((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
      setEditing(null);
      toast({ title: "Layanan diperbarui", variant: "success" });
      router.refresh();
    }
  }

  async function handleDelete() {
    if (!confirmDelete) return;
    setBusy(true);
    const res = await fetch(`/api/admin/services/${confirmDelete.id}`, { method: "DELETE" });
    setBusy(false);
    if (!res.ok) {
      toast({ title: "Gagal menghapus", variant: "error" });
      return;
    }
    setItems((prev) => prev.filter((s) => s.id !== confirmDelete.id));
    setConfirmDelete(null);
    toast({ title: "Layanan dihapus", variant: "success" });
    router.refresh();
  }

  const SortIcon = sort.dir === "asc" ? ArrowUp : ArrowDown;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-muted" />
          <Input placeholder="Cari layanan..." value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
        </div>
        <p className="text-xs text-brand-muted ml-auto">
          Total: <strong className="text-brand-text">{filtered.length}</strong> dari {items.length}
        </p>
        <Button onClick={() => setCreating(true)}>
          <Plus className="h-4 w-4" /> Tambah Layanan
        </Button>
      </div>

      <div className="rounded-lg border border-brand-border bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead aria-sort={sort.key === "title" ? (sort.dir === "asc" ? "ascending" : "descending") : "none"}>
                <button
                  onClick={() => toggleSort("title")}
                  className="inline-flex items-center gap-1.5 -mx-1 px-1 py-0.5 rounded hover:bg-slate-100 transition-colors"
                >
                  Judul
                  {sort.key === "title" ? <SortIcon className="h-3 w-3 text-brand-primary" aria-hidden="true" /> : <ChevronsUpDown className="h-3 w-3 text-brand-muted opacity-50" aria-hidden="true" />}
                </button>
              </TableHead>
              <TableHead>Deskripsi</TableHead>
              <TableHead className="w-24">Ikon</TableHead>
              <TableHead className="w-24 text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-brand-muted">
                  Tidak ada layanan ditemukan.
                </TableCell>
              </TableRow>
            ) : (
              paged.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>
                    <div className="h-9 w-9 rounded-md bg-brand-secondary/10 text-brand-secondary-dark flex items-center justify-center">
                      {getServiceIcon(s.iconName)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-semibold text-brand-text">{s.title}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-brand-muted line-clamp-2 max-w-md">{s.description}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{s.iconName}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex gap-1">
                      <Button size="icon" variant="ghost" onClick={() => setEditing(s)} aria-label="Edit">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => setConfirmDelete(s)} aria-label="Delete" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {sorted.length > PAGE_SIZE && (
        <div className="flex items-center justify-between text-xs text-brand-muted">
          <span>
            Menampilkan <strong className="text-brand-text">{(page - 1) * PAGE_SIZE + 1}</strong>–
            <strong className="text-brand-text">{Math.min(page * PAGE_SIZE, sorted.length)}</strong> dari{" "}
            <strong className="text-brand-text">{sorted.length}</strong>
          </span>
          <div className="inline-flex items-center gap-1">
            <Button size="sm" variant="outline" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
              <ChevronLeft className="h-3.5 w-3.5" /> Sebelumnya
            </Button>
            <span className="px-3 tabular-nums text-brand-text font-semibold">{page} / {totalPages}</span>
            <Button size="sm" variant="outline" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
              Selanjutnya <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      )}

      <ServiceFormDialog
        open={creating}
        onOpenChange={setCreating}
        onSubmit={handleCreate}
        busy={busy}
        title="Tambah Layanan"
      />

      <ServiceFormDialog
        open={!!editing}
        onOpenChange={(o) => !o && setEditing(null)}
        initial={editing || undefined}
        onSubmit={handleUpdate}
        busy={busy}
        title="Edit Layanan"
      />

      <Dialog open={!!confirmDelete} onOpenChange={(o) => !o && setConfirmDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus layanan?</DialogTitle>
            <DialogDescription>
              Tindakan ini tidak dapat dibatalkan. Layanan <strong>{confirmDelete?.title}</strong> akan dihapus dari landing page.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDelete(null)} disabled={busy}>Batal</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={busy}>
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ServiceFormDialog({
  open,
  onOpenChange,
  initial,
  onSubmit,
  busy,
  title,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial?: ServiceItem;
  onSubmit: (values: Partial<ServiceItem>) => Promise<void> | void;
  busy: boolean;
  title: string;
}) {
  const [t, setT] = useState(initial?.title || "");
  const [d, setD] = useState(initial?.description || "");
  const [ic, setIc] = useState(initial?.iconName || "Briefcase");
  const [err, setErr] = useState<string | null>(null);

  React.useEffect(() => {
    if (open) {
      setT(initial?.title || "");
      setD(initial?.description || "");
      setIc(initial?.iconName || "Briefcase");
      setErr(null);
    }
  }, [open, initial]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!t.trim() || !d.trim()) {
      setErr("Judul dan deskripsi wajib diisi.");
      return;
    }
    onSubmit({ title: t.trim(), description: d.trim(), iconName: ic });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Layanan akan otomatis tampil di halaman utama website.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="title">Judul Layanan</Label>
            <Input id="title" value={t} onChange={(e) => setT(e.target.value)} placeholder="cth: Konstruksi Bangunan" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="desc">Deskripsi</Label>
            <Textarea id="desc" rows={4} value={d} onChange={(e) => setD(e.target.value)} placeholder="Deskripsikan layanan secara singkat dan jelas." />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="icon">Ikon</Label>
            <Select id="icon" value={ic} onChange={(e) => setIc(e.target.value)}>
              {ICON_OPTIONS.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </Select>
            <p className="text-[11px] text-brand-muted">Ikon tersedia: Lucide icons standar.</p>
          </div>
          {err && <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">{err}</p>}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={busy}>Batal</Button>
            <Button type="submit" disabled={busy}>
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Simpan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
