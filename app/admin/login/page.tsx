"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/Logo";
import { LockKeyhole, Mail, Loader2, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (res?.error) {
      setError("Email atau password salah.");
      return;
    }
    router.push(searchParams.get("callbackUrl") || "/admin/dashboard");
    router.refresh();
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* Left visual */}
      <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-[#0D6EA5] via-brand-primary to-[#1491D0]">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,white,transparent_40%)]" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          <div className="flex items-center gap-2">
            <Logo variant="dark" showText />
          </div>
          <div className="max-w-md space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium border border-white/20">
              <ShieldCheck className="h-3.5 w-3.5" />
              Admin Panel Resmi
            </div>
            <h2 className="text-3xl font-bold leading-tight">
              Kelola konten landing page Bangun Ciptadana dalam satu tempat.
            </h2>
            <p className="text-white/80 text-sm leading-relaxed">
              Layanan, proyek, tim, pesan masuk, hingga profil perusahaan — semuanya dapat Anda perbarui
              secara real-time dari panel ini.
            </p>
          </div>
          <p className="text-xs text-white/60">© {new Date().getFullYear()} Bangun Ciptadana. All rights reserved.</p>
        </div>
      </div>

      {/* Right form */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm space-y-6">
          <div className="lg:hidden flex justify-center mb-4">
            <Logo variant="light" showText />
          </div>
          <div className="space-y-1.5 text-center lg:text-left">
            <h1 className="text-2xl font-bold text-brand-text">Masuk Admin Panel</h1>
            <p className="text-sm text-brand-muted">Gunakan akun administrator Anda untuk melanjutkan.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-muted" />
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@bangun-ciptadana.id"
                  className="pl-9"
                  autoComplete="email"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-muted" />
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-9"
                  autoComplete="current-password"
                />
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
                {error}
              </p>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {loading ? "Memproses..." : "Masuk"}
            </Button>

            <div className="rounded-md bg-slate-50 border border-brand-border p-3 text-[11px] text-brand-muted leading-relaxed">
              <strong className="text-brand-text">Akun demo:</strong>
              <br />
              Email: <code className="text-brand-primary">admin@bangun-ciptadana.id</code>
              <br />
              Password: <code className="text-brand-primary">AdminBC2024!</code>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
