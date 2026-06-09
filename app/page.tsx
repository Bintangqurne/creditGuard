import { Navbar } from "@/components/blocks/navbar";
import { Hero } from "@/components/blocks/hero";
import { Stats } from "@/components/blocks/stats";
import { Features } from "@/components/blocks/features";
import { Timeline } from "@/components/blocks/timeline";
import { Team } from "@/components/blocks/team";
import { Faq } from "@/components/blocks/faq";
import { Contact } from "@/components/blocks/contact";
import { Footer } from "@/components/blocks/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
        <Stats />
        <Features />
        <Timeline />
        <Team />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
