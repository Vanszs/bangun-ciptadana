"use client";

import { useState } from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";
import { Pencil, Trash2, Plus, Save, Loader2, GripVertical } from "lucide-react";
import type { WorkflowStep } from "@/data/types";

const INITIAL_STEPS: WorkflowStep[] = [
  { id: "1", step: "01", title: "Konsultasi & Survey", description: "Analisis kebutuhan awal dan peninjauan langsung area lokasi proyek." },
  { id: "2", step: "02", title: "Estimasi Biaya & RAB", description: "Penyusunan Rencana Anggaran Biaya terperinci dan transparan." },
  { id: "3", step: "03", title: "Pengerjaan & Kontrak", description: "Kesepakatan tertulis dan pelaksanaan konstruksi diawasi site engineer ahli." },
  { id: "4", step: "04", title: "Serah Terima & Garansi", description: "Pemeriksaan hasil akhir, serah terima, dan garansi pemeliharaan tertulis." },
];

export default function AdminWorkflowPage() {
  const [steps, setSteps] = useState<WorkflowStep[]>(INITIAL_STEPS);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const { toast } = useToast();

  function updateStep(id: string, patch: Partial<WorkflowStep>) {
    setSteps((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  }

  function addStep() {
    const nextNum = String(steps.length + 1).padStart(2, "0");
    setSteps((prev) => [
      ...prev,
      { id: crypto.randomUUID(), step: nextNum, title: "Langkah Baru", description: "" },
    ]);
  }

  function removeStep(id: string) {
    setSteps((prev) => prev.filter((s) => s.id !== id));
    if (editingId === id) setEditingId(null);
  }

  async function saveAll() {
    setBusy(true);
    await new Promise((r) => setTimeout(r, 600));
    setBusy(false);
    toast({ title: "Proses kerja disimpan", description: "Backend integration pending", variant: "success" });
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <AdminPageHeader
        title="Proses Kerja"
        description="Kelola 4 langkah proses kerja yang tampil di halaman Layanan."
        actions={
          <Button onClick={addStep} variant="outline">
            <Plus className="h-4 w-4 mr-1.5" /> Tambah Langkah
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {steps.map((s, index) => (
          <Card key={s.id} className={editingId === s.id ? "ring-2 ring-brand-primary" : ""}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-4 w-4 text-brand-muted" />
                  <div>
                    <CardTitle className="text-sm font-semibold">
                      <span className="text-brand-muted mr-2">{s.step}</span>
                      {s.title}
                    </CardTitle>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setEditingId(editingId === s.id ? null : s.id)}>
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-7 w-7 text-red-600 hover:bg-red-50" onClick={() => removeStep(s.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <p className="text-xs text-brand-muted leading-relaxed">{s.description || <span className="italic">Belum ada deskripsi</span>}</p>

              {editingId === s.id && (
                <div className="space-y-3 pt-3 border-t border-brand-border">
                  <div className="grid grid-cols-[80px_1fr] gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs">Nomor</Label>
                      <Input value={s.step} onChange={(e) => updateStep(s.id, { step: e.target.value })} className="h-9 text-sm" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Judul</Label>
                      <Input value={s.title} onChange={(e) => updateStep(s.id, { title: e.target.value })} className="h-9 text-sm" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Deskripsi</Label>
                    <Textarea value={s.description} onChange={(e) => updateStep(s.id, { description: e.target.value })} rows={3} className="text-sm" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end pt-4 border-t border-brand-border">
        <Button onClick={saveAll} disabled={busy} className="min-w-[140px]">
          {busy ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          Simpan Proses Kerja
        </Button>
      </div>
    </div>
  );
}
