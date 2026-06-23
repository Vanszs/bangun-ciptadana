"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { Phone, Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Service", href: "/services" },
  { label: "Project", href: "/projects" },
  { label: "Contact Us", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-brand-border/60 shadow-sm">
      <div className="max-w-[1240px] mx-auto px-4 md:px-6 h-[72px] flex items-center justify-between">
        <Link href="/" className="hover:opacity-95 flex items-center transition-opacity">
          <Logo variant="light" showText />
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-semibold transition-colors ${
                  active ? "text-brand-primary" : "text-brand-text hover:text-brand-primary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <a href="/contact" className="hidden md:flex items-center gap-2 bg-[linear-gradient(135deg,#1491D0,#7BC255)] text-white h-10 px-6 rounded-md text-sm font-bold tracking-wide hover:opacity-95 transition-opacity">
          Hubungi Kami <Phone className="w-4 h-4" />
        </a>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-brand-text" aria-label="Toggle menu">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-brand-border/60 px-4 pb-4">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-semibold ${
                  active ? "bg-brand-primary/10 text-brand-primary" : "text-brand-text hover:bg-brand-bg hover:text-brand-primary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <a href="/contact" onClick={() => setMobileOpen(false)} className="mt-2 flex items-center justify-center gap-2 bg-[linear-gradient(135deg,#1491D0,#7BC255)] text-white h-12 rounded-md text-sm font-bold tracking-wide">
            Hubungi Kami <Phone className="w-4 h-4" />
          </a>
        </div>
      )}
    </header>
  );
}
