"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/Logo";
import { LockKeyhole, Mail, Loader2, ShieldAlert } from "lucide-react";

function LoginForm() {
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="email" className="text-slate-700 text-xs font-semibold uppercase tracking-wider">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@bangun-ciptadana.id"
            className="pl-9 bg-slate-50/50 border-slate-200 focus-visible:ring-brand-primary"
            autoComplete="email"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="password" className="text-slate-700 text-xs font-semibold uppercase tracking-wider">Password</Label>
        <div className="relative">
          <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="pl-9 bg-slate-50/50 border-slate-200 focus-visible:ring-brand-primary"
            autoComplete="current-password"
          />
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-2.5 text-xs text-red-600 bg-red-50/80 border border-red-100 rounded-lg p-3">
          <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold shadow-md shadow-brand-primary/10 hover:shadow-lg transition-all cursor-pointer"
        disabled={loading}
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
        {loading ? "Memproses..." : "Masuk"}
      </Button>

      <div className="rounded-lg bg-slate-50 border border-slate-100 p-3.5 text-[11px] text-slate-500 leading-relaxed">
        <strong className="text-slate-700 block mb-1">Kredensial Demo:</strong>
        Email: <code className="text-brand-primary-dark font-mono bg-white px-1 py-0.5 rounded border border-slate-100">admin@bangun-ciptadana.id</code>
        <br />
        Password: <code className="text-brand-primary-dark font-mono bg-white px-1 py-0.5 rounded border border-slate-100">AdminBC2024!</code>
      </div>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] relative overflow-hidden p-4 sm:p-6">
      {/* Premium architectural draft background */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FCFDFE] via-[#F1F5F9] to-[#E2E8F0]" aria-hidden="true">
        {/* Ambient radial glows for depth */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#1491D0]/8 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#7BC255]/8 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#1491D0]/3 blur-[140px]" />
        
        {/* Architectural drafting board lines & details */}
        <svg className="absolute inset-0 w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-dots" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.75" fill="#1491D0" className="opacity-40" />
            </pattern>
            <pattern id="grid-lines" width="96" height="96" patternUnits="userSpaceOnUse">
              <rect width="96" height="96" fill="none" stroke="#1491D0" strokeWidth="0.5" className="opacity-20" />
            </pattern>
          </defs>
          
          <rect width="100%" height="100%" fill="url(#grid-dots)" />
          <rect width="100%" height="100%" fill="url(#grid-lines)" />

          {/* Perspective blueprint wireframes */}
          <g stroke="#1491D0" strokeWidth="0.75" fill="none" className="opacity-60">
            {/* Top-Right isometric block */}
            <path d="M 850 100 L 930 60 L 1010 100 L 930 140 Z" />
            <path d="M 850 100 L 850 200 L 930 240 L 930 140 Z" />
            <path d="M 1010 100 L 1010 200 L 930 240 Z" />
            <line x1="850" y1="150" x2="930" y2="190" strokeDasharray="3 3" />
            <line x1="1010" y1="150" x2="930" y2="190" strokeDasharray="3 3" />
            <line x1="930" y1="60" x2="930" y2="240" strokeDasharray="3 3" />
          </g>

          <g stroke="#7BC255" strokeWidth="0.75" fill="none" className="opacity-60">
            {/* Bottom-Left structural frame */}
            <path d="M 100 700 L 180 660 L 260 700 M 180 660 L 180 820" />
            <path d="M 100 700 L 100 820 L 180 860 L 260 820 L 260 700" strokeDasharray="4 2" />
            <circle cx="180" cy="660" r="4" fill="#7BC255" />
          </g>

          {/* Architectural compass arc overlays */}
          <circle cx="10%" cy="20%" r="300" stroke="#1491D0" strokeWidth="0.5" fill="none" strokeDasharray="12 6" className="opacity-40" />
          <circle cx="90%" cy="80%" r="450" stroke="#7BC255" strokeWidth="0.5" fill="none" strokeDasharray="20 4" className="opacity-30" />
          <circle cx="50%" cy="50%" r="400" stroke="#1491D0" strokeWidth="0.25" fill="none" className="opacity-20" />

          {/* Technical drafting metadata text */}
          <text x="32" y="48" fill="#1491D0" className="font-mono text-[9px] font-medium tracking-[0.25em] opacity-50">BANGUN CIPTADANA / DETAIL WORKSHOP</text>
          <text x="32" y="64" fill="#64748B" className="font-mono text-[8px] tracking-wider opacity-40">DWG NO: BC-2026-A1 / REV: 04</text>
          <text x="32" y="80" fill="#64748B" className="font-mono text-[8px] tracking-wider opacity-40">SCALE: NTS / COORDINATE SYSTEM: WGS84</text>

          <text x="95%" y="96%" textAnchor="end" fill="#7BC255" className="font-mono text-[9px] font-medium tracking-[0.15em] opacity-50">PROYEK PORTAL ADMIN v1.0</text>
        </svg>

        {/* Diagonal axis overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(20,145,208,0.015)_0%,rgba(123,194,85,0.015)_100%)]" />
      </div>

      <div className="w-full max-w-[420px] bg-white rounded-[24px] border border-slate-100 shadow-xl shadow-slate-200/50 p-8 sm:p-10 relative z-10">
        <div className="flex flex-col items-center mb-6">
          <Logo className="mb-4" variant="light" showText />
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">Admin Portal</h1>
          <p className="text-xs text-slate-400 mt-1">Gunakan akun administrator Anda untuk melanjutkan</p>
        </div>

        <Suspense fallback={
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-brand-primary" />
          </div>
        }>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
