import { Stage } from "@/components/Stage";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { Story } from "@/components/Story";
import { Shop } from "@/components/Shop";
import { Reviews } from "@/components/Reviews";
import { Faq } from "@/components/Faq";
import { Visit } from "@/components/Visit";
import { Footer } from "@/components/Footer";
import { CallBar } from "@/components/CallBar";

export default function Home() {
  return (
    <Stage>
      <a
        href="#repairs"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:font-semibold focus:text-ink-950"
      >
        Skip to content
      </a>

      <Nav />

      <main>
        <Hero />
        <Services />
        <Process />
        <Story />
        <Shop />
        <Reviews />
        <Faq />
        <Visit />
      </main>

      <Footer />
      <CallBar />
    </Stage>
  );
}
