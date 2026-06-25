"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Slide {
  imageUrl: string;
  titleLight: string;
  titleItalic: string;
  subText: string;
  rightHeading: string;
  rightText: string;
}

const SLIDES: Slide[] = [
  {
    imageUrl: "/images/dnoin/hero_bg_1782401296715.jpg",
    titleLight: "Bangun",
    titleItalic: "Ciptadana",
    subText: "Mitra konstruksi terpercaya untuk proyek komersial, residensial, renovasi, interior, aluminium & kaca di seluruh Indonesia.",
    rightHeading: "Kualitas yang Terukur",
    rightText: "Dari perencanaan hingga serah terima, setiap detail dikerjakan oleh tenaga teknik sipil & arsitektural berpengalaman.",
  },
  {
    imageUrl: "/images/dnoin/project_1_1782401315964.jpg",
    titleLight: "Konstruksi",
    titleItalic: "Berkelas",
    subText: "Material SNI, proses transparan, dan garansi tertulis menjadi standar setiap proyek yang kami kerjakan.",
    rightHeading: "Timeline Tepat",
    rightText: "Manajemen proyek profesional memastikan pembangunan berjalan sesuai rencana anggaran dan waktu yang disepakati.",
  },
  {
    imageUrl: "/images/dnoin/project_2_1782401340614.jpg",
    titleLight: "Renovasi &",
    titleItalic: "Interior",
    subText: "Transformasi ruang hunian dan komersial menjadi lebih fungsional, estetis, dan bernilai tinggi.",
    rightHeading: "Desain Fungsional",
    rightText: "Solusi desain interior yang mengutamakan kenyamanan penghuni, efisiensi ruang, dan estetika berkelanjutan.",
  },
];

export default function HomeHero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const handleGoTo = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    const timer = setInterval(handleNext, 8000);
    return () => clearInterval(timer);
  }, [handleNext, currentIndex]);

  const currentSlide = SLIDES[currentIndex];

  return (
    <section className="relative w-full h-screen min-h-[720px] overflow-hidden bg-black" id="hero-section">
      {/* Background carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={currentSlide.imageUrl}
              alt={currentSlide.titleLight}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/60" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content — locked to a 12-column layout system */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-36 flex flex-col">
        {/* Top row: microcopy anchored to the same left column as headline */}
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.p
                key={`sub-${currentIndex}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-sans text-[11px] md:text-xs font-normal text-zinc-200 leading-relaxed tracking-wide max-w-[320px]"
              >
                {currentSlide.subText}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Flexible spacer pushes bottom content down */}
        <div className="flex-1" />

        {/* Bottom row: headline + CTA left, description right */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-10 items-end">
          {/* Left column: headline + inline CTA */}
          <div className="col-span-12 lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={`main-${currentIndex}`}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
                  exit: { opacity: 0, transition: { duration: 0.35 } },
                }}
              >
                <motion.h1
                  variants={{
                    hidden: { opacity: 0, y: 25 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: "easeOut" } },
                  }}
                  className="font-sans font-bold text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.9] uppercase"
                >
                  {currentSlide.titleLight}
                </motion.h1>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 25 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: "easeOut" } },
                  }}
                  className="flex flex-wrap items-center gap-4 mt-1"
                >
                  <span className="font-serif italic font-normal text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9]">
                    {currentSlide.titleItalic}
                  </span>

                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-3 pl-5 pr-1.5 py-1.5 rounded-full border border-white/30 hover:border-white/80 bg-black/20 hover:bg-white/10 backdrop-blur-sm text-white font-sans text-xs sm:text-sm font-medium transition-all duration-300 shadow-lg"
                  >
                    <span>Hubungi Kami</span>
                    <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white flex items-center justify-center text-zinc-950 shadow-sm group-hover:translate-x-1 transition-transform duration-300">
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </span>
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right column: description block, aligned to right edge */}
          <div className="col-span-12 lg:col-span-4 flex lg:justify-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={`desc-${currentIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="max-w-[320px] text-left lg:text-right"
              >
                <h3 className="font-sans font-bold text-white text-lg sm:text-xl md:text-2xl tracking-tight leading-snug mb-2">
                  {currentSlide.rightHeading}
                </h3>
                <p className="font-sans text-xs sm:text-sm font-normal text-zinc-300 leading-relaxed">
                  {currentSlide.rightText}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom SVG organic wave */}
      <div className="absolute bottom-0 left-0 right-0 z-20 w-full select-none pointer-events-none">
        <svg
          className="w-full h-[90px] sm:h-[110px] md:h-[130px] lg:h-[140px] text-brand-bg"
          viewBox="0 0 1440 140"
          fill="currentColor"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M 0 140 L 0 85 L 430 85 C 480 85, 490 12, 545 12 L 895 12 C 950 12, 960 85, 1010 85 L 1440 85 L 1440 140 Z" />
        </svg>

        {/* Carousel dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center gap-2 pointer-events-auto">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => handleGoTo(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-zinc-950 scale-125"
                  : "bg-zinc-300 hover:bg-zinc-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
