import HeroBanner from "@/components/HeroBanner";
import AnimatedSection from "@/components/AnimatedSection";
import ContactForm from "@/components/ContactForm";
import { Phone, Mail, MessageSquare, AtSign, MapPin, ArrowUpRight } from "lucide-react";
import { readStore } from "@/data/store";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const { profile } = await readStore();

  return (
    <div className="flex flex-col w-full bg-brand-bg">
      <HeroBanner title="Kontak" titleItalic="Kami" />

      <section className="py-16 md:py-24 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: info */}
            <AnimatedSection direction="left" className="lg:col-span-5 text-left">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-brand-primary" />
                <span className="font-sans font-bold text-sm text-brand-text tracking-wider uppercase">Hubungi Kami</span>
              </div>
              <h2 className="flex flex-col text-brand-text leading-none mb-6">
                <span className="font-sans font-extrabold text-4xl sm:text-5xl tracking-tight uppercase">Konsultasi</span>
                <span className="font-serif italic text-4xl sm:text-5xl text-brand-muted mt-1">Gratis</span>
              </h2>
              <p className="text-brand-muted text-sm leading-relaxed mb-10 max-w-md">
                Sampaikan rencana pembangunan atau renovasi Anda. Tim ahli Bangun Ciptadana siap memberikan solusi teknis dan estimasi anggaran transparan.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-brand-border">
                  <Phone className="w-5 h-5 text-brand-primary mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-[11px] font-medium text-brand-muted uppercase tracking-wide">Telepon</p>
                    <p className="text-brand-text font-semibold text-sm">{profile.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-brand-border">
                  <Mail className="w-5 h-5 text-brand-primary mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-[11px] font-medium text-brand-muted uppercase tracking-wide">Email</p>
                    <a href={`mailto:${profile.email}`} className="text-brand-text font-semibold text-sm hover:text-brand-primary transition-colors">{profile.email}</a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-brand-border">
                  <MessageSquare className="w-5 h-5 text-brand-primary mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-[11px] font-medium text-brand-muted uppercase tracking-wide">WhatsApp</p>
                    <p className="text-brand-text font-semibold text-sm">{profile.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-brand-border">
                  <AtSign className="w-5 h-5 text-brand-primary mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-[11px] font-medium text-brand-muted uppercase tracking-wide">Instagram</p>
                    <p className="text-brand-text font-semibold text-sm">@bangunciptadana</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-brand-border">
                  <MapPin className="w-5 h-5 text-brand-primary mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-[11px] font-medium text-brand-muted uppercase tracking-wide">Alamat</p>
                    <p className="text-brand-text font-semibold text-xs leading-snug">{profile.address}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Right: form */}
            <AnimatedSection delay={0.15} className="lg:col-span-7">
              <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl border border-brand-border shadow-sm">
                <div className="border-b border-brand-border pb-4 mb-6">
                  <h3 className="text-lg font-bold text-brand-text">Formulir Konsultasi Proyek</h3>
                  <p className="text-brand-muted text-xs mt-1">Isi detail kebutuhan Anda, tim kami akan menghubungi dalam 24 jam.</p>
                </div>
                <ContactForm />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 w-full pb-24">
        <div className="bg-brand-text rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white space-y-1 text-center md:text-left">
            <p className="text-xl font-bold tracking-tight">Siap memulai proyek Anda?</p>
            <p className="text-white/65 text-sm font-light">Tim kami siap membantu dari perencanaan hingga serah terima.</p>
          </div>
          <a
            href={`tel:${profile.phone}`}
            className="group inline-flex items-center gap-2 bg-white text-brand-text hover:bg-brand-surface-soft px-7 py-3.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap"
          >
            Hubungi Sekarang
            <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  );
}
