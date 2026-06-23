"use client";

import { useState } from "react";
import HeroBanner from "@/components/HeroBanner";
import { Phone, Mail, MessageSquare, Instagram, MapPin, Send, CheckCircle2 } from "lucide-react";

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

export default function ContactPage() {
  const [formData, setFormData] = useState({ nama: "", email: "", phone: "", jobType: "Konstruksi Bangunan", pesan: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama || !formData.phone) { alert("Mohon lengkapi Nama Lengkap dan Nomor HP Anda."); return; }
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({ nama: "", email: "", phone: "", jobType: "Konstruksi Bangunan", pesan: "" });
    setSubmitted(false);
  };

  return (
    <div className="flex flex-col w-full text-left">
      <HeroBanner title="Contact Us" backgroundImage="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1440&q=80" />

      <section className="py-20 bg-white">
        <div className="max-w-[1240px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 text-left">
              <span className="text-xs font-bold tracking-widest text-brand-secondary uppercase block mb-1">Hubungi Kami</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-text mb-6 uppercase leading-tight">Dapatkan Konsultasi Gratis</h2>
              <p className="text-brand-muted text-xs sm:text-sm leading-relaxed mb-8">Sampaikan rencana pembangunan, renovasi, atau interior Anda kepada kami. Tim konstruksi ahli Bangun Ciptadana siap memberikan solusi teknis terbaik beserta estimasi anggaran transparan yang realistis.</p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg border border-brand-secondary/20 bg-brand-secondary/5 flex items-center justify-center shrink-0"><Phone className="w-5 h-5 text-brand-secondary" /></div>
                  <div className="text-left"><div className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Telepon Kantor</div><div className="text-brand-text font-bold text-base sm:text-lg">+62 xxxx xxxx xxxx</div></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg border border-brand-primary/20 bg-brand-primary/5 flex items-center justify-center shrink-0"><Mail className="w-5 h-5 text-brand-primary" /></div>
                  <div className="text-left"><div className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Email Bisnis</div><a href="mailto:info@bangunciptadana.com" className="text-brand-text font-bold text-base sm:text-lg hover:text-brand-primary transition-colors">info@bangunciptadana.com</a></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg border border-brand-secondary/20 bg-brand-secondary/5 flex items-center justify-center shrink-0"><MessageSquare className="w-5 h-5 text-brand-secondary" /></div>
                  <div className="text-left"><div className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Aduan WhatsApp</div><div className="text-brand-text font-bold text-base sm:text-lg">+62 xxxx xxxx xxxx</div></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg border border-brand-primary/20 bg-brand-primary/5 flex items-center justify-center shrink-0"><Instagram className="w-5 h-5 text-brand-primary" /></div>
                  <div className="text-left"><div className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Instagram Utama</div><div className="text-brand-text font-bold text-base sm:text-lg">@bangunciptadana</div></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg border border-brand-secondary/20 bg-brand-secondary/5 flex items-center justify-center shrink-0"><MapPin className="w-5 h-5 text-brand-secondary" /></div>
                  <div className="text-left"><div className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Alamat Kantor Pusat</div><div className="text-brand-text font-bold text-xs sm:text-sm leading-snug">Jl. XXXXXXXX No. XX, Kota XXXXX</div></div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-white p-8 sm:p-10 rounded-lg border border-brand-border/60 shadow-[0_20px_40px_rgba(7,20,43,0.06)]">
                {submitted ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 rounded-full bg-brand-secondary/15 flex items-center justify-center mx-auto mb-6"><CheckCircle2 className="w-10 h-10 text-brand-secondary" /></div>
                    <h3 className="text-2xl font-extrabold text-brand-text uppercase tracking-wide mb-3">Konsultasi Terkirim!</h3>
                    <p className="text-brand-muted text-xs sm:text-sm leading-relaxed max-w-sm mx-auto mb-8">Terima kasih <strong className="text-brand-text">{formData.nama}</strong>. Pengajuan rencana pengerjaan <strong className="text-brand-text">{formData.jobType}</strong> Anda berhasil terdaftar. Perwakilan kami akan membalas via HP (<strong className="text-brand-text">{formData.phone}</strong>) dalam waktu maksimal 24 jam.</p>
                    <button onClick={handleReset} className="inline-flex items-center justify-center h-14 px-8 bg-brand-primary hover:bg-brand-primary-dark text-white font-bold rounded-md text-sm tracking-wide transition-colors duration-200 cursor-pointer">Kirim Konsultasi Lain</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h3 className="text-xl font-bold text-brand-text border-b border-brand-border/60 pb-4 uppercase tracking-wide text-left">Formulir Konsultasi Proyek</h3>
                    <div className="text-left">
                      <label htmlFor="form-nama" className="block text-[10px] font-bold text-brand-text uppercase tracking-widest mb-2">Nama Lengkap *</label>
                      <input id="form-nama" type="text" required placeholder="Masukkan nama lengkap Anda" value={formData.nama} onChange={(e) => setFormData({ ...formData, nama: e.target.value })} className="w-full bg-brand-bg border border-brand-border/80 focus:border-brand-primary focus:bg-white rounded-md px-4 py-3 text-xs sm:text-sm text-brand-text transition-colors outline-none" />
                    </div>
                    <div className="text-left">
                      <label htmlFor="form-email" className="block text-[10px] font-bold text-brand-text uppercase tracking-widest mb-2">Email</label>
                      <input id="form-email" type="email" placeholder="email@contoh.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-brand-bg border border-brand-border/80 focus:border-brand-primary focus:bg-white rounded-md px-4 py-3 text-xs sm:text-sm text-brand-text transition-colors outline-none" />
                    </div>
                    <div className="text-left">
                      <label htmlFor="form-phone" className="block text-[10px] font-bold text-brand-text uppercase tracking-widest mb-2">Nomor HP / WhatsApp *</label>
                      <input id="form-phone" type="tel" required placeholder="08xx xxxx xxxx" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-brand-bg border border-brand-border/80 focus:border-brand-primary focus:bg-white rounded-md px-4 py-3 text-xs sm:text-sm text-brand-text transition-colors outline-none" />
                    </div>
                    <div className="text-left">
                      <label htmlFor="form-job" className="block text-[10px] font-bold text-brand-text uppercase tracking-widest mb-2">Jenis Pekerjaan</label>
                      <select id="form-job" value={formData.jobType} onChange={(e) => setFormData({ ...formData, jobType: e.target.value })} className="w-full bg-brand-bg border border-brand-border/80 focus:border-brand-primary focus:bg-white rounded-md px-4 py-3 text-xs sm:text-sm text-brand-text transition-colors outline-none cursor-pointer">
                        {JOB_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    </div>
                    <div className="text-left">
                      <label htmlFor="form-pesan" className="block text-[10px] font-bold text-brand-text uppercase tracking-widest mb-2">Pesan / Detail Kebutuhan Proyek</label>
                      <textarea id="form-pesan" rows={4} placeholder="Tulis spesifikasi ruangan, ukuran, daerah proyek, atau pertanyaan Anda di sini..." value={formData.pesan} onChange={(e) => setFormData({ ...formData, pesan: e.target.value })} className="w-full bg-brand-bg border border-brand-border/80 focus:border-brand-primary focus:bg-white rounded-md px-4 py-3 text-xs sm:text-sm text-brand-text transition-colors outline-none resize-none" />
                    </div>
                    <button type="submit" className="w-full flex items-center justify-center gap-2 h-14 bg-brand-primary hover:bg-brand-primary-dark text-white font-bold rounded-md text-sm tracking-wide transition-colors duration-200 cursor-pointer shadow-md">
                      Kirim Konsultasi <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
