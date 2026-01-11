import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Workflow } from "@/components/home/Workflow";
import { Services } from "@/components/home/Services";
import { Brands } from "@/components/home/Brands";
import { Portfolio } from "@/components/home/Portfolio";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { Contact } from "@/components/home/Contact";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <About />
      <Workflow />
      <Services />
      <Brands />
      <Portfolio />
      <Testimonials />
      <FAQ />
      <Contact />
    </div>
  );
}
