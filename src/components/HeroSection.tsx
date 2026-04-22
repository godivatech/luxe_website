"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroSection() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={container} className="relative h-screen w-full overflow-hidden bg-background">
      <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
        {/* Placeholder for video/image. A dark elegant gradient for now */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black z-10" />
        <img 
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2800&auto=format&fit=crop" 
          alt="Luxury Interior" 
          className="w-full h-full object-cover scale-105"
        />
      </motion.div>

      <div className="relative z-20 container mx-auto px-6 md:px-12 h-full flex flex-col justify-center items-center text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <span className="text-accent uppercase tracking-[0.3em] text-xs md:text-sm mb-6 block font-sans">
            Welcome to LUXE
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl font-bold leading-tight mb-8">
            Elevating Spaces,<br />
            <span className="italic font-light text-white/90">Defining Luxury.</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 2 }}
          className="absolute bottom-12 flex flex-col items-center gap-4"
        >
          <span className="text-xs uppercase tracking-widest text-white/50">Scroll to Explore</span>
          <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
            <motion.div 
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 w-full h-full bg-accent"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
