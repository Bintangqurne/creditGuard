"use client";
import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollReveal } from "@/components/scroll-reveal";

type ContactForm = {
  nama: string;
  email: string;
  pesan: string;
};

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const form = useForm<ContactForm>({
    defaultValues: { nama: "", email: "", pesan: "" },
  });

  const onSubmit = async (data: ContactForm) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="bg-muted/50 py-32">
      <div className="container">
        <ScrollReveal direction="up">
          <span className="text-muted-foreground text-xs uppercase tracking-widest">Hubungi Kami /</span>
        </ScrollReveal>
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <ScrollReveal direction="left" delay={0.1}>
            <h2 className="text-4xl font-medium tracking-tight md:text-5xl">Get in touch</h2>
            <p className="text-muted-foreground mt-4 max-w-md">
              Punya pertanyaan tentang sistem, ingin berkolaborasi, atau butuh penjelasan metodologi? Kirim pesan!
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "Tanya tentang metodologi model",
                "Diskusi implementasi credit scoring",
                "Feedback untuk improvement",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="bg-background flex size-6 shrink-0 items-center justify-center rounded-full border">
                    <Check className="size-3.5" />
                  </span>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 font-semibold">CreditGuard</p>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.2}>
            <div className="bg-background border border-border rounded-lg p-6">
              {status === "sent" ? (
                <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary">
                    <Check className="size-6 text-primary-foreground" />
                  </div>
                  <p className="font-semibold text-lg">Pesan terkirim!</p>
                  <p className="text-muted-foreground text-sm">
                    Terima kasih, kami akan membalas di email kamu secepatnya.
                  </p>
                  <Button variant="outline" className="mt-2" onClick={() => setStatus("idle")}>
                    Kirim lagi
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
                    <FormField
                      control={form.control}
                      name="nama"
                      rules={{ required: "Nama wajib diisi" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nama</FormLabel>
                          <FormControl><Input {...field} placeholder="Nama Anda" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      rules={{ required: "Email wajib diisi", pattern: { value: /^\S+@\S+\.\S+$/, message: "Format email tidak valid" } }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl><Input {...field} type="email" placeholder="email@example.com" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="pesan"
                      rules={{ required: "Pesan wajib diisi" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pesan</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="Pesan Anda..." className="min-h-28" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {status === "error" && (
                      <p className="text-destructive text-sm">Gagal mengirim. Coba lagi atau email langsung ke bintangqurne07@gmail.com</p>
                    )}
                    <Button type="submit" disabled={status === "sending"}>
                      {status === "sending" && <Loader2 className="mr-2 size-4 animate-spin" />}
                      {status === "sending" ? "Mengirim..." : "Kirim Pesan"}
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
