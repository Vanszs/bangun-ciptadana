import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Bangun Ciptadana - Your Real Partner",
  description: "Solusi konstruksi profesional untuk bangunan komersial, residensial, renovasi, interior, aluminium, kaca, dan pekerjaan sipil.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="flex flex-col min-h-screen bg-brand-bg selection:bg-brand-primary/20 selection:text-brand-primary-dark">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
