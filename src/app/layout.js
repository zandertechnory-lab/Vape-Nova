import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AgeVerification from "@/components/AgeVerification";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { AdminProvider } from "@/context/AdminContext";
import { ProductProvider } from "@/context/ProductContext";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import ScrollToTop from "@/components/ScrollToTop";
import CookieConsent from "@/components/CookieConsent";
import Chatbot from "@/components/Chatbot";
import FloatingCSSBackground from "@/components/FloatingCSSBackground";
import { ToastProvider } from "@/context/ToastContext";
import PWARegister from "@/components/PWARegister";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "VapeNova | Premium Vaporizers & Accessories",
  description: "Discover the best portable and desktop vaporizers. High-end collection for the ultimate experience.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
        <ThemeProvider>
          <PWARegister />
          <FloatingCSSBackground />
          <AuthProvider>
            <AdminProvider>
              <ProductProvider>
                <ToastProvider>
                  <CartProvider>
                    <AgeVerification />
                    <Header />
                    <main style={{ minHeight: '100vh', paddingTop: '80px' }}>
                      {children}
                    </main>
                    <Footer />
                    <ScrollToTop />
                    <CookieConsent />
                    <Chatbot />
                  </CartProvider>
                </ToastProvider>
              </ProductProvider>
            </AdminProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

