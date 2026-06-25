"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import type { CompanyProfile } from "@/data/store";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export default function Footer({ profile }: { profile: CompanyProfile }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="bg-[#0F1E36] text-slate-100 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand col — spans 2 on md */}
          <div className="md:col-span-2 space-y-6">
            <Link
              href="/"
              className="hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-brand-primary rounded self-start block"
            >
              <Logo variant="footer" showText />
            </Link>
            <p className="text-slate-350 text-sm font-light leading-relaxed max-w-xs">
              Solusi konstruksi profesional — sipil, renovasi, interior, aluminium &amp; kaca — dengan kualitas premium dan tim bersertifikat SNI.
            </p>
            {/* Tagline badge */}
            <span className="inline-flex items-center gap-2 border border-brand-secondary/30 text-brand-secondary text-[11px] font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full bg-brand-secondary/5">
              {profile.tagline}
            </span>
          </div>

          {/* Nav col */}
          <div className="space-y-5">
            <h4 className="font-semibold text-xs uppercase tracking-widest text-white">
              Navigasi
            </h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center gap-1 text-sm text-slate-400 hover:text-brand-secondary transition-colors font-light focus-visible:outline-2 focus-visible:outline-brand-primary rounded"
                  >
                    {l.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:text-brand-secondary transition-all" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact col */}
          <div className="space-y-5">
            <h4 className="font-semibold text-xs uppercase tracking-widest text-white">
              Kontak
            </h4>
            <ul className="space-y-4 text-sm text-slate-400 font-light">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-secondary shrink-0 mt-0.5" aria-hidden="true" />
                <span className="leading-relaxed">{profile.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-secondary shrink-0" aria-hidden="true" />
                <span>{profile.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-secondary shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${profile.email}`}
                  className="hover:text-brand-secondary transition-colors focus-visible:outline-2 focus-visible:outline-brand-primary rounded"
                >
                  {profile.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 font-light">
          <p>&copy; {new Date().getFullYear()} Bangun Ciptadana. Hak cipta dilindungi.</p>
          <p>Konstruksi · Atap · Aluminium · Kaca · Interior</p>
        </div>
      </div>
    </footer>
  );
}
