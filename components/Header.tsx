"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { motion } from "motion/react";

const NAV_ITEMS = [
  { label: "Beranda", href: "/" },
  { label: "Tentang", href: "/about" },
  { label: "Layanan", href: "/services" },
  { label: "Proyek", href: "/projects" },
  { label: "Kontak", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) return null;

  const isHome = pathname === "/";

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`${isHome ? "absolute" : "sticky bg-brand-surface-soft border-b border-brand-border"} top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-20`}
      id="app-header"
    >
      {/* Brand Logo */}
      {isHome ? (
        <Link
          href="/"
          className="group inline-flex items-center gap-2.5 pl-3 pr-4 py-2 rounded-full bg-white/95 hover:bg-white shadow-md transition-colors focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-2"
          id="brand-logo-container"
        >
          <Logo variant="light" showText={false} size="sm" />
          <div className="flex flex-col leading-none">
            <span className="font-extrabold tracking-wider text-[11px] text-brand-primary-dark">BANGUN</span>
            <span className="font-semibold tracking-widest text-[9px] text-brand-secondary-dark">CIPTADANA</span>
          </div>
        </Link>
      ) : (
        <Link
          href="/"
          className="hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-2 rounded"
          id="brand-logo-container"
        >
          <Logo variant="light" showText />
        </Link>
      )}

      {/* Floating Center Menu */}
      <div className="hidden md:flex relative h-full items-start pt-0" id="center-menu-wrapper">
        <div
          className="relative flex items-center justify-center bg-white px-8 h-12 rounded-b-2xl shadow-md"
          id="center-menu-container"
        >
          {/* Left outward curve mask */}
          <svg
            className="absolute top-0 -left-6 w-6 h-6 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M 0 0 C 16 0, 24 8, 24 24 L 24 0 Z" />
          </svg>

          <nav className="flex items-center space-x-8" id="navigation-bar" aria-label="Main">
            {NAV_ITEMS.map((item, index) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="font-sans text-sm font-medium text-zinc-800 hover:text-black transition-colors relative group py-1"
                  id={`nav-link-${index}`}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full" />
                </Link>
              );
            })}
          </nav>

          {/* Right outward curve mask */}
          <svg
            className="absolute top-0 -right-6 w-6 h-6 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M 24 0 C 8 0, 0 8, 0 24 L 0 0 Z" />
          </svg>
        </div>
      </div>

      {/* Right Action Button */}
      <Link
        href="/contact"
        className={`hidden md:inline-flex group items-center gap-3 pl-5 pr-1.5 py-1.5 rounded-full border transition-all duration-300 text-sm font-medium ${
          isHome
            ? "border-white/30 hover:border-white/80 bg-black/10 hover:bg-white/10 text-white"
            : "border-zinc-950 hover:bg-zinc-950 hover:text-white text-zinc-950 bg-white"
        }`}
        id="header-action-container"
      >
        <span>Konsultasi</span>
        <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-zinc-950 shadow-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
          <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
        </span>
      </Link>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className={`md:hidden p-2 rounded-full transition-colors ${
          isHome ? "text-white hover:bg-white/10" : "text-brand-text hover:bg-black/5"
        }`}
        aria-label="Toggle menu"
        aria-expanded={mobileOpen}
        aria-controls="mobile-nav"
      >
        {mobileOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav
          id="mobile-nav"
          className="absolute top-full left-0 right-0 bg-white border-b border-brand-border shadow-lg py-4 px-6 flex flex-col gap-2 md:hidden"
          aria-label="Mobile"
        >
          {NAV_ITEMS.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-brand-primary text-white"
                    : "text-zinc-800 hover:bg-zinc-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </motion.header>
  );
}
