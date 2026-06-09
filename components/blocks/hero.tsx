"use client";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { Button } from "@/components/ui/button";

const Boxes = ({ className }: { className?: string }) => {
  const rows = new Array(10).fill(1);
  const cols = new Array(10).fill(1);
  const colors = ["#6366f1", "#8b5cf6", "#ec4899", "#06b6d4", "#10b981"];
  const getColor = () => colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className={cn("absolute inset-0 flex flex-col pointer-events-none overflow-hidden", className)}>
      {rows.map((_, ri) => (
        <div key={`row-${ri}`} className="flex flex-1">
          {cols.map((_, ci) => (
            <div
              key={`col-${ci}`}
              className="flex-1 border-l border-t border-border/20 relative group hover:bg-accent/20 transition duration-300"
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export function Hero() {
  return (
    <section id="hero" className="flex items-center">
      <div className="container relative flex w-full flex-col items-center justify-center overflow-hidden" style={{ minHeight: "600px" }}>
        <div className="bg-background pointer-events-none absolute inset-0 z-20 h-full w-full [mask-image:radial-gradient(transparent,white)]" />
        <Boxes />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="z-30 relative flex flex-col items-center gap-6 max-w-4xl text-center"
        >
          <div className="bg-muted/80 text-muted-foreground border border-border text-xs px-3 py-1 rounded-full">
            CreditGuard
          </div>

          <h1 className="text-5xl font-medium tracking-tight md:text-7xl">
            <span className="text-muted-foreground/60">Prediksi Risiko </span>
            <LineShadowText>Gagal Bayar</LineShadowText>
            <span className="text-muted-foreground/60"> — Transparan</span>
            <span>.</span>
          </h1>

          <p className="text-muted-foreground max-w-xl text-lg">
            Decision-support berbasis Machine Learning dengan penjelasan SHAP. Input NIM, tarik profil, dapatkan analisis risiko kredit yang transparan.
          </p>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Button asChild size="lg">
              <Link href="/demo">
                Coba Demo <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/about">Tentang Proyek</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
