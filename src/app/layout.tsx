import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShriVidhata | Best CCTV Camera Sales & Installation Services",
  description: "ShriVidhata offers premium CCTV camera sales, installation, and maintenance services. Authorized dealers for Hikvision, CP Plus, Dahua, and more.",
};

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { FloatingCTA } from "@/components/ui/FloatingCTA";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-slate-50`}
      >
        <Header />
        <main className="flex-1 mt-16 sm:mt-20">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
        <FloatingWhatsApp />
        <FloatingCTA />
      </body>
    </html>
  );
}
