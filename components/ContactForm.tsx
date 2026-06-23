"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

const JOB_OPTIONS = [
  "Konstruksi Bangunan",
  "Atap dan Kanopi",
  "Partisi",
  "Desain Arsitektur",
  "Aluminium",
  "Renovasi dan Perluasan",
  "Pengecatan",
  "Kaca dan Kelistrikan",
  "Interior",
];

interface FormData {
  nama: string;
  email: string;
  phone: string;
  jobType: string;
  pesan: string;
}

type FieldErrors = Partial<Record<keyof FormData, string>>;

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    nama: "", email: "", phone: "", jobType: "Konstruksi Bangunan", pesan: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = (): FieldErrors => {
    const e: FieldErrors = {};
    if (!formData.nama.trim()) e.nama = "Nama lengkap wajib diisi";
    if (!formData.phone.trim()) e.phone = "Nomor HP wajib diisi";
    else if (!/^[0-9+\-\s]{8,15}$/.test(formData.phone.trim())) e.phone = "Nomor HP tidak valid";
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Format email tidak valid";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({ nama: "", email: "", phone: "", jobType: "Konstruksi Bangunan", pesan: "" });
    setErrors({});
    setSubmitted(false);
  };

  const inputCls = (field: keyof FormData) =>
    `w-full bg-white border rounded-md px-3 py-2 text-sm text-brand-text transition-colors outline-none focus:border-brand-primary ${
      errors[field] ? "border-red-400" : "border-brand-border"
    }`;

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-14 h-14 rounded-full bg-brand-secondary/10 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-brand-secondary" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-bold text-brand-text mb-2">Konsultasi Terkirim!</h3>
        <p className="text-brand-muted text-sm leading-relaxed max-w-sm mx-auto mb-6">
          Terima kasih <strong className="text-brand-text">{formData.nama}</strong>. Pengajuan {formData.jobType} berhasil terdaftar. Tim kami akan menghubungi via {formData.phone} dalam 24 jam.
        </p>
        <button onClick={handleReset} className="inline-flex items-center justify-center h-10 px-5 bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold rounded-md text-sm transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary">
          Kirim Konsultasi Lain
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="text-left">
        <label htmlFor="form-nama" className="block text-xs font-medium text-brand-text mb-1.5">Nama Lengkap *</label>
        <input id="form-nama" type="text" required value={formData.nama} onChange={(e) => { setFormData({ ...formData, nama: e.target.value }); setErrors({ ...errors, nama: undefined }); }} placeholder="Masukkan nama lengkap" className={inputCls("nama")} aria-invalid={!!errors.nama} aria-describedby={errors.nama ? "err-nama" : undefined} />
        {errors.nama && <p id="err-nama" className="text-xs text-red-500 mt-1">{errors.nama}</p>}
      </div>
      <div className="text-left">
        <label htmlFor="form-email" className="block text-xs font-medium text-brand-text mb-1.5">Email</label>
        <input id="form-email" type="email" value={formData.email} onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setErrors({ ...errors, email: undefined }); }} placeholder="email@contoh.com" className={inputCls("email")} aria-invalid={!!errors.email} aria-describedby={errors.email ? "err-email" : undefined} />
        {errors.email && <p id="err-email" className="text-xs text-red-500 mt-1">{errors.email}</p>}
      </div>
      <div className="text-left">
        <label htmlFor="form-phone" className="block text-xs font-medium text-brand-text mb-1.5">Nomor HP / WhatsApp *</label>
        <input id="form-phone" type="tel" required value={formData.phone} onChange={(e) => { setFormData({ ...formData, phone: e.target.value }); setErrors({ ...errors, phone: undefined }); }} placeholder="08xx xxxx xxxx" className={inputCls("phone")} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "err-phone" : undefined} />
        {errors.phone && <p id="err-phone" className="text-xs text-red-500 mt-1">{errors.phone}</p>}
      </div>
      <div className="text-left">
        <label htmlFor="form-job" className="block text-xs font-medium text-brand-text mb-1.5">Jenis Pekerjaan</label>
        <select id="form-job" value={formData.jobType} onChange={(e) => setFormData({ ...formData, jobType: e.target.value })} className="w-full bg-white border border-brand-border rounded-md px-3 py-2 text-sm text-brand-text transition-colors outline-none focus:border-brand-primary cursor-pointer">
          {JOB_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>
      <div className="text-left">
        <label htmlFor="form-pesan" className="block text-xs font-medium text-brand-text mb-1.5">Pesan / Detail Kebutuhan</label>
        <textarea id="form-pesan" rows={4} value={formData.pesan} onChange={(e) => setFormData({ ...formData, pesan: e.target.value })} placeholder="Spesifikasi ruangan, ukuran, daerah proyek..." className="w-full bg-white border border-brand-border rounded-md px-3 py-2 text-sm text-brand-text transition-colors outline-none focus:border-brand-primary resize-none" />
      </div>
      <button type="submit" disabled={submitting} className="w-full flex items-center justify-center gap-2 h-10 bg-brand-primary hover:bg-brand-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-md text-sm transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary">
        {submitting ? "Mengirim..." : <>Kirim Konsultasi <Send className="w-4 h-4" aria-hidden="true" /></>}
      </button>
    </form>
  );
}
