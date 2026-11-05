"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Sparkles } from "lucide-react";

export default function BrandIntro() {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 80%", "end 20%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.1, 1, 1, 0.1]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -60]);

  const metrics = [
    { label: "Established", value: "2018", detail: "Rooted in Madurai" },
    { label: "Projects", value: "50+", detail: "Curated Spaces" },
    { label: "Execution", value: "100%", detail: "Turnkey Precision" },
  ];

  return (
    <section id="philosophy" ref={container} className="py-24 md:py-40 bg-background px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div style={{ opacity, y }} className="text-center">
          
          {/* Refined Heritage Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs uppercase tracking-[0.2em] font-semibold mb-6">
            <Sparkles size={12} className="text-accent" />
            <span>Our Heritage &amp; Philosophy</span>
          </div>

          {/* Balanced Editorial Heading (refined down from 7xl to 4xl/5xl) */}
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[44px] leading-snug md:leading-tight tracking-tight text-foreground max-w-3xl mx-auto">
            Since 2018, we have been <br className="hidden md:block" />
            <span className="text-accent italic font-normal">transforming visions</span> into elegant, functional, and timeless reality.
          </h2>

          {/* Refined Body Copy (down from text-xl max-w-3xl to text-base/lg max-w-2xl) */}
          <p className="mt-8 text-foreground/65 text-base md:text-lg font-sans max-w-2xl mx-auto leading-relaxed">
            Luxe Interiors is a premium interior design and execution firm dedicated to creating sophisticated spaces. We specialize in transforming residential and commercial interiors into luxurious environments that reflect our clients&apos; lifestyle, personality, and aspirations. Our team combines creativity with practicality, delivering designs that are not only visually stunning but also smart, efficient, and built to last.
          </p>

          {/* Subtle Key Metrics Strip */}
          <div className="mt-14 pt-10 border-t border-border/60 grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto">
            {metrics.map((item) => (
              <div key={item.label} className="text-center">
                <span className="block font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                  {item.value}
                </span>
                <span className="block text-xs uppercase tracking-widest text-accent font-semibold mt-1">
                  {item.label}
                </span>
                <span className="hidden sm:block text-xs text-foreground/50 mt-0.5">
                  {item.detail}
                </span>
              </div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
