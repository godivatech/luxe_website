"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function PhilosophyStatement() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Architectural Frame Expansion:
  // Starts as an elegant framed window (scale 0.72) and expands smoothly to envelop the screen (scale 1.35)
  const frameScale = useTransform(scrollYProgress, [0, 0.45], [0.75, 1.35]);
  const frameRadius = useTransform(scrollYProgress, [0, 0.35], ["24px", "0px"]);
  
  // Inner image subtle counter-zoom for high-end optical depth
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.25, 1.05]);

  // Dark editorial atmospheric overlay deepens as the frame expands to ensure flawless text legibility
  const overlayOpacity = useTransform(scrollYProgress, [0.15, 0.45], [0.25, 0.72]);

  // Initial subtitle tag inside the framed window (fades as you expand into the room)
  const badgeOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Philosophy quote reveals as the frame envelops the viewport
  const contentOpacity = useTransform(scrollYProgress, [0.35, 0.58], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.35, 0.58], [35, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[240vh] bg-background border-y border-border"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* The Expanding Architectural Frame Window */}
        <motion.div 
          style={{ 
            scale: frameScale, 
            borderRadius: frameRadius,
            willChange: "transform, border-radius" 
          }}
          className="relative w-[90vw] md:w-[68vw] aspect-[16/10] md:aspect-[16/9] overflow-hidden shadow-[0_20px_80px_rgba(22,21,20,0.18)] border border-border/80 transform-gpu"
        >
          {/* Custom Client Showcase Photography */}
          <motion.img
            src="/images/statement.png"
            alt="LUXE Interior Decors - Architectural Showcase"
            style={{ scale: imageScale }}
            className="w-full h-full object-cover transform-gpu select-none"
            draggable="false"
          />

          {/* Dynamic Editorial Vignette & Warm Tint Overlay */}
          <motion.div 
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-black/90 pointer-events-none"
          />

          {/* Initial Frame Badge (Visible before expanding) */}
          <motion.div 
            style={{ opacity: badgeOpacity }}
            className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-10 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[11px] font-sans uppercase tracking-[0.2em]">LUXE Architectural Showcase</span>
          </motion.div>
        </motion.div>

        {/* The Revealed Philosophy Statement (Floats over the full-bleed space) */}
        <motion.div 
          style={{ opacity: contentOpacity, y: contentY, willChange: "transform, opacity" }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center max-w-4xl mx-auto pointer-events-auto transform-gpu"
        >
          <span className="text-accent uppercase tracking-[0.4em] text-xs mb-8 block font-sans font-semibold">
            Our Statement
          </span>
          
          <h3 className="font-serif text-3xl md:text-5xl lg:text-7xl italic text-white leading-tight mb-8 tracking-tight drop-shadow-md">
            &quot;We don&apos;t follow trends; <br />
            we create environments that <br /> 
            <span className="text-accent font-normal">outlast them.</span>&quot;
          </h3>
          
          <p className="text-white/85 text-base md:text-xl font-sans max-w-2xl leading-relaxed mx-auto drop-shadow-sm">
            Every LUXE space is a balance of heritage and innovation. We believe that true luxury 
            isn&apos;t just about how a room looks—it&apos;s about how it endures through time, 
            evolving with those who inhabit it.
          </p>
          
          <div className="mt-12 w-px h-20 bg-gradient-to-b from-accent to-transparent" />
        </motion.div>

      </div>
    </section>
  );
}
