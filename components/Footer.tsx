import Link from "next/link";
import Logo from "./Logo";
import { MapPin, Phone, Mail, Award } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#071424] border-t border-slate-800 text-slate-100">
      <div className="max-w-[1240px] mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col gap-4">
            <Link href="/" className="hover:opacity-80 self-start transition-opacity focus-visible:outline-2 focus-visible:outline-brand-primary rounded">
              <Logo variant="footer" showText />
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              Solusi konstruksi profesional dengan kualitas terbaik, didukung tim ahli berpengalaman.
            </p>
            <div className="flex items-center gap-2 bg-slate-800/40 px-3 py-1.5 rounded-md border border-slate-800 self-start">
              <Award className="w-4 h-4 text-brand-secondary shrink-0" aria-hidden="true" />
              <span className="text-[10px] font-semibold tracking-wider text-brand-secondary uppercase">Your Real Partner</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold tracking-wider text-brand-primary uppercase">Navigasi</h3>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Projects", href: "/projects" },
                { label: "Contact", href: "/contact" },
              ].map((l) => (
                <li key={l.href}><Link href={l.href} className="text-xs text-slate-400 hover:text-brand-secondary transition-colors font-medium focus-visible:outline-2 focus-visible:outline-brand-primary rounded">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold tracking-wider text-brand-primary uppercase">Kontak</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-secondary shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-xs text-slate-400 leading-relaxed">Jl. XXXXXXXX No. XX, Kota XXXXX</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-secondary shrink-0" aria-hidden="true" />
                <span className="text-xs text-slate-400">+62 xxxx xxxx xxxx</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-secondary shrink-0" aria-hidden="true" />
                <a href="mailto:info@bangunciptadana.com" className="text-xs text-slate-400 hover:text-white transition-colors font-medium focus-visible:outline-2 focus-visible:outline-brand-primary rounded">info@bangunciptadana.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-[#050E1A] border-t border-slate-800 py-4">
        <div className="max-w-[1240px] mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-[10px] text-slate-500 text-center sm:text-left">&copy; 2025 Bangun Ciptadana</p>
          <p className="text-[10px] text-slate-600 text-center sm:text-right">Konstruksi · Atap · Aluminium · Kaca · Interior</p>
        </div>
      </div>
    </footer>
  );
}
