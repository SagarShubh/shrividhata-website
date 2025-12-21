import { Hero } from "@/components/home/Hero";
import { Workflow } from "@/components/home/Workflow";
import { Services } from "@/components/home/Services";
import { Brands } from "@/components/home/Brands";
import { Portfolio } from "@/components/home/Portfolio";
import { Contact } from "@/components/home/Contact";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Workflow />
      <Services />
      <Brands />
      <Portfolio />
      <Contact />
    </div>
  );
}
