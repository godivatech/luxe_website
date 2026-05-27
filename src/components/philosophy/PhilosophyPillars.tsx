"use client";

import { motion } from "framer-motion";
import { Compass, Eye, ShieldAlert, Award, Feather, Layers } from "lucide-react";

const pillars = [
  {
    icon: Compass,
    title: "Smart Layouts",
    subtitle: "Designed for comfort & light",
    desc: "We plan layouts around how you actually live and move. By focusing on natural light, air circulation, and ceiling heights, we ensure your rooms feel warm, spacious, and comfortable before adding a single piece of furniture.",
  },
  {
    icon: Layers,
    title: "Real Materials",
    subtitle: "Selected for lasting beauty",
    desc: "We use only genuine, premium materials—natural marble stone, solid teak wood, glass, and polished metals. These materials react beautifully to light and grow even more character over the years.",
  },
  {
    icon: Feather,
    title: "Personal Touch",
    subtitle: "Custom-built details",
    desc: "True luxury is personal. We design custom wardrobes, tailored furniture, and unique accents specifically for your home. Everything is built to fit your lifestyle, ensuring a look that is completely yours.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function PhilosophyPillars() {
  return (
    <section className="py-24 md:py-36 bg-[#0c0c0c] px-6 relative border-b border-white/5">
      <div className="container mx-auto">
        <div className="max-w-3xl mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-accent uppercase tracking-widest text-xs font-semibold block mb-4"
          >
            Our Principles
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-3xl md:text-5xl font-bold leading-tight"
          >
            Our core principles guide every space we design and build
          </motion.h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {pillars.map((p, index) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                variants={itemVariants}
                className="group bg-background border border-white/5 hover:border-accent/30 p-8 md:p-10 rounded-2xl transition-colors duration-500 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-accent mb-8 group-hover:bg-accent group-hover:text-background transition-colors duration-500">
                    <Icon size={24} />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-foreground/40 block mb-2 font-medium">
                    {p.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl font-semibold mb-4 text-white group-hover:text-accent transition-colors duration-300">
                    {p.title}
                  </h3>
                  <p className="text-foreground/60 leading-relaxed font-sans text-sm md:text-base">
                    {p.desc}
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-white/5 text-xs text-accent uppercase tracking-widest font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Principle 0{index + 1}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
