"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ScrollReveal } from "@/components/scroll-reveal";

const teamMembers = [
  { id: 1, name: "Ayatullah Bintang Qurne", designation: "Web Developer", photo: "/qurne.png", bg: "from-indigo-500/30 to-purple-500/20", cardHeight: "h-[420px]" },
  { id: 2, name: "Eldwin Sianto", designation: "ML Engineer", photo: "/eldwin.png", bg: "from-cyan-500/30 to-blue-500/20", cardHeight: "h-[340px]" },
  { id: 3, name: "Andreas Edward Putra Jatmiko", designation: "ML Engineer", photo: "/andreas.jpeg", bg: "from-emerald-500/30 to-teal-500/20", cardHeight: "h-[480px]" },
];

export function Team() {
  return (
    <section id="team" className="py-10">
      <div className="container">
        <div className="relative w-full">
          <ScrollReveal direction="up">
            <div className="flex justify-between text-sm font-medium tracking-tight lg:text-xl">
              <p>[ KELOMPOK KAMI ]</p>
              <Link
                href="/demo"
                className="text-muted-foreground hover:text-foreground group flex cursor-pointer items-center gap-2"
              >
                [ COBA DEMO
                <ArrowRight className="size-[1em] transition-transform duration-300 group-hover:rotate-45" />
                ]
              </Link>
            </div>
          </ScrollReveal>

          {/* Mobile Carousel */}
          <div className="mt-12 lg:hidden">
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent>
                {teamMembers.map((member) => (
                  <CarouselItem className="basis-1/2" key={member.id}>
                    <motion.div
                      initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
                      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
                      transition={{ type: "spring", stiffness: 150, damping: 20 }}
                      className={cn(member.cardHeight, "overflow-hidden rounded-xl relative flex items-end")}
                    >
                      <Image src={member.photo} alt={member.name} fill sizes="(max-width: 1024px) 50vw, 33vw" className="object-cover object-top" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      <div className="relative z-10 p-6">
                        <p className="text-white text-lg font-medium tracking-tight">{member.name}</p>
                        <p className="text-white/60 text-sm">{member.designation}</p>
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>

          {/* Desktop Grid */}
          <div className="mt-12 hidden justify-between gap-4 lg:flex">
            {teamMembers.map((member, idx) => (
              <ScrollReveal
                key={member.id}
                direction={idx % 2 === 0 ? "left" : "right"}
                delay={idx * 0.08}
                className="w-1/3"
              >
                <motion.div
                  initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
                  whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
                  viewport={{ once: false }}
                  transition={{ type: "spring", stiffness: 150, damping: 20, delay: idx * 0.05 }}
                  className={cn(member.cardHeight, "overflow-hidden rounded-xl relative flex items-end")}
                >
                  <Image src={member.photo} alt={member.name} fill sizes="33vw" className="object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="relative z-10 p-6">
                    <p className="text-white font-medium tracking-tight lg:text-xl">{member.name}</p>
                    <p className="text-white/60 text-sm">{member.designation}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
