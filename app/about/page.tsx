import Link from "next/link";
import { ArrowLeft, Brain, Database, GitBranch, ShieldCheck, Target, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";

const highlights = [
  { icon: <Database className="size-5" />, title: "826k baris data", desc: "Dataset Lending Club 2007–2015 dengan 18.4% default rate" },
  { icon: <Brain className="size-5" />, title: "7 model diuji", desc: "LogReg, KNN, RF, XGB, CatBoost, LightGBM, Ensemble + Optuna tuning" },
  { icon: <Target className="size-5" />, title: "Dual threshold", desc: "THR_RECALL (F2-optimal) + THR_F1 (balanced), tuning OOF leak-free" },
  { icon: <ShieldCheck className="size-5" />, title: "SHAP explainability", desc: "Top-6 faktor penjelas aggregated dari one-hot ke fitur original" },
  { icon: <GitBranch className="size-5" />, title: "Full pipeline", desc: "EDA → Cleaning → IV/WoE → Modeling → Threshold → Deploy HF" },
  { icon: <Users className="size-5" />, title: "Human-in-the-loop", desc: "Rekomendasi AI + keputusan final oleh staf kredit" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="container h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/"><ArrowLeft className="size-4" /></Link>
            </Button>
            <span
              aria-label="CreditGuard"
              role="img"
              className="block h-7 w-32 bg-foreground"
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
            <span className="text-muted-foreground text-sm hidden sm:block">/ Tentang</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container py-16">
        <div className="mb-12">
          <p className="text-muted-foreground text-sm uppercase tracking-widest mb-3">Tentang Proyek</p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl mb-4">
            Credit Default Prediction
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            Sistem decision-support untuk penilaian risiko gagal bayar berbasis Machine Learning.
            Dibangun sebagai Final Project mata kuliah Machine Learning (COMP6577001) BINUS University.
          </p>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none mb-12">
          <h2 className="text-2xl font-semibold mb-4">Latar Belakang</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Penilaian kelayakan kredit (credit scoring) adalah salah satu aplikasi Machine Learning yang paling
            berdampak nyata. Tantangan utamanya: dataset tidak seimbang (18.4% default), banyak fitur correlated,
            dan model perlu bisa dijelaskan ke staf non-teknis.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Proyek ini mengimplementasikan end-to-end credit scoring pipeline — dari raw data Lending Club
            826k baris hingga sistem prediksi yang dapat diakses via web dengan penjelasan SHAP.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Arsitektur Sistem</h2>
          <div className="bg-muted/50 border border-border rounded-lg p-4 font-mono text-sm mb-6">
            <p className="text-muted-foreground">Lending Club parquet</p>
            <p className="pl-4">↓ EDA + Cleaning + Feature Engineering</p>
            <p className="pl-4">↓ 7 Model × 2 Imbalance Strategy × Optuna Tuning</p>
            <p className="pl-4">↓ Best: Ensemble Soft Voting (AUC 0.71, F1 0.41, KS 0.30)</p>
            <p className="pl-4">↓ Bundle (5 pipelines + soft voting + thresholds) → Hugging Face</p>
            <p className="pl-4">↓ FastAPI inference API (SHAP + risk band)</p>
            <p className="pl-4">↓ Next.js frontend (NIM lookup + decision panel)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {highlights.map((h, i) => (
            <Card key={i}>
              <CardContent className="pt-5 pb-5">
                <div className="flex items-start gap-3">
                  <div className="bg-muted rounded-lg p-2 shrink-0">{h.icon}</div>
                  <div>
                    <p className="font-semibold text-sm">{h.title}</p>
                    <p className="text-muted-foreground text-xs mt-1">{h.desc}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex gap-4 flex-wrap mt-8">
          <Button asChild>
            <Link href="/demo">Coba Demo</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Kembali ke Beranda</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
