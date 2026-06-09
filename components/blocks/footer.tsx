"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Beranda", href: "#hero" },
  { label: "Fitur", href: "#features" },
  { label: "Cara Kerja", href: "#timeline" },
  { label: "Tim", href: "#team" },
  { label: "Tools", href: "#stack" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontak", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="bg-background text-foreground border-t border-border py-20">
      <div className="container">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <div className="flex flex-col gap-4 max-w-xs">
            <span
              aria-label="CreditGuard"
              role="img"
              className="block h-8 w-36 bg-foreground"
              style={{
                maskImage: "url(/logo.png)",
                WebkitMaskImage: "url(/logo.png)",
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskPosition: "left center",
                WebkitMaskPosition: "left center",
              }}
            />
            <p className="text-muted-foreground text-sm">
              Decision-support prediksi risiko gagal bayar berbasis Machine Learning dengan penjelasan SHAP.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 text-sm">
            <div>
              <p className="font-semibold mb-3">Navigasi</p>
              <ul className="space-y-2">
                {NAV_LINKS.slice(0, 3).map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-muted-foreground hover:text-foreground transition-colors">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-3">Lainnya</p>
              <ul className="space-y-2">
                {NAV_LINKS.slice(3).map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-muted-foreground hover:text-foreground transition-colors">
                      {item.label}
                    </a>
                  </li>
                ))}
                <li>
                  <Link href="/demo" className="text-muted-foreground hover:text-foreground transition-colors">
                    Demo
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-8 flex flex-col md:flex-row md:justify-between gap-4 text-sm text-muted-foreground">
          <p>Dataset Lending Club 2007–2015 · Alat edukasi, bukan keputusan kredit resmi.</p>
          <p>CreditGuard</p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-6xl font-bold tracking-tighter text-muted-foreground/20 text-center select-none"
        >
          CREDITGUARD
        </motion.div>
      </div>
    </footer>
  );
}
