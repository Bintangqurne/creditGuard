"use client";
import { MenuIcon, X, BarChart2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV_LINKS = [
  { label: "Beranda", href: "#hero" },
  { label: "Fitur", href: "#features" },
  { label: "Cara Kerja", href: "#timeline" },
  { label: "Tim", href: "#team" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontak", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${scrolled ? "bg-background/95 backdrop-blur border-b border-border shadow-sm" : "bg-transparent"}`}>
        <div className="container h-16 flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight shrink-0">
            <BarChart2 className="size-5" />
            <span>CreditGuard</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="cursor-pointer px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent active:scale-95 active:text-foreground select-none">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild size="sm" className="hidden lg:inline-flex">
              <Link href="/demo">Coba Demo</Link>
            </Button>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(!open)}>
              {open ? <X className="size-5" /> : <MenuIcon className="size-5" />}
            </Button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 bg-background pt-16">
          <nav className="container py-6 flex flex-col gap-2">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="cursor-pointer py-3 px-4 text-lg font-medium border-b border-border hover:bg-accent rounded-md transition-colors active:scale-[0.98] select-none">
                {l.label}
              </a>
            ))}
            <Button asChild className="mt-4">
              <Link href="/demo" onClick={() => setOpen(false)}>Coba Demo</Link>
            </Button>
          </nav>
        </div>
      )}
    </>
  );
}
