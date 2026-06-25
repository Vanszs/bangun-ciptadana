"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import type { CompanyProfile } from "@/data/store";

const NAV_LINKS = [
  { label: "Beranda", href: "/" },
  { label: "Tentang", href: "/about" },
  { label: "Layanan", href: "/services" },
  { label: "Proyek", href: "/projects" },
  { label: "Kontak", href: "/contact" },
];

export default function Footer({ profile }: { profile: CompanyProfile }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="bg-[#09090B] text-zinc-400 py-16 px-6 md:px-12 border-t border-zinc-900" id="app-footer">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8" id="footer-container">
        {/* Left: Brand */}
        <div className="flex flex-col items-center md:items-start" id="footer-logo-col">
          <Link
            href="/"
            className="hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-brand-primary rounded self-start block"
          >
            <Logo variant="footer" showText />
          </Link>
          <p className="font-sans text-[11px] text-zinc-500 mt-2 max-w-xs text-center md:text-left">
            {profile.tagline} — {profile.description.slice(0, 80)}...
          </p>
        </div>

        {/* Middle: Links */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10" id="footer-links-col">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group inline-flex items-center gap-1 font-sans text-xs font-medium text-zinc-400 hover:text-white transition-colors"
            >
              {link.label}
              <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" aria-hidden="true" />
            </Link>
          ))}
        </div>

        {/* Right: Contact & Copyright */}
        <div className="text-center md:text-right space-y-2" id="footer-copy-col">
          <ul className="space-y-1.5 text-[11px] text-zinc-500">
            <li className="flex items-center justify-center md:justify-end gap-1.5">
              <Phone className="w-3 h-3" />
              {profile.phone}
            </li>
            <li className="flex items-center justify-center md:justify-end gap-1.5">
              <Mail className="w-3 h-3" />
              {profile.email}
            </li>
            <li className="flex items-center justify-center md:justify-start md:justify-end gap-1.5">
              <MapPin className="w-3 h-3" />
              {profile.address}
            </li>
          </ul>
          <p className="font-sans text-[11px] text-zinc-600 pt-2">
            &copy; {new Date().getFullYear()} Bangun Ciptadana. Hak cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
