import LandingNavbar from "@/components/landing/LandingNavbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import CtaBanner from "@/components/landing/CtaBanner";
import LandingFooter from "@/components/landing/LandingFooter";
import StyleWrapper from "./StyleWrapper";

const Home = () => {
  return (
    <StyleWrapper>
      <LandingNavbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CtaBanner />
      <LandingFooter />
    </StyleWrapper>
  );
}

export default Home
