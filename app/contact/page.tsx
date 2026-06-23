import HeroBanner from "@/components/HeroBanner";
import ContactForm from "@/components/ContactForm";
import { Phone, Mail, MessageSquare, Instagram, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full">
      <HeroBanner title="Contact Us" />

      <section className="py-14 bg-white">
        <div className="max-w-[1240px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 text-left">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-text mb-4">Dapatkan Konsultasi Gratis</h2>
              <p className="text-brand-muted text-sm leading-relaxed mb-8">
                Sampaikan rencana pembangunan atau renovasi Anda. Tim ahli Bangun Ciptadana siap memberikan solusi teknis dan estimasi anggaran transparan.
              </p>
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-brand-secondary shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-[11px] font-medium text-brand-muted uppercase tracking-wide">Telepon</p>
                    <p className="text-brand-text font-semibold text-sm">+62 xxxx xxxx xxxx</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-brand-primary shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-[11px] font-medium text-brand-muted uppercase tracking-wide">Email</p>
                    <a href="mailto:info@bangunciptadana.com" className="text-brand-text font-semibold text-sm hover:text-brand-primary transition-colors">info@bangunciptadana.com</a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-brand-secondary shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-[11px] font-medium text-brand-muted uppercase tracking-wide">WhatsApp</p>
                    <p className="text-brand-text font-semibold text-sm">+62 xxxx xxxx xxxx</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Instagram className="w-4 h-4 text-brand-primary shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-[11px] font-medium text-brand-muted uppercase tracking-wide">Instagram</p>
                    <p className="text-brand-text font-semibold text-sm">@bangunciptadana</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-brand-secondary shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-[11px] font-medium text-brand-muted uppercase tracking-wide">Alamat</p>
                    <p className="text-brand-text font-semibold text-xs leading-snug">Jl. XXXXXXXX No. XX, Kota XXXXX</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-white p-6 sm:p-8 rounded-md border border-brand-border shadow-sm">
                <h3 className="text-lg font-bold text-brand-text border-b border-brand-border pb-3 mb-5">Formulir Konsultasi Proyek</h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
