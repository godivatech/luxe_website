"use client";

import { motion } from "framer-motion";

export default function FounderPerspective() {
  return (
    <section className="py-24 md:py-36 bg-background px-6 relative overflow-hidden">
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

            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-surface-muted border border-border shadow-[0_8px_30px_rgba(22,21,20,0.06)]">
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
              className="font-serif text-2xl md:text-4xl italic text-foreground leading-snug"
            >
              &quot;Great design is more than just making a room look pretty. It shapes how you live, 
              move, and feel in your home every day. To me, true luxury means creating spaces 
              that function beautifully and feel effortless.&quot;
            </motion.blockquote>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 text-foreground/75 leading-relaxed font-sans text-base"
            >
              <p>
                Since starting LUXE in 2018 in Madurai, our focus has always been simple: 
                timeless design built with care. We avoid passing trends that fade in a few 
                seasons, choosing layouts and styles that remain elegant and durable for years.
              </p>
              <p>
                We coordinate every detail—from selecting the right marble slabs to planning 
                hidden wiring and custom woodwork. This complete care removes all stress for you, 
                delivering a finished home that matches your exact dreams.
              </p>
            </motion.div>

            {/* Signature detail */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="pt-6 border-t border-border flex gap-8 items-center"
            >
              <div>
                <p className="font-serif text-lg text-foreground font-bold">Asraf Ali. S</p>
                <p className="text-foreground/40 text-xs uppercase tracking-widest mt-1">Founding Director, LUXE</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
