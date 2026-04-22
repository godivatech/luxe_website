"use client";

import { motion } from "framer-motion";

const testimonials = [
  { quote: "LUXE interiors completely reimagined our home. Every corner tells a story.", author: "Arjun M.", role: "Homeowner, Madurai" },
  { quote: "Their bespoke furniture pieces are true works of art. Highly recommended.", author: "Priya S.", role: "CEO, TechFlow" },
  { quote: "A seamless journey from concept to reality. They define luxury.", author: "Karthik R.", role: "Real Estate Developer" },
  { quote: "Our office space now breathes inspiration and productivity thanks to LUXE.", author: "Neha K.", role: "Founder, Zenith Co." },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 md:py-32 bg-[#121212] overflow-hidden flex flex-col justify-center">
      <div className="container mx-auto px-6 text-center mb-16">
        <h2 className="text-xl md:text-2xl text-accent font-serif italic mb-2">Words from our clients</h2>
        <h3 className="font-serif text-3xl md:text-5xl font-bold">Tested & Trusted</h3>
      </div>
      
      <div className="relative w-full flex overflow-hidden">
        {/* Gradient fades for edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#121212] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#121212] to-transparent z-10" />
        
        {/* Marquee Track */}
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          }}
          className="flex whitespace-nowrap gap-8 pr-8 items-center"
        >
          {/* Duplicate the array a few times to ensure infinite scroll coverage */}
          {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
            <div key={i} className="bg-background/50 border border-white/5 p-8 rounded min-w-[300px] md:min-w-[450px] whitespace-normal flex-shrink-0">
              <p className="font-serif text-xl md:text-2xl leading-relaxed mb-8">&quot;{t.quote}&quot;</p>
              <div>
                <p className="font-bold text-sm tracking-widest uppercase">{t.author}</p>
                <p className="text-foreground/50 text-xs tracking-widest uppercase mt-1">{t.role}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
