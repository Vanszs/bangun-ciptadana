import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { KeyRound, Globe, FileText, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export default function AdminSettingsPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <AdminPageHeader
        title="Pengaturan"
        description="Konfigurasi sistem, kredensial admin, dan informasi teknis."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <KeyRound className="h-4 w-4 text-brand-primary" />
              <CardTitle>Kredensial Admin</CardTitle>
            </div>
            <CardDescription>Login default untuk admin panel.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-muted">Email</p>
              <p className="text-sm font-mono text-brand-text mt-0.5">{process.env.ADMIN_EMAIL || "admin@bangun-ciptadana.id"}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-muted">Password</p>
              <p className="text-sm font-mono text-brand-text mt-0.5">{process.env.ADMIN_PASSWORD ? "•".repeat(process.env.ADMIN_PASSWORD.length) : "••••••••••"}</p>
            </div>
            <div className="rounded-md bg-amber-50 border border-amber-200 p-3 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800 leading-relaxed">
                Untuk produksi, set environment variable <code className="font-mono">ADMIN_EMAIL</code>, <code className="font-mono">ADMIN_PASSWORD</code>, dan <code className="font-mono">NEXTAUTH_SECRET</code>.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-brand-primary" />
              <CardTitle>Data Storage</CardTitle>
            </div>
            <CardDescription>Backend penyimpanan data CMS.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="default">JSON File</Badge>
              <span className="text-xs text-brand-muted">data/cms-store.json</span>
            </div>
            <p className="text-xs text-brand-muted leading-relaxed">
              Semua perubahan layanan, proyek, tim, pesan, dan profil disimpan ke file JSON lokal.
              Cocok untuk demo dan self-hosted. Migrasi ke database (Postgres, MySQL) untuk skala produksi.
            </p>
            <div className="text-xs text-brand-muted/80 leading-relaxed">
              <strong>API Endpoints:</strong>
              <ul className="list-disc pl-5 mt-1 space-y-0.5 font-mono">
                <li>/api/admin/services</li>
                <li>/api/admin/projects</li>
                <li>/api/admin/team</li>
                <li>/api/admin/values</li>
                <li>/api/admin/stats</li>
                <li>/api/admin/profile</li>
                <li>/api/admin/messages</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-brand-primary" />
              <CardTitle>Landing Page</CardTitle>
            </div>
            <CardDescription>Link ke halaman publik.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <a href="/" className="block text-sm font-semibold text-brand-primary hover:underline">/ — Home</a>
            <a href="/about" className="block text-sm font-semibold text-brand-primary hover:underline">/about — About Us</a>
            <a href="/services" className="block text-sm font-semibold text-brand-primary hover:underline">/services — Services</a>
            <a href="/projects" className="block text-sm font-semibold text-brand-primary hover:underline">/projects — Projects</a>
            <a href="/contact" className="block text-sm font-semibold text-brand-primary hover:underline">/contact — Contact</a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tech Stack</CardTitle>
            <CardDescription>Framework & library yang digunakan.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Badge variant="outline">Next.js 15</Badge>
            <Badge variant="outline">React 19</Badge>
            <Badge variant="outline">TypeScript</Badge>
            <Badge variant="outline">Tailwind CSS v4</Badge>
            <Badge variant="outline">NextAuth v4</Badge>
            <Badge variant="outline">Radix UI</Badge>
            <Badge variant="outline">Lucide Icons</Badge>
            <Badge variant="outline">bcryptjs</Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
