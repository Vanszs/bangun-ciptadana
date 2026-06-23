import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import AdminShell from "@/components/admin/AdminShell";
import { Providers } from "@/components/Providers";
import { ToastProvider } from "@/components/ui/toast";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");
  return (
    <Providers>
      <ToastProvider>
        <AdminShell>{children}</AdminShell>
      </ToastProvider>
    </Providers>
  );
}
