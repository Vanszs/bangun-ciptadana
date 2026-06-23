"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import {
  LayoutDashboard,
  Briefcase,
  FolderKanban,
  MessageSquare,
  BarChart3,
  Users,
  Award,
  Building2,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import Logo from "@/components/Logo";
import { cn } from "@/lib/utils";

const NAV_GROUPS = [
  {
    label: "Overview",
    items: [{ href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/services", label: "Layanan", icon: Briefcase },
      { href: "/admin/projects", label: "Proyek", icon: FolderKanban },
      { href: "/admin/team", label: "Tim", icon: Users },
      { href: "/admin/values", label: "Nilai Perusahaan", icon: Award },
    ],
  },
  {
    label: "Engagement",
    items: [
      { href: "/admin/messages", label: "Pesan Masuk", icon: MessageSquare },
      { href: "/admin/stats", label: "Statistik", icon: BarChart3 },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/admin/profile", label: "Profil Perusahaan", icon: Building2 },
      { href: "/admin/settings", label: "Pengaturan", icon: Settings },
    ],
  },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile top bar */}
      <header className="lg:hidden sticky top-0 z-40 bg-white border-b border-brand-border h-14 flex items-center justify-between px-4">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <Logo variant="light" showText />
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-md hover:bg-slate-100 text-brand-text"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed lg:sticky top-0 left-0 z-40 w-64 h-screen bg-white border-r border-brand-border flex flex-col transition-transform",
            open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          )}
        >
          <div className="h-16 flex items-center px-6 border-b border-brand-border shrink-0">
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <Logo variant="light" showText />
            </Link>
          </div>

          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6" aria-label="Admin">
            {NAV_GROUPS.map((group) => (
              <div key={group.label}>
                <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-wider text-brand-muted">
                  {group.label}
                </p>
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const active = pathname === item.href || pathname?.startsWith(item.href + "/");
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center gap-2.5 px-3 h-9 rounded-md text-sm font-medium transition-colors",
                          active
                            ? "bg-brand-primary text-white shadow-sm"
                            : "text-brand-text hover:bg-slate-100 hover:text-brand-primary",
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="flex-1">{item.label}</span>
                        {active && <ChevronRight className="h-3.5 w-3.5" />}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          <div className="border-t border-brand-border p-4 space-y-3 shrink-0">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 text-xs font-medium text-brand-muted hover:text-brand-primary transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Lihat Landing Page
            </Link>
            <div className="flex items-center gap-3 p-2 rounded-md bg-slate-50">
              <div className="h-8 w-8 rounded-full bg-brand-primary text-white flex items-center justify-center text-xs font-semibold">
                {session?.user?.name?.[0]?.toUpperCase() || "A"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-brand-text truncate">
                  {session?.user?.name || "Admin"}
                </p>
                <p className="text-[10px] text-brand-muted truncate">{session?.user?.email}</p>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
                className="p-1.5 rounded-md hover:bg-white text-brand-muted hover:text-red-600 transition-colors"
                aria-label="Sign out"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </aside>

        {open && (
          <div
            className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0 max-w-full">{children}</main>
      </div>
    </div>
  );
}
