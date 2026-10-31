"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function PhilosophyStatement() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Typography animations: scale 8x (from 0.1875 to 1.5), starting from 80vw base size to prevent blurriness and wrapping
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.1875, 1.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  
  // Content reveal animations: start earlier and translate over shorter distance for smoothness
  const contentOpacity = useTransform(scrollYProgress, [0.35, 0.65], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.35, 0.65], [30, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[250vh] bg-surface-muted border-y border-border"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center pointer-events-none">
        
        {/* The Kinetic Word */}
        <motion.div 
          style={{ scale, opacity, willChange: "transform, opacity" }}
          className="z-10 pointer-events-none transform-gpu scale-[0.1875]"
        >
          <h2 className="font-serif text-[80vw] font-bold tracking-tighter text-foreground/[0.06] uppercase leading-none select-none whitespace-nowrap">
            Timeless
          </h2>
        </motion.div>

        {/* The Revealed Philosophy */}
        <motion.div 
          style={{ opacity: contentOpacity, y: contentY, willChange: "transform, opacity" }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center max-w-4xl mx-auto pointer-events-auto transform-gpu"
        >
          <span className="text-accent uppercase tracking-[0.5em] text-xs mb-8 block font-sans font-semibold">
            Our Statement
          </span>
          <h3 className="font-serif text-3xl md:text-5xl lg:text-6xl italic text-foreground leading-tight mb-12">
            &quot;We don&apos;t follow trends; <br />
            we create environments that <br /> 
            <span className="text-accent font-normal">outlast them.</span>&quot;
          </h3>
          <p className="text-foreground/70 text-lg md:text-xl font-sans max-w-2xl leading-relaxed">
            Every LUXE space is a balance of heritage and innovation. We believe that true luxury 
            isn&apos;t just about how a room looks—it&apos;s about how it endures through time, 
            evolving with those who inhabit it.
          </p>
          
          <div className="mt-16 w-px h-24 bg-gradient-to-b from-accent to-transparent" />
        </motion.div>

        {/* Subtle Background Elements */}
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
        </div>
      </div>
    </section>
  );
}
