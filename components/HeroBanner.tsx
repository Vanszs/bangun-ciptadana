"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

export default function HeroBanner({
  title,
  titleItalic,
  backgroundImage,
}: {
  title: string;
  titleItalic?: string;
  backgroundImage?: string;
}) {
  return (
    <div className="relative h-[60vh] min-h-[420px] max-h-[620px] flex items-end overflow-hidden bg-black">
      <Image
        src={
          backgroundImage ||
          "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1440&q=80"
        }
        alt={`${title} - Bangun Ciptadana`}
        fill
        sizes="100vw"
        className="object-cover object-center select-none"
        priority
        unoptimized
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/70 z-10" />

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-zinc-300 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Beranda
            </Link>
            <span className="text-zinc-500" aria-hidden="true">/</span>
            <span className="text-white font-medium">{title}</span>
          </div>

          {/* Title */}
          <h1 className="text-white leading-none flex flex-wrap items-center gap-x-4">
            <span className="font-sans font-bold uppercase tracking-tight text-4xl md:text-6xl lg:text-7xl">
              {title}
            </span>
            {titleItalic && (
              <span className="font-serif italic font-normal text-4xl md:text-6xl lg:text-7xl text-white/85">
                {titleItalic}
              </span>
            )}
          </h1>
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-20 w-full select-none pointer-events-none">
        <svg
          className="w-full h-[60px] sm:h-[80px] md:h-[100px] text-brand-bg"
          viewBox="0 0 1440 100"
          fill="currentColor"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M 0 100 L 0 60 L 430 60 C 480 60, 490 10, 545 10 L 895 10 C 950 10, 960 60, 1010 60 L 1440 60 L 1440 100 Z" />
        </svg>
      </div>
    </div>
  );
}
