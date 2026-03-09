import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { SocialProof } from "@/components/sections/SocialProof";
import { Problem } from "@/components/sections/Problem";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { AppShowcase } from "@/components/sections/AppShowcase";
import { Features } from "@/components/sections/Features";
import { ToroSpotlight } from "@/components/sections/ToroSpotlight";
import { WaitlistMechanics } from "@/components/sections/WaitlistMechanics";
import { FAQ } from "@/components/sections/FAQ";
import { FooterCTA } from "@/components/sections/FooterCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Problem />
        <HowItWorks />
        <AppShowcase />
        <Features />
        <ToroSpotlight />
        <WaitlistMechanics />
        <FAQ />
        <FooterCTA />
      </main>
      <Footer />
    </>
  );
}
