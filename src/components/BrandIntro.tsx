"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function BrandIntro() {
  const container = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 80%", "end 20%"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.1, 1, 1, 0.1]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);

  return (
    <section id="philosophy" ref={container} className="py-32 md:py-64 bg-background px-6">
      <div className="container mx-auto max-w-5xl">
        <motion.div style={{ opacity, y }} className="text-center">
          <h2 className="font-serif text-3xl md:text-5xl lg:text-7xl leading-snug">
            We believe that a space is more than just dimensions. It is a <br className="hidden md:block"/>
            <span className="text-accent italic">living canvas</span> that reflects your identity, aspirations, and the art of magnificent living.
          </h2>
          <p className="mt-12 text-foreground/60 text-lg md:text-xl font-sans max-w-2xl mx-auto leading-relaxed">
            Based in Madurai, we bring an uncompromising dedication to high-end interior craftsmanship. Every texture, every curve, and every beam of light is meticulously orchestrated to create sanctuaries of pure elegance.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
