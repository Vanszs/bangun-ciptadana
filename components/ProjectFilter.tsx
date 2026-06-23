"use client";

import { useState, useMemo } from "react";
import { Plus, ArrowRight } from "lucide-react";
import type { ProjectItem } from "@/data/types";

interface Props { projects: ProjectItem[]; }

export default function ProjectFilter({ projects }: Props) {
  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => set.add(p.category));
    return ["Semua", ...Array.from(set)];
  }, [projects]);

  const [selected, setSelected] = useState("Semua");
  const filtered = selected === "Semua" ? projects : projects.filter((p) => p.category.toLowerCase() === selected.toLowerCase());

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8" role="group" aria-label="Filter proyek">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`px-4 py-2 rounded-sm text-xs font-medium transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-brand-primary ${
              selected === cat ? "bg-brand-primary text-white" : "bg-brand-bg text-brand-muted border border-brand-border hover:border-brand-primary hover:text-brand-primary"
            }`}
            aria-pressed={selected === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((project) => (
          <div key={project.id} className="bg-white rounded-md overflow-hidden border border-brand-border/50 hover:border-brand-secondary/30 transition-colors duration-150 flex flex-col group">
            <div className="w-full h-40 overflow-hidden relative bg-slate-100">
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/30 transition-colors duration-150 z-10" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-20">
                <div className="w-9 h-9 rounded-full bg-brand-primary text-white flex items-center justify-center"><Plus className="w-4 h-4" aria-hidden="true" /></div>
              </div>
              <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover object-center select-none" referrerPolicy="no-referrer" />
            </div>
            <div className="p-4 flex flex-col flex-grow text-left">
              <span className="text-[11px] font-medium text-brand-secondary uppercase tracking-wide block mb-1">{project.category}</span>
              <h3 className="font-semibold text-brand-text text-sm group-hover:text-brand-primary transition-colors mb-1 truncate">{project.title}</h3>
              <p className="text-brand-muted text-xs leading-relaxed line-clamp-2">{project.description}</p>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center text-brand-muted text-sm border border-dashed border-brand-border rounded-md mt-6">
          Belum ada proyek kategori &ldquo;{selected}&rdquo;.
        </div>
      )}

      <div className="mt-8 text-center">
        <button
          onClick={() => setSelected("Semua")}
          className="inline-flex items-center gap-2 bg-brand-secondary hover:bg-brand-secondary-dark text-white px-5 h-10 rounded-md text-sm font-semibold transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary"
        >
          Lihat Semua Proyek <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </>
  );
}
