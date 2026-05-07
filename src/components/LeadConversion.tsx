"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function LeadConversion() {
  return (
    <section className="py-24 md:py-48 px-6 bg-accent text-accent-foreground relative overflow-hidden text-black">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative z-10 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-4xl md:text-7xl font-bold mb-8 leading-tight"
        >
          Ready to elevate <br className="hidden md:block"/> your space?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-sans text-lg md:text-xl mb-16 max-w-2xl mx-auto opacity-80"
        >
          Connect with our design experts for a complimentary consultation. Let’s bring your vision to life.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col md:flex-row gap-6 justify-center items-center"
        >
          <a 
            href="/connect" 
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-black text-white px-10 py-5 uppercase tracking-widest text-sm font-semibold hover:bg-black/80 transition-colors rounded-full"
          >
            Get in touch <ArrowRight size={18} />
          </a>
          <a 
            href="https://wa.me/91XXXXXXXXXX" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full md:w-auto flex items-center gap-2 border border-black/20 px-10 py-5 rounded-full hover:bg-black/5 transition-colors font-semibold justify-center"
          >
            <MessageCircle size={18} /> WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
