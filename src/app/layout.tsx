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
  metadataBase: new URL('https://shrividhata.com'),
  title: {
    default: "ShriVidhata | Best CCTV Camera Sales & Installation Services",
    template: "%s | ShriVidhata"
  },
  description: "ShriVidhata offers premium CCTV camera sales, installation, and maintenance services in Narsinghgarh & Madhya Pradesh. Authorized dealers for Hikvision, CP Plus, Dahua.",
  keywords: ["CCTV Camera", "Security Systems", "CCTV Installation", "Narsinghgarh", "Hikvision Dealer", "CP Plus Dealer", "Home Security", "Surveillance"],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://shrividhata.com',
    siteName: 'ShriVidhata Security Solutions',
    images: [
      {
        url: '/og-image.jpg', // We should ensure this exists or use a default
        width: 1200,
        height: 630,
        alt: 'ShriVidhata Security Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "ShriVidhata | Security Solutions",
    description: "Premium CCTV & Security Installation Services.",
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  }
};

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { ScrollToTopOnMount } from "@/components/ui/ScrollToTopOnMount";
import { CartProvider } from "@/context/CartContext";
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-slate-50 selection:bg-blue-500/30`}
      >
        <CartProvider>
          <Header />
          <main className="flex-1 mt-16 sm:mt-20">
            <ScrollToTopOnMount />
            {children}
          </main>
          <Footer />
          <ScrollToTop />
          <FloatingWhatsApp />
          <FloatingCTA />
        </CartProvider>
        {/* Zoho Payments Script */}
        <script src="https://js.zohostatic.com/zohopayments/v1/zpayments.js"></script>
      </body>
    </html>
  );
}
