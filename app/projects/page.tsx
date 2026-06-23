"use client";

import { useState } from "react";
import HeroBanner from "@/components/HeroBanner";
import { PROJECTS_DATA } from "@/data/data";
import { Plus, ArrowRight } from "lucide-react";

const CATEGORIES = ["Semua", "Aluminium & Kaca", "Renovasi", "Interior", "Partisi", "Atap & Kanopi", "Kelistrikan", "Konstruksi Bangunan"];

export default function ProjectsPage() {
  const [selected, setSelected] = useState("Semua");
  const filtered = selected === "Semua" ? PROJECTS_DATA : PROJECTS_DATA.filter((p) => p.category.toLowerCase() === selected.toLowerCase());

  return (
    <div className="flex flex-col w-full text-left">
      <HeroBanner title="Projects" backgroundImage="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1440&q=80" />

      <section className="py-20 bg-white">
        <div className="max-w-[1240px] mx-auto px-4">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold tracking-widest text-brand-secondary uppercase block mb-2">Galeri Proyek</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-text mb-4 uppercase">Portfolio Terbaru Kami</h2>
            <p className="text-brand-muted text-xs sm:text-sm leading-relaxed">Bukti komitmen konstruksi nyata Bangun Ciptadana dalam mengawal pengerjaan bangunan dengan presisi kualitas tinggi.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setSelected(cat)} className={`px-5 py-2.5 rounded-md text-xs font-bold tracking-wide transition-colors duration-200 cursor-pointer ${selected === cat ? "bg-brand-primary text-white shadow-md" : "bg-brand-bg text-brand-muted border border-brand-border/60 hover:border-brand-primary hover:text-brand-primary"}`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {filtered.map((project) => (
              <div key={project.id} className="bg-white rounded-lg overflow-hidden border border-brand-border/40 hover:border-brand-secondary/30 transition-colors duration-200 shadow-sm flex flex-col group">
                <div className="w-full h-44 overflow-hidden relative bg-slate-100">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-200 z-10" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                    <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center"><Plus className="w-5 h-5" /></div>
                  </div>
                  <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover object-center select-none group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                </div>
                <div className="p-5 flex flex-col flex-grow text-left">
                  <span className="text-[10px] font-bold tracking-widest text-brand-secondary uppercase block mb-1">{project.category}</span>
                  <h3 className="font-bold text-brand-text text-sm sm:text-base group-hover:text-brand-primary transition-colors mb-2 truncate">{project.title}</h3>
                  <p className="text-brand-muted text-xs leading-relaxed line-clamp-2">{project.description}</p>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-16 text-center text-brand-muted text-xs sm:text-sm border border-dashed border-brand-border/80 rounded-lg mt-8">Belum ada proyek ber-kategori "{selected}" untuk ditampilkan.</div>
          )}

          <div className="mt-12 text-center flex justify-center">
            <button onClick={() => { setSelected("Semua"); }} className="inline-flex items-center gap-2 bg-brand-secondary hover:bg-brand-secondary-dark text-white px-8 h-14 rounded-md text-sm font-bold tracking-wide transition-colors duration-200 shadow-md cursor-pointer justify-center">
              Lihat Semua Proyek <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
