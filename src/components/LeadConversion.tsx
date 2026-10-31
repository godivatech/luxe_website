"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

export default function LeadConversion() {
  return (
    <section className="py-24 md:py-48 px-6 bg-accent text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full opacity-15 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative z-10 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-4xl md:text-7xl font-bold mb-8 leading-tight text-white"
        >
          Ready to elevate <br className="hidden md:block"/> your space?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-sans text-lg md:text-xl mb-16 max-w-2xl mx-auto text-white/90"
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
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-foreground text-background px-10 py-5 uppercase tracking-widest text-sm font-bold hover:opacity-90 transition-opacity rounded-full shadow-lg"
          >
            Get in touch <ArrowRight size={18} />
          </a>
          <a 
            href="https://wa.me/917868016007?text=Hello%20LUXE%20Interiors%2C%20I%20would%20like%20to%20inquire%20about%20a%20design%20consultation%20for%20my%20space." 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full md:w-auto flex items-center gap-2 border border-white/40 text-white px-10 py-5 rounded-full hover:bg-white/10 transition-colors font-semibold justify-center"
          >
            <FaWhatsapp size={20} className="text-[#25D366]" /> WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
