import HeroSection from "@/components/HeroSection";
import BrandIntro from "@/components/BrandIntro";
import ServicesSection from "@/components/ServicesSection";
import PortfolioMasonry from "@/components/PortfolioMasonry";
import PhilosophyStatement from "@/components/PhilosophyStatement";
import TransformationSection from "@/components/TransformationSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import LeadConversion from "@/components/LeadConversion";

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <BrandIntro />
      <ServicesSection />
      <PortfolioMasonry />
      <PhilosophyStatement />
      <TransformationSection />
      <TestimonialsSection />
      <LeadConversion />
    </div>
  );
}
