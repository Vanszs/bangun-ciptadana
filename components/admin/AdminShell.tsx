"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
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
  ChevronDown,
  ExternalLink,
  UserCog,
  CreditCard,
} from "lucide-react";
import Logo from "@/components/Logo";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

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

function NavGroup({ group, active, onNavigate }: { group: typeof NAV_GROUPS[number]; active: (href: string) => boolean; onNavigate: () => void }) {
  return (
    <details open className="group/nav">
      <summary className="flex items-center justify-between px-3 py-1.5 cursor-pointer list-none rounded-md hover:bg-slate-50 [&::-webkit-details-marker]:hidden">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-muted">{group.label}</span>
        <ChevronDown className="h-3 w-3 text-brand-muted transition-transform group-open/nav:rotate-0 rotate-[-90deg]" aria-hidden="true" />
      </summary>
      <div className="mt-1 space-y-0.5">
        {group.items.map((item) => {
          const isActive = active(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "group/navitem relative flex items-center gap-2.5 px-3 h-9 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-slate-100 text-brand-primary"
                  : "text-brand-text hover:bg-slate-50 hover:text-brand-primary",
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-r-full bg-brand-primary" aria-hidden="true" />
              )}
              <Icon className={cn("h-4 w-4", isActive ? "text-brand-primary" : "text-brand-muted group-hover/navitem:text-brand-primary")} aria-hidden="true" />
              <span className="flex-1">{item.label}</span>
              {isActive && <ChevronRight className="h-3.5 w-3.5 text-brand-primary" aria-hidden="true" />}
            </Link>
          );
        })}
      </div>
    </details>
  );
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isActive = (href: string) => pathname === href || (pathname?.startsWith(href + "/") ?? false);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (open && !dlg.open) dlg.showModal();
    if (!open && dlg.open) dlg.close();
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
          aria-expanded={open}
          aria-controls="admin-mobile-nav"
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </header>

      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="hidden lg:flex sticky top-0 left-0 z-40 w-64 h-screen bg-white border-r border-brand-border flex-col">
          <div className="h-16 flex items-center px-6 border-b border-brand-border shrink-0">
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <Logo variant="light" showText />
            </Link>
          </div>

          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-2" aria-label="Admin">
            {NAV_GROUPS.map((group) => (
              <NavGroup key={group.label} group={group} active={isActive} onNavigate={() => setOpen(false)} />
            ))}
          </nav>

          <UserFooter session={session} />
        </aside>

        {/* Mobile sidebar (native <dialog>) */}
        <dialog
          ref={dialogRef}
          id="admin-mobile-nav"
          onClose={() => setOpen(false)}
          onClick={(e) => {
            if (e.target === dialogRef.current) setOpen(false);
          }}
          className="lg:hidden m-0 p-0 max-w-none max-h-none w-64 h-screen bg-white border-r border-brand-border backdrop:bg-slate-900/40"
        >
          <div className="h-16 flex items-center justify-between px-6 border-b border-brand-border shrink-0">
            <Link href="/admin/dashboard" className="flex items-center gap-2" onClick={() => setOpen(false)}>
              <Logo variant="light" showText />
            </Link>
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-md hover:bg-slate-100 text-brand-text"
              aria-label="Tutup menu"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-2" aria-label="Admin mobile">
            {NAV_GROUPS.map((group) => (
              <NavGroup key={group.label} group={group} active={isActive} onNavigate={() => setOpen(false)} />
            ))}
          </nav>

          <UserFooter session={session} />
        </dialog>

        {/* Main content */}
        <main className="flex-1 min-w-0 max-w-full">{children}</main>
      </div>
    </div>
  );
}

function UserFooter({ session }: { session: ReturnType<typeof useSession>["data"] }) {
  return (
    <div className="border-t border-brand-border p-4 space-y-3 shrink-0">
      <Link
        href="/"
        target="_blank"
        className="flex items-center gap-2 text-xs font-medium text-brand-muted hover:text-brand-primary transition-colors"
      >
        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        Lihat Landing Page
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="w-full flex items-center gap-3 p-2 rounded-md bg-slate-50 hover:bg-slate-100 transition-colors text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary">
            <div className="h-8 w-8 rounded-full bg-brand-primary text-white flex items-center justify-center text-xs font-semibold shrink-0">
              {session?.user?.name?.[0]?.toUpperCase() || "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-brand-text truncate">
                {session?.user?.name || "Admin"}
              </p>
              <p className="text-[10px] text-brand-muted truncate">{session?.user?.email}</p>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-brand-muted" aria-hidden="true" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" side="top" className="w-56">
          <DropdownMenuLabel>Akun</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link href="/admin/profile">
              <UserCog className="h-4 w-4" /> Edit Profil
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/admin/settings">
              <CreditCard className="h-4 w-4" /> Pengaturan
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => signOut({ callbackUrl: "/admin/login" })}
            className="text-red-600 focus:bg-red-50 focus:text-red-700"
          >
            <LogOut className="h-4 w-4" /> Keluar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
