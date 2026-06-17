import { HeroSection } from "../components/ui/hero-section-2";
import ProductIntro from "../components/ProductIntro";
import SavingsCTA from "../components/SavingsCTA";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Stats from "../components/Stats";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function Landing() {
  return (
    <main
      data-testid="landing-page"
      className="relative min-h-screen overflow-hidden bg-background text-foreground"
    >
      <HeroSection />
      <ProductIntro />
      <SavingsCTA />
      <Features />
      <HowItWorks />
      <Stats />
      <CTA />
      <Footer />
    </main>
  );
}
