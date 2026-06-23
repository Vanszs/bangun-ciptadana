"use client";

import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";
import { Pencil, Trash2, Loader2, Search, Image as ImageIcon, X, Plus, ArrowUp, ArrowDown, ChevronsUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import type { ProjectItem } from "@/data/types";

const CATEGORIES = [
  "Konstruksi Bangunan", "Atap & Kanopi", "Partisi", "Desain Arsitektur",
  "Aluminium", "Renovasi", "Pengecatan", "Kelistrikan", "Interior", "Lainnya",
];
const PAGE_SIZE = 25;
type SortKey = "title" | "category";
type SortDir = "asc" | "desc";

interface Props {
  initial: ProjectItem[];
}

export default function ProjectsTable({ initial }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [items, setItems] = useState<ProjectItem[]>(initial);
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<ProjectItem | null>(null);
  const [creating, setCreating] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<ProjectItem | null>(null);
  const [busy, setBusy] = useState(false);
  const [sort, setSort] = useState<{ key: SortKey; dir: SortDir }>({ key: "title", dir: "asc" });
  const [page, setPage] = useState(1);

  const filtered = items.filter((p) =>
    [p.title, p.description, p.category].some((t) => t.toLowerCase().includes(q.toLowerCase())),
  );

  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      const av = sort.key === "title" ? a.title : a.category;
      const bv = sort.key === "title" ? b.title : b.category;
      const cmp = av.localeCompare(bv, "id");
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

  async function save(payload: Partial<ProjectItem>, id?: string) {
    setBusy(true);
    const url = id ? `/api/admin/projects/${id}` : `/api/admin/projects`;
    const method = id ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    setBusy(false);
    if (!res.ok) {
      toast({ title: "Gagal menyimpan", variant: "error" });
      return null;
    }
    const data = await res.json();
    return (data.project ?? data.service) as ProjectItem;
  }

  async function handleCreate(values: Partial<ProjectItem>) {
    const created = await save(values);
    if (created) {
      setItems((prev) => [...prev, created]);
      setCreating(false);
      toast({ title: "Proyek ditambahkan", variant: "success" });
      router.refresh();
    }
  }

  async function handleUpdate(values: Partial<ProjectItem>) {
    if (!editing) return;
    const updated = await save(values, editing.id);
    if (updated) {
      setItems((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      setEditing(null);
      toast({ title: "Proyek diperbarui", variant: "success" });
      router.refresh();
    }
  }

  async function handleDelete() {
    if (!confirmDelete) return;
    setBusy(true);
    const res = await fetch(`/api/admin/projects/${confirmDelete.id}`, { method: "DELETE" });
    setBusy(false);
    if (!res.ok) {
      toast({ title: "Gagal menghapus", variant: "error" });
      return;
    }
    setItems((prev) => prev.filter((p) => p.id !== confirmDelete.id));
    setConfirmDelete(null);
    toast({ title: "Proyek dihapus", variant: "success" });
    router.refresh();
  }

  const SortIcon = sort.dir === "asc" ? ArrowUp : ArrowDown;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-muted" />
          <Input placeholder="Cari proyek..." value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
        </div>
        <p className="text-xs text-brand-muted ml-auto">
          Total: <strong className="text-brand-text">{filtered.length}</strong> dari {items.length}
        </p>
        <Button onClick={() => setCreating(true)}>
          <Plus className="h-4 w-4" /> Tambah Proyek
        </Button>
      </div>

      <div className="rounded-lg border border-brand-border bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Foto</TableHead>
              <TableHead aria-sort={sort.key === "title" ? (sort.dir === "asc" ? "ascending" : "descending") : "none"}>
                <button
                  onClick={() => toggleSort("title")}
                  className="inline-flex items-center gap-1.5 -mx-1 px-1 py-0.5 rounded hover:bg-slate-100 transition-colors"
                >
                  Judul
                  {sort.key === "title" ? <SortIcon className="h-3 w-3 text-brand-primary" aria-hidden="true" /> : <ChevronsUpDown className="h-3 w-3 text-brand-muted opacity-50" aria-hidden="true" />}
                </button>
              </TableHead>
              <TableHead aria-sort={sort.key === "category" ? (sort.dir === "asc" ? "ascending" : "descending") : "none"}>
                <button
                  onClick={() => toggleSort("category")}
                  className="inline-flex items-center gap-1.5 -mx-1 px-1 py-0.5 rounded hover:bg-slate-100 transition-colors"
                >
                  Kategori
                  {sort.key === "category" ? <SortIcon className="h-3 w-3 text-brand-primary" aria-hidden="true" /> : <ChevronsUpDown className="h-3 w-3 text-brand-muted opacity-50" aria-hidden="true" />}
                </button>
              </TableHead>
              <TableHead>Deskripsi</TableHead>
              <TableHead className="w-24 text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-brand-muted">
                  Tidak ada proyek ditemukan.
                </TableCell>
              </TableRow>
            ) : (
              paged.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="relative h-10 w-14 rounded-md overflow-hidden bg-slate-100 border border-brand-border">
                      <Image src={p.imageUrl} alt={p.title} fill unoptimized sizes="56px" className="object-cover" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-semibold text-brand-text">{p.title}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{p.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <p className="text-brand-muted line-clamp-2 max-w-md">{p.description}</p>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex gap-1">
                      <Button size="icon" variant="ghost" onClick={() => setEditing(p)} aria-label="Edit">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => setConfirmDelete(p)} aria-label="Delete" className="text-red-600 hover:text-red-700 hover:bg-red-50">
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

      <ProjectFormDialog
        open={creating}
        onOpenChange={setCreating}
        onSubmit={handleCreate}
        busy={busy}
        title="Tambah Proyek"
      />

      <ProjectFormDialog
        open={!!editing}
        onOpenChange={(o) => !o && setEditing(null)}
        initial={editing || undefined}
        onSubmit={handleUpdate}
        busy={busy}
        title="Edit Proyek"
      />

      <Dialog open={!!confirmDelete} onOpenChange={(o) => !o && setConfirmDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus proyek?</DialogTitle>
            <DialogDescription>
              Tindakan ini tidak dapat dibatalkan. Proyek <strong>{confirmDelete?.title}</strong> akan dihapus.
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

function ProjectFormDialog({
  open, onOpenChange, initial, onSubmit, busy, title,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial?: ProjectItem;
  onSubmit: (values: Partial<ProjectItem>) => Promise<void> | void;
  busy: boolean;
  title: string;
}) {
  const [t, setT] = useState(initial?.title || "");
  const [d, setD] = useState(initial?.description || "");
  const [c, setC] = useState(initial?.category || CATEGORIES[0]);
  const [url, setUrl] = useState(initial?.imageUrl || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80");
  const [err, setErr] = useState<string | null>(null);

  React.useEffect(() => {
    if (open) {
      setT(initial?.title || "");
      setD(initial?.description || "");
      setC(initial?.category || CATEGORIES[0]);
      setUrl(initial?.imageUrl || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80");
      setErr(null);
    }
  }, [open, initial]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!t.trim() || !d.trim() || !url.trim()) {
      setErr("Semua field wajib diisi.");
      return;
    }
    onSubmit({ title: t.trim(), description: d.trim(), category: c, imageUrl: url.trim() });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Proyek akan otomatis tampil di halaman portofolio.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="title">Judul Proyek</Label>
              <Input id="title" value={t} onChange={(e) => setT(e.target.value)} placeholder="cth: Renovasi Bangunan Kantor" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cat">Kategori</Label>
              <Select id="cat" value={c} onChange={(e) => setC(e.target.value)}>
                {CATEGORIES.map((o) => <option key={o} value={o}>{o}</option>)}
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="img">URL Gambar</Label>
              <Input id="img" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." />
            </div>
            <div className="sm:col-span-2 space-y-1.5">
              <Label>Preview</Label>
              <div className="relative h-32 rounded-md overflow-hidden border border-brand-border bg-slate-50">
                {url ? (
                  <Image src={url} alt="preview" fill unoptimized sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" onError={(e) => ((e.target as HTMLImageElement).style.display = "none")} />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-brand-muted text-xs">
                    <ImageIcon className="h-5 w-5 mr-2" /> Masukkan URL gambar
                  </div>
                )}
              </div>
            </div>
            <div className="sm:col-span-2 space-y-1.5">
              <Label htmlFor="desc">Deskripsi</Label>
              <Textarea id="desc" rows={4} value={d} onChange={(e) => setD(e.target.value)} placeholder="Deskripsi singkat proyek." />
            </div>
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
