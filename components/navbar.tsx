"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useUser, UserButton, SignInButton } from "@clerk/nextjs";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/search-bar";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isLoaded } = useUser();
  const totalItems = useCartStore((state) => state.getTotalItems());
  const isAdmin = (user?.publicMetadata as any)?.role === "admin";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/track-order", label: "Track Order" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-8 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b transition-shadow duration-300 ${
          isScrolled ? "shadow-lg" : ""
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="shrink-0">
              <span className="text-2xl font-bold bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent">
                VapeNova
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center space-x-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Search Bar — Desktop */}
            <div className="hidden lg:flex flex-1 max-w-sm mx-5">
              <SearchBar />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {isAdmin && (
                <Link href="/admin">
                  <Button variant="outline" size="sm" className="hidden sm:flex text-xs">
                    Admin
                  </Button>
                </Link>
              )}

              {isLoaded && (
                user ? (
                  <UserButton afterSignOutUrl="/" />
                ) : (
                  <SignInButton mode="redirect">
                    <Button variant="ghost" size="sm" className="hidden sm:flex">
                      Sign In
                    </Button>
                  </SignInButton>
                )
              )}

              <Link href="/cart" className="relative">
                <Button variant="ghost" size="icon" aria-label="Cart">
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-[7.5rem] left-0 right-0 bg-background border-b z-40 md:hidden shadow-xl">
          <div className="container mx-auto px-4 py-4">
            <div className="mb-4">
              <SearchBar />
            </div>
            <nav className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-3 px-2 text-base font-medium hover:text-primary transition-colors border-b border-gray-800 last:border-0"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {!user && (
                <Link
                  href="/sign-in"
                  className="py-3 px-2 text-base font-medium hover:text-primary transition-colors border-b border-gray-800"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
              {isAdmin && (
                <Link
                  href="/admin"
                  className="py-3 px-2 text-base font-medium hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Admin Panel
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
