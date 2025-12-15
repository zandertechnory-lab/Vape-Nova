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

export const metadata: Metadata = {
  title: "VapeNova - Premium Vapes & Vaporizers",
  description: "Discover premium vapes, vaporizers, and gummies at VapeNova. Your trusted source for quality vaping products.",
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

