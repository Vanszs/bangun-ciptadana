"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { MapPin, ArrowUpRight } from "lucide-react";
import type { ProjectItem } from "@/data/types";
import AnimatedSection from "@/components/AnimatedSection";

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
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12" role="group" aria-label="Filter proyek">
        {categories.map((cat) => (
          <button
            type="button"
            key={cat}
            onClick={() => setSelected(cat)}
            className={`px-5 py-2 rounded-full text-xs font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-brand-primary ${
              selected === cat
                ? "bg-zinc-950 text-white"
                : "bg-white text-zinc-700 border border-brand-border hover:border-zinc-950 hover:text-zinc-950"
            }`}
            aria-pressed={selected === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((project, index) => (
          <AnimatedSection
            key={project.id}
            delay={index * 0.1}
            className="group relative flex flex-col overflow-hidden bg-zinc-100 rounded-2xl shadow-sm cursor-pointer"
          >
            <div className="relative w-full aspect-[3/4] overflow-hidden">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                unoptimized
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Custom top-left SVG mask */}
              <div className="absolute top-0 left-0 w-[140px] h-[30px] text-brand-bg select-none pointer-events-none">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 140 30"
                  fill="currentColor"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M 0 0 L 0 30 C 50 30, 80 0, 140 0 Z" />
                </svg>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Floating caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-zinc-300 uppercase mb-1">
                  <MapPin className="w-3 h-3" />
                  {project.category}
                </div>
                <h4 className="font-sans font-bold text-white text-lg tracking-tight leading-snug">
                  {project.title}
                </h4>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center text-brand-muted text-sm border border-dashed border-brand-border rounded-md mt-6">
          Belum ada proyek kategori &ldquo;{selected}&rdquo;.
        </div>
      )}

      <div className="mt-12 text-center">
        <button
          type="button"
          onClick={() => setSelected("Semua")}
          className="group inline-flex items-center gap-4 pl-6 pr-1.5 py-1.5 rounded-full border border-zinc-950 hover:bg-zinc-950 hover:text-white text-zinc-950 font-sans text-sm font-medium transition-all duration-300"
        >
          <span>Lihat Semua Proyek</span>
          <span className="w-7 h-7 rounded-full bg-zinc-950 text-white flex items-center justify-center shadow-sm group-hover:bg-white group-hover:text-zinc-950 transition-colors duration-300">
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </span>
        </button>
      </div>
    </>
  );
}
