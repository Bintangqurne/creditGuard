import React from "react";
import { Brain, Database, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollReveal } from "@/components/scroll-reveal";

const DATA = [
  {
    title: "Input NIM, Profil Otomatis",
    description:
      "Masukkan NIM mahasiswa — sistem otomatis menarik 14 fitur finansial dari database tanpa input manual.",
    icon: <Database className="size-5" />,
    className: "absolute cursor-pointer top-0.5",
  },
  {
    title: "Prediksi berbasis AI",
    description:
      "LightGBM dengan Optuna tuning menghasilkan probabilitas default dan risk band (RENDAH/SEDANG/TINGGI).",
    icon: <Brain className="size-5" />,
    className: "absolute cursor-pointer -right-4 top-5 xl:top-0 xl:right-5",
  },
  {
    title: "Transparan dengan SHAP",
    description:
      "Top-6 faktor penjelas berbasis SHAP value ditampilkan agar keputusan staf dapat dipertanggungjawabkan.",
    icon: <ShieldCheck className="size-5" />,
    className: "absolute cursor-pointer bottom-2 left-[25%]",
  },
];

const CardComponent = ({
  title,
  description,
  icon,
  className,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}) => (
  <div className={className}>
    <Card className="flex max-w-lg transform items-center gap-4 rounded-2xl p-6 shadow-lg transition-transform hover:scale-105">
      <div className="bg-muted shrink-0 rounded-full p-3.5">{icon}</div>
      <div className="font-semibold">
        <p>{title}</p>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </Card>
  </div>
);

export function Features() {
  return (
    <section id="features" className="py-10">
      <div className="container">
        <div className="relative py-20 md:py-24 lg:py-28">
          <ScrollReveal direction="up">
            <h2 className="mx-auto max-w-5xl text-center text-5xl font-medium sm:text-6xl lg:text-7xl xl:text-[85px]">
              <span className="text-muted-foreground">
                Sistem kredit yang seharusnya transparan{" "}
              </span>
              <span>dan akuntabel.</span>
            </h2>
          </ScrollReveal>

          {/* Mobile: grid stacked */}
          <div className="lg:hidden">
            <div className="grid translate-y-4 justify-items-center gap-2 mt-8">
              {DATA.map((card, i) => (
                <ScrollReveal key={i} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.1}>
                  <CardComponent title={card.title} description={card.description} icon={card.icon} />
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Desktop: absolute floating cards */}
          <div className="absolute inset-0 max-lg:hidden">
            {DATA.map((card, i) => (
              <CardComponent
                key={i}
                title={card.title}
                description={card.description}
                icon={card.icon}
                className={card.className}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
