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

        <motion.form 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-xl mx-auto mb-12"
          onSubmit={(e) => e.preventDefault()}
        >
          <input 
            type="email" 
            placeholder="Enter your email address" 
            className="w-full md:w-2/3 bg-transparent border-b border-black/30 placeholder-black/50 px-4 py-3 focus:outline-none focus:border-black transition-colors"
          />
          <button className="w-full md:w-auto mt-4 md:mt-0 flex items-center justify-center gap-2 bg-black text-white px-8 py-4 uppercase tracking-widest text-sm font-semibold hover:bg-black/80 transition-colors">
            Consult Now <ArrowRight size={18} />
          </button>
        </motion.form>

        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 0.5 }}
           className="flex items-center justify-center gap-4 mt-8 pt-8 border-t border-black/10 flex-col md:flex-row"
        >
          <span className="text-sm font-semibold uppercase tracking-widest">Or connect instantly via</span>
          <a href="https://wa.me/something" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity font-semibold w-full md:w-auto mt-4 md:mt-0 justify-center">
            <MessageCircle size={18} /> WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
