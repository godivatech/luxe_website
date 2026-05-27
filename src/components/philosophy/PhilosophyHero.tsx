"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function PhilosophyHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-background flex items-center"
    >
      {/* Background Image Container */}
      <motion.div style={{ y: imgY, opacity }} className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background z-10" />
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2500&auto=format&fit=crop"
          alt="Luxury Architecture Detail"
          className="w-full h-full object-cover scale-105"
        />
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-20 container mx-auto px-6 md:px-12 pt-24">
        <div className="max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-accent uppercase tracking-[0.3em] text-xs md:text-sm mb-6 block font-sans font-semibold"
          >
            Our Design Values
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl lg:text-8xl font-bold leading-tight text-white"
          >
            Where beautiful design <br />
            meets <span className="text-accent italic font-light">everyday life</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 font-sans text-lg md:text-xl text-foreground/60 max-w-2xl leading-relaxed"
          >
            At LUXE, we look beyond the structure. We shape natural light, clean spaces, 
            and premium textures to create rooms that feel open, peaceful, and perfectly 
            suited to your lifestyle.
          </motion.p>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-6 md:left-12 flex items-center gap-4 z-20"
      >
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 w-full h-full bg-accent"
          />
        </div>
        <span className="text-xs uppercase tracking-widest text-white/50">Scroll to explore</span>
      </motion.div>
    </section>
  );
}
