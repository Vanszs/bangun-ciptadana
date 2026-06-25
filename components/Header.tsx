"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { ArrowUpRight, Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Service", href: "/services" },
  { label: "Project", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-50 bg-[#F8FAFC] border-b border-[#1E293B]/8 px-4 md:px-6 lg:px-12 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-2 rounded"
        >
          <Logo variant="light" showText />
        </Link>

        {/* Desktop pill nav */}
        <nav
          className="hidden md:flex items-center bg-white border border-brand-border rounded-full px-2 py-1 gap-0.5 shadow-sm"
          aria-label="Main"
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
                aria-current={active ? "page" : undefined}
                className={`relative px-5 py-2 rounded-full text-sm font-semibold tracking-tight transition-all duration-200 focus-visible:outline-2 focus-visible:outline-brand-primary ${
                  active
                    ? "bg-brand-primary text-white shadow-sm shadow-brand-primary/15"
                    : "text-brand-text/75 hover:text-brand-primary hover:bg-brand-primary/5"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Button */}
        <Link
          href="/contact"
          className="hidden md:inline-flex items-center gap-1.5 bg-brand-primary hover:bg-brand-primary-dark text-white text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full transition-all shadow-md hover:shadow-brand-primary/20 group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
        >
          Hubungi Kami
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform duration-300" aria-hidden="true" />
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-[#1E293B] p-2 rounded-full hover:bg-[#1E293B]/5 focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-2"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          {mobileOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav
          id="mobile-nav"
          className="md:hidden border-t border-brand-border mt-3 pt-3 pb-2 flex flex-wrap gap-2 px-2"
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
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold tracking-tight transition-all focus-visible:outline-2 focus-visible:outline-brand-primary ${
                  active
                    ? "bg-brand-primary text-white"
                    : "bg-brand-primary/8 text-brand-primary-dark hover:bg-brand-primary/15"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="flex-shrink-0 inline-flex items-center gap-1 bg-brand-secondary text-white px-4 py-1.5 rounded-full text-xs font-semibold focus-visible:outline-2 focus-visible:outline-brand-primary"
          >
            Hubungi Kami
            <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
          </Link>
        </nav>
      )}
    </header>
  );
}
