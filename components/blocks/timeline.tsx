"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/scroll-reveal";

const data = [
  {
    title: "EDA & Data Cleaning",
    description:
      "Eksplorasi dataset Lending Club 826k baris, 18 fitur. Penanganan missing values dengan 4-cut binning, feature engineering credit_age_years dari earliest_cr_line.",
    date: "Step 1",
  },
  {
    title: "Feature Selection & Imbalance",
    description:
      "IV/WoE analysis untuk seleksi 18 fitur final. Penanganan class imbalance dengan class_weight (dominan) vs SMOTE — class_weight terbukti lebih baik untuk credit scoring.",
    date: "Step 2",
  },
  {
    title: "7 Model + Optuna Tuning",
    description:
      "Logistic Regression, KNN, Random Forest, XGBoost, CatBoost, LightGBM, SVM — semua diuji dengan Optuna hyperparameter optimization, StratifiedKFold 5-fold CV.",
    date: "Step 3",
  },
  {
    title: "Threshold Tuning & Bundle",
    description:
      "Dual-threshold tuning out-of-fold: THR_RECALL (F2-optimal untuk cakupan risiko) dan THR_F1 (balanced). Model terbaik LightGBM dibundle ke Hugging Face.",
    date: "Step 4",
  },
  {
    title: "Deploy API + Web",
    description:
      "FastAPI inference API dengan SHAP TreeExplainer. Next.js frontend dengan decision-support: NIM lookup → profil → prediksi + SHAP → keputusan staf.",
    date: "Step 5",
  },
];

export function Timeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = itemRefs.current.findIndex((ref) => ref === entry.target);
            if (index !== -1) setActiveIndex(index);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );
    itemRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="timeline" className="py-10">
      <div className="container">
        <ScrollReveal direction="left">
          <h1 className="max-w-4xl text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
            <span className="font-medium">Dari Data Mentah ke Model Siap Produksi</span>
            <br />
            <span className="text-muted-foreground"> Metodologi Kami</span>
          </h1>
        </ScrollReveal>
      </div>

      <div className="relative mt-16 lg:mt-28">
        <div className="bg-background sticky top-16 z-10 border-y py-10">
          <div className="container">
            <div className="flex justify-between gap-4 text-2xl md:text-4xl">
              <p className="text-muted-foreground font-mono">
                {String(activeIndex + 1).padStart(2, "0")}
              </p>
              <p className="font-mono">{data[activeIndex]?.date}</p>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="flex flex-col">
            {data.map((item, index) => (
              <div
                key={index}
                ref={(el) => { itemRefs.current[index] = el; }}
                className={cn(
                  "flex flex-col gap-4 py-10 md:py-12 min-h-[160px] opacity-40 transition-opacity duration-300",
                  index === activeIndex && "opacity-100"
                )}
              >
                <ScrollReveal direction={index % 2 === 0 ? "left" : "right"}>
                  <h2 className="text-3xl font-medium md:text-5xl">{item.title}</h2>
                  <p className="text-muted-foreground md:text-balance max-w-2xl text-lg leading-relaxed mt-3">
                    {item.description}
                  </p>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
