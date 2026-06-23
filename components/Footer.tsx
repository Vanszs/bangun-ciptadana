import Link from "next/link";
import Logo from "./Logo";
import { Facebook, Instagram, Linkedin, Youtube, MapPin, Phone, Mail, Award } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#071424] border-t border-slate-800 text-slate-100">
      <div className="max-w-[1240px] mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="flex flex-col gap-5">
            <Link href="/" className="hover:opacity-90 self-start transition-opacity">
              <Logo variant="footer" showText />
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Solusi konstruksi profesional dengan kualitas terbaik, didukung oleh tim ahli berpengalaman untuk mewujudkan bangunan komersial, residensial, dan renovasi impian Anda.
            </p>
            <div className="flex items-center gap-2.5">
              {[
                { icon: <Facebook className="w-4 h-4" />, id: "fb" },
                { icon: <Instagram className="w-4 h-4" />, id: "ig" },
                { icon: <Linkedin className="w-4 h-4" />, id: "li" },
                { icon: <Youtube className="w-4 h-4" />, id: "yt" },
              ].map((s) => (
                <span key={s.id} className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-800/40 border border-slate-700 text-slate-300 hover:bg-brand-primary hover:border-brand-primary hover:text-white transition-colors duration-200 cursor-pointer">
                  {s.icon}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 bg-slate-800/40 px-3 py-1.5 rounded-md border border-slate-800 self-start">
              <Award className="w-4 h-4 text-brand-secondary shrink-0" />
              <span className="text-[10px] font-extrabold tracking-widest text-brand-secondary uppercase">Your Real Partner</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:pl-4">
            <h3 className="text-xs font-bold tracking-widest text-brand-primary uppercase border-b border-slate-800/50 pb-2">Navigasi</h3>
            <ul className="space-y-2.5">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Projects", href: "/projects" },
                { label: "Contact Us", href: "/contact" },
              ].map((l) => (
                <li key={l.href}><Link href={l.href} className="text-xs text-slate-400 hover:text-brand-secondary transition-colors font-medium">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold tracking-widest text-brand-primary uppercase border-b border-slate-800/50 pb-2">Layanan Kami</h3>
            <ul className="space-y-2.5">
              {["Konstruksi Bangunan", "Atap dan Kanopi", "Aluminium & Kaca", "Renovasi & Perluasan", "Interior"].map((s, i) => (
                <li key={i}><Link href="/services" className="text-xs text-slate-400 hover:text-brand-secondary transition-colors font-medium">{s}</Link></li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold tracking-widest text-brand-primary uppercase border-b border-slate-800/50 pb-2">Kontak Kami</h3>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-secondary shrink-0 mt-0.5" />
                <span className="text-xs text-slate-400 leading-relaxed">Jl. XXXXXXXX No. XX, Kota XXXXX</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-secondary shrink-0" />
                <span className="text-xs text-slate-400">+62 xxxx xxxx xxxx</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-secondary shrink-0" />
                <a href="mailto:info@bangunciptadana.com" className="text-xs text-slate-400 hover:text-white transition-colors font-medium">info@bangunciptadana.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-[#050E1A] border-t border-slate-800 py-5">
        <div className="max-w-[1240px] mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[10px] text-slate-400 text-center sm:text-left tracking-wide">&copy; 2025 Bangun Ciptadana. All rights reserved.</p>
          <p className="text-[10px] text-slate-500 text-center sm:text-right font-medium">Sipil konstruksi, Atap baja jaringan, Sekat aluminium, Kaca, Interior.</p>
        </div>
      </div>
    </footer>
  );
}
