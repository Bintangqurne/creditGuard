"use client";
import { ArrowUpRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/scroll-reveal";

const faqItems = [
  {
    question: "Apa itu CreditGuard?",
    answer: "CreditGuard adalah sistem decision-support prediksi risiko gagal bayar berbasis Machine Learning. Sistem ini membantu staf kredit menilai kelayakan pinjaman berdasarkan profil finansial pemohon menggunakan model LightGBM yang telah dilatih dengan dataset Lending Club.",
  },
  {
    question: "Apakah prediksi ini final/mengikat?",
    answer: "Tidak. CreditGuard adalah alat bantu keputusan (decision-support), bukan sistem otomatis. Keputusan akhir tetap ada di tangan staf kredit. Sistem ini memberikan rekomendasi berdasarkan data — staf bisa menyetujui atau menolak berdasarkan pertimbangan profesional.",
  },
  {
    question: "Apa itu SHAP dan mengapa penting?",
    answer: "SHAP (SHapley Additive exPlanations) menjelaskan faktor-faktor yang mempengaruhi prediksi model. Dengan SHAP, staf dapat melihat mengapa suatu NIM mendapat risiko TINGGI/SEDANG/RENDAH — misalnya karena DTI tinggi atau skor FICO rendah. Ini membuat AI transparan dan akuntabel.",
  },
  {
    question: "Apa perbedaan mode Recall vs Seimbang?",
    answer: "Mode Recall (THR ~0.36) memprioritaskan mendeteksi sebanyak mungkin pemohon berisiko tinggi — cocok ketika biaya lolos default lebih besar dari biaya menolak yang seharusnya diterima. Mode Seimbang (THR ~0.52) menyeimbangkan false positive dan false negative.",
  },
  {
    question: "Data apa yang digunakan untuk training?",
    answer: "Dataset Lending Club 2007–2015 dengan 826k baris dan 18.4% default rate. 18 fitur meliputi FICO score, DTI, income, employment length, home ownership, dll. Data ini adalah dataset publik yang umum digunakan untuk penelitian credit scoring.",
  },
  {
    question: "Apakah data NIM mahasiswa aman?",
    answer: "NIM yang digunakan adalah NIM mahasiswa BINUS yang nyata, namun data finansial yang muncul (pendapatan, DTI, skor FICO, dll.) bukan data keuangan asli — melainkan data Lending Club yang di-assign secara acak ke setiap NIM. NIM hanya berfungsi sebagai kunci lookup dan tidak ditampilkan ulang di hasil, karena pengguna yang menginput NIM-nya sendiri sudah tahu NIM mereka.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="py-10">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12 xl:grid-cols-12 xl:gap-16">
          <ScrollReveal direction="left" className="flex flex-col justify-between lg:col-span-2 xl:col-span-4">
            <div>
              <div className="mb-8">
                <h2 className="font-semibold text-lg">Tim CreditGuard</h2>
                <p className="text-sm text-muted-foreground">CreditGuard</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Masih ada pertanyaan?</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Hubungi kami via email atau kunjungi halaman demo untuk mencoba langsung sistem prediksi risiko kredit kami.
                </p>
              </div>
            </div>
            <div className="py-10">
              <a href="#contact" className="group flex items-center h-auto p-0 text-base font-medium">
                <span className="border-border border-b-2 pb-0.5 transition-colors">Hubungi kami</span>
                <ArrowUpRight className="ml-1 h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1} className="lg:col-span-3 xl:col-span-8">
            <div className="mb-8 md:text-center lg:text-left">
              <h1 className="text-4xl font-medium leading-none tracking-tight sm:text-6xl">FAQ</h1>
            </div>
            <Accordion type="single" collapsible defaultValue="item-0" className="space-y-0">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className={cn("border-0", index !== faqItems.length - 1 && "border-border border-b")}
                >
                  <AccordionTrigger className="justify-between py-6 text-left text-lg font-semibold hover:no-underline">
                    <span className="pr-4">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 pr-8 pt-0 text-sm leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
