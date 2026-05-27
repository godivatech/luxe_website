"use client";

import { motion } from "framer-motion";

export default function FounderPerspective() {
  return (
    <section className="py-24 md:py-36 bg-[#0c0c0c] px-6 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          {/* Portrait Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Outline Decorative box */}
            <div className="absolute -inset-4 border border-accent/20 rounded-2xl pointer-events-none hidden md:block" />

            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-white/5">
              {/* <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop"
                alt="Asraf Ali S. — Lead Designer"
                className="w-full h-full object-cover grayscale contrast-125"
              /> */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="font-serif text-2xl text-white font-bold mb-1">Asraf Ali. S</p>
                <p className="text-accent text-xs uppercase tracking-widest font-semibold">Lead Designer & Founder</p>
              </div>
            </div>
          </motion.div>

          {/* Statement Column */}
          <div className="lg:col-span-7 space-y-8">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-accent uppercase tracking-widest text-xs font-semibold block"
            >
              Perspective
            </motion.span>
            
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-2xl md:text-4xl italic text-white/90 leading-snug"
            >
              &quot;Design is not just an aesthetic layer; it is the physical manifestation of how 
              you live, breathe, and interact with your surrounding environment. True luxury lies 
              in creating functional layouts that feel effortless.&quot;
            </motion.blockquote>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 text-foreground/75 leading-relaxed font-sans text-base"
            >
              <p>
                Since establishing LUXE in 2018 in Madurai, our design ethos has centered on 
                restraint and precision. We resist transient design trends that fade within seasons, 
                focusing instead on tailored, spatial configurations that remain elegant, durable, 
                and satisfying over years.
              </p>
              <p>
                Every marble choice, hidden electrical pathway, and custom joint is coordinated 
                with our fabricators. This unified approach removes guesswork from the installation, 
                delivering premium turnkey spaces that perfectly align with our clients&apos; aspirations.
              </p>
            </motion.div>

            {/* Signature detail */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="pt-6 border-t border-white/5 flex gap-8 items-center"
            >
              <div>
                <p className="font-serif text-lg text-white">Asraf Ali. S</p>
                <p className="text-foreground/40 text-xs uppercase tracking-widest mt-1">Founding Director, LUXE</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
