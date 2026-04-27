import Nav from "../components/Nav";
import Hero from "../components/Hero";
import TrustedBy from "../components/TrustedBy";
import ProductIntro from "../components/ProductIntro";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Stats from "../components/Stats";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function Landing() {
  return (
    <main
      data-testid="landing-page"
      className="relative min-h-screen bg-[#050505] text-[#f5f3ee] overflow-hidden"
    >
      <Nav />
      <Hero />
      <TrustedBy />
      <ProductIntro />
      <Features />
      <HowItWorks />
      <Stats />
      <CTA />
      <Footer />
    </main>
  );
}
