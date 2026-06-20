import SiteHeader from "../components/landing/SiteHeader";
import LandingHero from "../components/landing/LandingHero";
import LogoBar from "../components/landing/LogoBar";
import MeetAceSection from "../components/landing/MeetAceSection";
import AceModeSection from "../components/landing/AceModeSection";
import AbsModeSection from "../components/landing/AbsModeSection";
import WhyAceSection from "../components/landing/WhyAceSection";
import WorkflowSection from "../components/landing/WorkflowSection";
import PerformanceSection from "../components/landing/PerformanceSection";
import SavingsCTA from "../components/SavingsCTA";
import PublishedReviews from "../components/PublishedReviews";
import FinalCtaSection from "../components/landing/FinalCtaSection";
import LandingFooter from "../components/landing/LandingFooter";

export default function Landing() {
  return (
    <main
      data-testid="landing-page"
      className="relative min-h-screen overflow-x-hidden bg-white text-neutral-900"
    >
      <SiteHeader />
      <LandingHero />
      <LogoBar />
      <MeetAceSection />
      <AceModeSection />
      <AbsModeSection />
      <WhyAceSection />
      <WorkflowSection />
      <PerformanceSection />
      <SavingsCTA />
      <PublishedReviews />
      <FinalCtaSection />
      <LandingFooter />
    </main>
  );
}
