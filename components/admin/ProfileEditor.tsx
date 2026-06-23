"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toast";
import { Loader2, Save } from "lucide-react";
import type { CompanyProfile } from "@/data/store";

interface Props { initial: CompanyProfile; }

export default function ProfileEditor({ initial }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [p, setP] = useState(initial);
  const [busy, setBusy] = useState(false);

  function update<K extends keyof CompanyProfile>(key: K, val: CompanyProfile[K]) {
    setP((prev) => ({ ...prev, [key]: val }));
  }

  async function save() {
    setBusy(true);
    const res = await fetch("/api/admin/profile", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(p) });
    setBusy(false);
    if (!res.ok) { toast({ title: "Gagal menyimpan", variant: "error" }); return; }
    toast({ title: "Profil diperbarui", variant: "success" });
    router.refresh();
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4 rounded-lg border border-brand-border bg-white p-5">
        <h3 className="text-sm font-semibold text-brand-text">Informasi Umum</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="name">Nama Perusahaan</Label>
            <Input id="name" value={p.name} onChange={(e) => update("name", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="tag">Tagline</Label>
            <Input id="tag" value={p.tagline} onChange={(e) => update("tagline", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="year">Tahun Berdiri</Label>
            <Input id="year" value={p.establishedYear} onChange={(e) => update("establishedYear", e.target.value)} />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="desc">Deskripsi Singkat</Label>
            <Textarea id="desc" rows={3} value={p.description} onChange={(e) => update("description", e.target.value)} />
          </div>
        </div>

        <h3 className="text-sm font-semibold text-brand-text pt-3 border-t border-brand-border">Kontak</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="addr">Alamat</Label>
            <Textarea id="addr" rows={2} value={p.address} onChange={(e) => update("address", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone">Telepon</Label>
            <Input id="phone" value={p.phone} onChange={(e) => update("phone", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={p.email} onChange={(e) => update("email", e.target.value)} />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="area">Area Layanan</Label>
            <Input id="area" value={p.serviceArea} onChange={(e) => update("serviceArea", e.target.value)} />
          </div>
        </div>

        <h3 className="text-sm font-semibold text-brand-text pt-3 border-t border-brand-border">Visi & Misi</h3>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="vision">Visi</Label>
            <Textarea id="vision" rows={2} value={p.vision} onChange={(e) => update("vision", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="mission">Misi</Label>
            <Textarea id="mission" rows={3} value={p.mission} onChange={(e) => update("mission", e.target.value)} />
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-brand-border">
          <Button onClick={save} disabled={busy}>
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Simpan Perubahan
          </Button>
        </div>
      </div>

      <div className="lg:sticky lg:top-6 lg:self-start rounded-lg border border-brand-border bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 p-5">
        <h3 className="text-sm font-semibold text-brand-text">Preview Singkat</h3>
        <p className="text-xs text-brand-muted mt-1">Tampilan di landing page</p>
        <div className="mt-4 space-y-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-muted">Tagline</p>
            <p className="text-sm font-bold text-brand-secondary-dark mt-0.5">{p.tagline}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-muted">Nama</p>
            <p className="text-lg font-bold text-brand-text mt-0.5 uppercase tracking-tight">{p.name}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-muted">Deskripsi</p>
            <p className="text-xs text-brand-text/80 mt-1 leading-relaxed">{p.description}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-muted">Kontak</p>
            <p className="text-xs text-brand-text mt-1">{p.phone} • {p.email}</p>
            <p className="text-xs text-brand-muted mt-0.5">{p.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
