"use client";

import { useState } from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";
import { Save, Loader2, MousePointerClick, Type } from "lucide-react";
import type { ContentSettings } from "@/data/types";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

const INITIAL: ContentSettings = {
  heroCtaLabel: "Hubungi Kami",
  heroCtaHref: "/contact",
  contactCtaLabel: "Hubungi Sekarang",
  footerTagline: "Your Real Partner — Solusi konstruksi profesional untuk bangunan komersial, residensial, renovasi, interior, aluminium & kaca.",
  socialInstagram: "bangunciptadana",
  socialFacebook: "",
  socialLinkedin: "",
  socialTwitter: "",
};

export default function AdminContentPage() {
  const [settings, setSettings] = useState<ContentSettings>(INITIAL);
  const [busy, setBusy] = useState(false);
  const { toast } = useToast();

  function update<K extends keyof ContentSettings>(key: K, val: ContentSettings[K]) {
    setSettings((prev) => ({ ...prev, [key]: val }));
  }

  async function saveAll() {
    setBusy(true);
    await new Promise((r) => setTimeout(r, 600));
    setBusy(false);
    toast({ title: "Pengaturan konten disimpan", description: "Backend integration pending", variant: "success" });
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <AdminPageHeader
        title="Pengaturan Konten"
        description="Kelola teks CTA, tagline footer, dan link sosial media."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CTA Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <MousePointerClick className="h-4 w-4 text-brand-primary" />
              <CardTitle className="text-base">Tombol Aksi</CardTitle>
            </div>
            <CardDescription className="text-xs">Teks dan tujuan tombol CTA utama.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label className="text-xs">Label CTA Hero</Label>
              <Input value={settings.heroCtaLabel} onChange={(e) => update("heroCtaLabel", e.target.value)} className="h-9 text-sm" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Tujuan CTA Hero (href)</Label>
              <Input value={settings.heroCtaHref} onChange={(e) => update("heroCtaHref", e.target.value)} className="h-9 text-sm" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Label CTA Kontak</Label>
              <Input value={settings.contactCtaLabel} onChange={(e) => update("contactCtaLabel", e.target.value)} className="h-9 text-sm" />
            </div>
          </CardContent>
        </Card>

        {/* Footer & Social */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Type className="h-4 w-4 text-brand-secondary-dark" />
              <CardTitle className="text-base">Footer & Sosial</CardTitle>
            </div>
            <CardDescription className="text-xs">Tagline footer dan username sosial media.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label className="text-xs">Tagline Footer</Label>
              <Textarea value={settings.footerTagline} onChange={(e) => update("footerTagline", e.target.value)} rows={3} className="text-sm" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs flex items-center gap-1.5"><InstagramIcon className="h-3 w-3" /> Instagram Username</Label>
              <Input value={settings.socialInstagram} onChange={(e) => update("socialInstagram", e.target.value)} placeholder="@username" className="h-9 text-sm" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs flex items-center gap-1.5"><FacebookIcon className="h-3 w-3" /> Facebook Username</Label>
              <Input value={settings.socialFacebook} onChange={(e) => update("socialFacebook", e.target.value)} placeholder="@username" className="h-9 text-sm" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs flex items-center gap-1.5"><LinkedinIcon className="h-3 w-3" /> LinkedIn Username</Label>
              <Input value={settings.socialLinkedin} onChange={(e) => update("socialLinkedin", e.target.value)} placeholder="username" className="h-9 text-sm" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs flex items-center gap-1.5"><TwitterIcon className="h-3 w-3" /> Twitter Username</Label>
              <Input value={settings.socialTwitter} onChange={(e) => update("socialTwitter", e.target.value)} placeholder="@username" className="h-9 text-sm" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end pt-4 border-t border-brand-border">
        <Button onClick={saveAll} disabled={busy} className="min-w-[140px]">
          {busy ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          Simpan Pengaturan
        </Button>
      </div>
    </div>
  );
}
