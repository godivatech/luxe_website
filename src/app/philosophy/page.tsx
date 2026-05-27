import type { Metadata } from "next";
import PhilosophyHero from "@/components/philosophy/PhilosophyHero";
import PhilosophyPillars from "@/components/philosophy/PhilosophyPillars";
import PhilosophyProcess from "@/components/philosophy/PhilosophyProcess";
// import MaterialityGrid from "@/components/philosophy/MaterialityGrid";
import FounderPerspective from "@/components/philosophy/FounderPerspective";
import LeadConversion from "@/components/LeadConversion";

export const metadata: Metadata = {
  title: "Design Philosophy | LUXE Interior Decors",
  description: "Explore the core design principles, spatial tenets, turnkey execution process, and material craftsmanship of LUXE Interior Decors.",
};

export default function PhilosophyPage() {
  return (
    <div className="w-full bg-background overflow-hidden">
      <PhilosophyHero />
      <PhilosophyPillars />
      <PhilosophyProcess />
      {/* <MaterialityGrid /> */}
      <FounderPerspective />
      <LeadConversion />
    </div>
  );
}
