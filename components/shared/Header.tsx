"use client"

import { useState, } from "react";
import { Button } from "@/components/ui/button";
import { Home, Menu, X } from "lucide-react";

// Navigation Component
interface HeaderProps {
  logoText?: string;
  navLinks?: Array<{ text: string; href: string }>;
}

export default function Header({
  logoText = "HostelHub",
  navLinks = [
    { text: "Features", href: "#features" },
    { text: "FAQ", href: "#faq" },
    { text: "Contact", href: "#contact" }
  ]
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Home className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">{logoText}</span>
          </div>

          <div className="hidden md:flex items-center justify-center gap-8">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.text}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm" className="px-2">
              Tenant Login
            </Button>
            <Button size="sm">
              Get Started
            </Button>
          </div>

          <button
            type="button"
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.text}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <Button variant="ghost" size="sm">
                Tenant Login
              </Button>
              <Button size="sm">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};