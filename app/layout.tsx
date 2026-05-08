import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "react-hot-toast";
import AgeVerificationModal from "@/components/age-verification-modal";
import FloatingVapes from "@/components/floating-vapes";
import PageTransition from "@/components/page-transition";
import LiveChat from "@/components/live-chat";

const inter = Inter({ subsets: ["latin"] });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vape-nova-store.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "VapeNova | Premium Vapes, Vaporizers & Gummies Online",
    template: "%s | VapeNova",
  },
  description:
    "Shop premium vapes, Mighty & Volcano vaporizers, CBD vape pens, and mushroom gummies at VapeNova. Free shipping on orders over $50. 100% authentic products.",
  keywords: [
    "vaporizer", "buy vaporizer online", "CBD vape", "vape shop", "Mighty vaporizer",
    "Volcano vaporizer", "Crafty vaporizer", "mushroom gummies", "CBD vape pen",
    "premium vapes", "dry herb vaporizer", "Storz and Bickel", "CBDfx vape",
  ],
  authors: [{ name: "VapeNova", url: SITE_URL }],
  creator: "VapeNova",
  publisher: "VapeNova",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "VapeNova",
    title: "VapeNova | Premium Vapes, Vaporizers & Gummies Online",
    description:
      "Shop premium vapes, Mighty & Volcano vaporizers, CBD vape pens, and mushroom gummies at VapeNova. Free shipping on orders over $50.",
    images: [
      {
        url: "/images/hero/vaping-lifestyle.png",
        width: 1200,
        height: 630,
        alt: "VapeNova - Premium Vapes & Vaporizers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VapeNova | Premium Vapes, Vaporizers & Gummies Online",
    description:
      "Shop premium vapes, Mighty & Volcano vaporizers, CBD vape pens, and mushroom gummies at VapeNova.",
    images: ["/images/hero/vaping-lifestyle.png"],
    creator: "@vapenovashop",
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AgeVerificationModal />
        <FloatingVapes />
        <Providers>
          <PageTransition>
            {children}
          </PageTransition>
          <Toaster position="top-right" />
        </Providers>
        <LiveChat />
      </body>
    </html>
  );
}
