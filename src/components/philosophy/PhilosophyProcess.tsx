"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    phase: "Spatial Audit & Discovery",
    title: "Understanding physical geometry & client aspirations",
    desc: "We begin with a thorough survey of structural elements. We analyze views, sound profiles, traffic flows, and natural lighting patterns, alongside a detailed conversation about your lifestyle or business brand requirements.",
  },
  {
    num: "02",
    phase: "Spatial Modeling & Curation",
    title: "Moodboards, textures, and 3D simulation",
    desc: "We build high-fidelity layout proposals and material boards. We compile tangible, physical samples (wood, fabrics, stones) alongside 3D renderings so you can touch, see, and experience the textures before execution starts.",
  },
  {
    num: "03",
    phase: "Bespoke Manufacturing",
    title: "Custom joinery production & detail coordination",
    desc: "Bespoke components are fabricated at our local workshop to ensure complete oversight and precision. From hidden joints to customized fittings, our master craftsman build components specifically for your dimensions.",
  },
  {
    num: "04",
    phase: "Turnkey Installation",
    title: "On-site choreography & quality hand-over",
    desc: "Our design consultants supervise on-site assembly, ensuring perfect alignment, seamless electrical pathways, and flawless integration of finishes. We handover the keys only when every detail matches our luxury standard.",
  },
];

export default function PhilosophyProcess() {
  return (
    <section className="py-24 md:py-36 bg-background px-6 border-b border-white/5">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Header Column */}
          <div className="lg:col-span-5 sticky top-28 self-start">
            <span className="text-accent uppercase tracking-widest text-xs font-semibold block mb-4">
              Our Journey
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold leading-tight mb-8">
              Meticulous process, from empty shell to curated residence.
            </h2>
            <p className="text-foreground/60 leading-relaxed font-sans max-w-md">
              We coordinate every single stage of the execution lifecycle. By combining 
              in-house manufacturing with turnkey site supervision, we guarantee 
              that the final physical space matches the original design render.
            </p>
            <div className="hidden lg:block mt-16 w-16 h-[1px] bg-accent" />
          </div>

          {/* Process Timeline Column */}
          <div className="lg:col-span-7 space-y-16 relative">
            {/* Visual connecting line */}
            <div className="absolute left-6 top-4 bottom-4 w-[1px] bg-white/10 hidden md:block" />

            {steps.map((s, index) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative md:pl-20 flex flex-col md:flex-row gap-6 md:gap-10"
              >
                {/* Step Circle for larger screens */}
                <div className="absolute left-0 top-0 w-12 h-12 rounded-full border border-accent bg-background text-accent flex items-center justify-center font-serif text-lg font-bold z-10 hidden md:flex">
                  {s.num}
                </div>

                <div>
                  <div className="flex items-center gap-4 mb-3 md:mb-1">
                    <span className="text-accent font-serif text-lg font-bold md:hidden">
                      {s.num} —
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em] font-semibold text-accent/80 block">
                      Phase {s.num} / {s.phase}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-semibold mb-4 text-white">
                    {s.title}
                  </h3>
                  <p className="text-foreground/60 leading-relaxed text-sm md:text-base max-w-xl font-sans">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
