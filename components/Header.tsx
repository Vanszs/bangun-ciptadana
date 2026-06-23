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
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-brand-border">
      <div className="max-w-[1240px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="hover:opacity-80 flex items-center transition-opacity focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-2 rounded">
          <Logo variant="light" showText />
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Main">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-2 rounded ${
                  active ? "text-brand-primary" : "text-brand-text hover:text-brand-primary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          className="hidden md:flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white h-10 px-5 rounded-md text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
        >
          <Phone className="w-4 h-4" aria-hidden="true" />
          Hubungi Kami
        </Link>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-brand-text p-2 rounded-md hover:bg-brand-bg focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-2"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          {mobileOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
        </button>
      </div>

      {mobileOpen && (
        <nav id="mobile-nav" className="md:hidden bg-white border-t border-brand-border px-4 pb-4" aria-label="Mobile">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`block px-3 py-2 rounded-md text-sm font-medium focus-visible:outline-2 focus-visible:outline-brand-primary ${
                  active ? "bg-brand-primary/10 text-brand-primary" : "text-brand-text hover:bg-brand-bg hover:text-brand-primary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 bg-brand-primary text-white h-11 rounded-md text-sm font-semibold focus-visible:outline-2 focus-visible:outline-brand-primary"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            Hubungi Kami
          </Link>
        </nav>
      )}
    </header>
  );
}
