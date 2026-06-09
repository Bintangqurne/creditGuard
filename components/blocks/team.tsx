"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ScrollReveal } from "@/components/scroll-reveal";

const teamMembers = [
  { id: 1, name: "Ayatullah Bintang Qurne", designation: "Web Developer", photo: "/qurne.png", cardHeight: "h-[420px]", objectPosition: "center 20%", linkedin: "https://www.linkedin.com/in/ayatullah-bintang-qurne-19a0992ba/" },
  { id: 2, name: "Eldwin Sianto", designation: "ML Engineer", photo: "/eldwin.png", cardHeight: "h-[340px]", objectPosition: "center top", linkedin: "https://www.linkedin.com/in/eldwins-sianto-498bb0330/" },
  { id: 3, name: "Andreas Edward Putra Jatmiko", designation: "ML Engineer", photo: "/andreas.jpeg", cardHeight: "h-[480px]", objectPosition: "center top", linkedin: "https://www.linkedin.com/in/andreas-edward-putra-jatmiko/" },
];

function MemberCard({
  member,
  sizes,
  onMouseEnter,
  onMouseLeave,
}: {
  member: typeof teamMembers[0];
  sizes: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  return (
    <motion.a
      href={member.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: false }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
      whileHover={{ scale: 1.02 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(member.cardHeight, "group overflow-hidden rounded-xl relative flex items-end cursor-none")}
    >
      <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-110">
        <Image
          src={member.photo}
          alt={member.name}
          fill
          sizes={sizes}
          className="object-cover"
          style={{ objectPosition: member.objectPosition }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-all duration-300 group-hover:from-black/85 group-hover:via-black/30" />
      <div className="relative z-10 p-6 w-full transition-transform duration-300 translate-y-1 group-hover:translate-y-0">
        <p className="text-white font-medium tracking-tight text-base lg:text-xl leading-tight">{member.name}</p>
        <p className="text-white/60 text-sm mt-0.5 group-hover:text-white/80 transition-colors duration-300">{member.designation}</p>
      </div>
    </motion.a>
  );
}

export function Team() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [cursorVisible, setCursorVisible] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 300, damping: 28 });
  const y = useSpring(rawY, { stiffness: 300, damping: 28 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(e.clientX - rect.left);
    rawY.set(e.clientY - rect.top);
  }

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

          {/* Mobile Carousel — no custom cursor */}
          <div className="mt-12 lg:hidden">
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent>
                {teamMembers.map((member) => (
                  <CarouselItem className="basis-1/2" key={member.id}>
                    <MemberCard member={member} sizes="50vw" />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>

          {/* Desktop Grid — custom cursor zone */}
          <div
            ref={sectionRef}
            className="mt-12 hidden lg:block relative"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { setCursorVisible(false); }}
          >
            {/* Custom cursor */}
            <motion.div
              className="pointer-events-none absolute z-50"
              style={{ x, y, translateX: "-50%", translateY: "-50%" }}
              animate={{ opacity: cursorVisible ? 1 : 0, scale: cursorVisible ? 1 : 0.7 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold whitespace-nowrap bg-foreground text-background shadow-lg">
                LinkedIn <span className="text-sm">↗</span>
              </div>
            </motion.div>

            <div className="flex justify-between gap-4">
              {teamMembers.map((member, idx) => (
                <ScrollReveal
                  key={member.id}
                  direction={idx % 2 === 0 ? "left" : "right"}
                  delay={idx * 0.08}
                  className="w-1/3"
                >
                  <MemberCard
                    member={member}
                    sizes="33vw"
                    onMouseEnter={() => setCursorVisible(true)}
                    onMouseLeave={() => setCursorVisible(false)}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
