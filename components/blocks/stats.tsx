"use client";
import React from "react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts";
import { ScrollReveal } from "@/components/scroll-reveal";

const statsData = [
  { title: "7 Model", description: "Logistic Reg, KNN, RF, XGBoost, CatBoost, LightGBM, Ensemble" },
  { title: "AUC 0.71", description: "Area Under Curve pada model Ensemble terbaik" },
  { title: "18 Fitur", description: "4 input pengguna + 14 data profil dari database" },
];

const chartData = [
  { metric: "AUC", value: 71 },
  { metric: "F1", value: 41 },
  { metric: "KS", value: 30 },
  { metric: "Recall", value: 61 },
  { metric: "Precision", value: 31 },
];

export function Stats() {
  return (
    <section id="stats" className="overflow-hidden py-10">
      <div className="container flex w-full flex-col items-center justify-center">
        <ScrollReveal direction="up" className="flex flex-col items-center">
          <p className="bg-muted mb-4 w-fit rounded-full px-3 py-1 text-xs uppercase tracking-widest">
            Performa Model
          </p>
          <h2 className="relative py-2 text-center font-sans text-4xl font-semibold tracking-tighter lg:text-5xl">
            Angka yang Bicara
          </h2>
          <p className="text-muted-foreground mx-auto max-w-xl px-5 text-center text-sm lg:text-base mt-3">
            7 model diuji dengan Optuna hyperparameter tuning, threshold optimal, dan stratified 5-fold cross-validation.
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.15} className="my-10 h-64 w-full max-w-md">
          <div suppressHydrationWarning className="h-full">
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={chartData}>
                <Tooltip />
                <PolarAngleAxis dataKey="metric" className="text-xs" />
                <PolarGrid />
                <Radar
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.4}
                  dot={{ r: 4, fillOpacity: 1 }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </ScrollReveal>

        <div className="flex w-full max-w-2xl items-center justify-between gap-4 flex-wrap">
          {statsData.map((stat, index) => (
            <ScrollReveal
              key={index}
              direction={index % 2 === 0 ? "left" : "right"}
              delay={index * 0.1}
              className="flex flex-col items-center justify-center gap-2 text-center flex-1 min-w-32"
            >
              <h2 className="text-3xl font-semibold tracking-tighter md:text-4xl">{stat.title}</h2>
              <p className="text-muted-foreground text-sm">{stat.description}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
