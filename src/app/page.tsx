import { Stage } from "@/components/Stage";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Brands } from "@/components/Brands";
import { Services } from "@/components/Services";
import { Shop } from "@/components/Shop";
import { OpenNow } from "@/components/OpenNow";
import { Band } from "@/components/Band";
import { Reviews } from "@/components/Reviews";
import { Process } from "@/components/Process";
import { Faq } from "@/components/Faq";
import { Visit } from "@/components/Visit";
import { Footer } from "@/components/Footer";
import { CallBar } from "@/components/CallBar";

export default function Home() {
  return (
    <Stage>
      <a
        href="#repairs"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand focus:px-5 focus:py-3 focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <Nav />

      <main>
        <Hero />
        <Brands />
        <Services />
        <Shop />
        <OpenNow />
        <Band />
        <Reviews />
        <Process />
        <Faq />
        <Visit />
      </main>

      <Footer />
      <CallBar />
    </Stage>
  );
}
