"use client";

import { useState } from "react";
import Image from "next/image";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";
import { Pencil, Trash2, Plus, Eye, Image as ImageIcon, Save, Loader2, GripVertical } from "lucide-react";
import type { HeroSlide } from "@/data/types";

const INITIAL_SLIDES: HeroSlide[] = [
  {
    id: "1",
    imageUrl: "/images/dnoin/hero_bg_1782401296715.jpg",
    titleLight: "Bangun",
    titleItalic: "Ciptadana",
    subText: "Mitra konstruksi terpercaya untuk proyek komersial, residensial, renovasi, interior, aluminium & kaca di seluruh Indonesia.",
    rightHeading: "Kualitas yang Terukur",
    rightText: "Dari perencanaan hingga serah terima, setiap detail dikerjakan oleh tenaga teknik sipil & arsitektural berpengalaman.",
  },
  {
    id: "2",
    imageUrl: "/images/dnoin/project_1_1782401315964.jpg",
    titleLight: "Konstruksi",
    titleItalic: "Berkelas",
    subText: "Material SNI, proses transparan, dan garansi tertulis menjadi standar setiap proyek yang kami kerjakan.",
    rightHeading: "Timeline Tepat",
    rightText: "Manajemen proyek profesional memastikan pembangunan berjalan sesuai rencana anggaran dan waktu yang disepakati.",
  },
  {
    id: "3",
    imageUrl: "/images/dnoin/project_2_1782401340614.jpg",
    titleLight: "Renovasi &",
    titleItalic: "Interior",
    subText: "Transformasi ruang hunian dan komersial menjadi lebih fungsional, estetis, dan bernilai tinggi.",
    rightHeading: "Desain Fungsional",
    rightText: "Solusi desain interior yang mengutamakan kenyamanan penghuni, efisiensi ruang, dan estetika berkelanjutan.",
  },
];

export default function AdminHeroPage() {
  const [slides, setSlides] = useState<HeroSlide[]>(INITIAL_SLIDES);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const { toast } = useToast();

  function updateSlide(id: string, patch: Partial<HeroSlide>) {
    setSlides((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  }

  function addSlide() {
    const next = String(slides.length + 1);
    const newId = crypto.randomUUID();
    setSlides((prev) => [
      ...prev,
      {
        id: newId,
        imageUrl: "",
        titleLight: `Slide ${next}`,
        titleItalic: "Baru",
        subText: "",
        rightHeading: "",
        rightText: "",
      },
    ]);
    setEditingId(newId);
  }

  function removeSlide(id: string) {
    setSlides((prev) => prev.filter((s) => s.id !== id));
    if (editingId === id) setEditingId(null);
  }

  async function saveAll() {
    setBusy(true);
    // TODO: integrate with backend API
    await new Promise((r) => setTimeout(r, 600));
    setBusy(false);
    toast({ title: "Slide disimpan", description: "Backend integration pending", variant: "success" });
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <AdminPageHeader
        title="Hero Section"
        description="Kelola slide carousel di halaman utama."
        actions={
          <Button onClick={addSlide} variant="outline">
            <Plus className="h-4 w-4 mr-1.5" /> Tambah Slide
          </Button>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {slides.map((slide, index) => (
          <Card key={slide.id} className={editingId === slide.id ? "ring-2 ring-brand-primary" : ""}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-4 w-4 text-brand-muted" />
                  <div>
                    <CardTitle className="text-sm font-semibold">
                      Slide {index + 1}: {slide.titleLight} {slide.titleItalic}
                    </CardTitle>
                    <CardDescription className="text-[11px]">{slide.imageUrl || "Belum ada gambar"}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setEditingId(editingId === slide.id ? null : slide.id)}>
                    {editingId === slide.id ? <Eye className="h-3.5 w-3.5" /> : <Pencil className="h-3.5 w-3.5" />}
                  </Button>
                  <Button size="icon" variant="ghost" className="h-7 w-7 text-red-600 hover:bg-red-50" onClick={() => removeSlide(slide.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="relative aspect-video rounded-lg bg-slate-100 border border-brand-border overflow-hidden">
                {slide.imageUrl ? (
                  <Image src={slide.imageUrl} alt={slide.titleLight} fill sizes="(max-width: 1280px) 50vw, 50vw" unoptimized className="object-cover" />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-brand-muted">
                    <ImageIcon className="h-8 w-8 mb-2 opacity-40" />
                    <span className="text-xs">Preview gambar</span>
                  </div>
                )}
              </div>

              {editingId === slide.id && (
                <div className="space-y-3 pt-2 border-t border-brand-border">
                  <div className="space-y-1">
                    <Label className="text-xs">URL Gambar Background</Label>
                    <Input value={slide.imageUrl} onChange={(e) => updateSlide(slide.id, { imageUrl: e.target.value })} placeholder="/images/dnoin/hero_bg.jpg" className="h-9 text-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs">Headline Utama</Label>
                      <Input value={slide.titleLight} onChange={(e) => updateSlide(slide.id, { titleLight: e.target.value })} className="h-9 text-sm" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Headline Italic</Label>
                      <Input value={slide.titleItalic} onChange={(e) => updateSlide(slide.id, { titleItalic: e.target.value })} className="h-9 text-sm" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Microcopy Atas</Label>
                    <Textarea value={slide.subText} onChange={(e) => updateSlide(slide.id, { subText: e.target.value })} rows={2} className="text-sm" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Judul Kanan Bawah</Label>
                    <Input value={slide.rightHeading} onChange={(e) => updateSlide(slide.id, { rightHeading: e.target.value })} className="h-9 text-sm" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Deskripsi Kanan Bawah</Label>
                    <Textarea value={slide.rightText} onChange={(e) => updateSlide(slide.id, { rightText: e.target.value })} rows={2} className="text-sm" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {slides.length === 0 && (
        <div className="rounded-lg border border-dashed border-brand-border bg-white p-10 text-center">
          <p className="text-sm text-brand-muted">Belum ada slide. Klik tombol di atas untuk menambahkan.</p>
        </div>
      )}

      <div className="flex justify-end pt-4 border-t border-brand-border">
        <Button onClick={saveAll} disabled={busy} className="min-w-[140px]">
          {busy ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          Simpan Slide
        </Button>
      </div>
    </div>
  );
}
