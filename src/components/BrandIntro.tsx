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
            Since 2018, we have been <br className="hidden md:block"/>
            <span className="text-accent italic">transforming visions</span> into elegant, functional, and timeless reality.
          </h2>
          <p className="mt-12 text-foreground/60 text-lg md:text-xl font-sans max-w-3xl mx-auto leading-relaxed">
            Luxe Interiors is a premium interior design and execution firm dedicated to creating sophisticated spaces. We specialize in transforming residential and commercial interiors into luxurious environments that reflect our clients&apos; lifestyle, personality, and aspirations. Our team combines creativity with practicality, delivering designs that are not only visually stunning but also smart, efficient, and built to last.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
