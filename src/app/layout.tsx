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
  description: "Premier CCTV camera, security systems, and fire alarm installation services in Narsinghgarh, Bhopal, Indore, Rajgarh, and across Madhya Pradesh. Authorized dealers for Hikvision, CP Plus, Dahua.",
  keywords: [
    "CCTV Camera", "Security Systems", "CCTV Installation",
    "Narsinghgarh", "Bhopal", "Indore", "Rajgarh", "Biaora", "Sehore", "Shajapur", "Vidisha", "Ujjain", "Dewas",
    "Hikvision Dealer", "CP Plus Dealer", "Home Security", "Surveillance", "Biometric Attendance", "Video Door Phone"
  ],
  authors: [{ name: "ShriVidhata Security Solutions" }],
  creator: "ShriVidhata Security Solutions",
  publisher: "ShriVidhata Security Solutions",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://shrividhata.com',
    title: "ShriVidhata | Premium Security & CCTV Solutions",
    description: "Expert CCTV installation and security systems in Narsinghgarh, Bhopal, Indore & MP. Secure your world with our premium solutions.",
    siteName: 'ShriVidhata Security Solutions',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ShriVidhata Security Solutions - Premium CCTV Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "ShriVidhata | Security Solutions",
    description: "Premium CCTV & Security Installation Services in Madhya Pradesh.",
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: "google-site-verification-code", // Placeholder - User to provide
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
