import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Investment } from "@/components/sections/investment";
import { Properties } from "@/components/sections/properties";

export default function Home() {
  return (
    <main className="bg-[#F8F8F8] text-[#141414] font-lato">
      <Hero />
      <Properties />
      <HowItWorks />
      <Investment />
      <Footer />
    </main>
  );
}
