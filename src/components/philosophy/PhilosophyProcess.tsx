"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    phase: "Consultation & Survey",
    title: "Understanding your space and vision",
    desc: "We start by visiting your space to study its layout, natural light, and views. We then sit down for an open conversation about your routine, style preference, and how you want to use the space.",
  },
  {
    num: "02",
    phase: "Design & Visualization",
    title: "Choosing textures, colors, and 3D views",
    desc: "We create detailed 3D layouts and prepare material boards. We share real physical samples of wood, stone, and fabrics so you can see and touch the materials before construction begins.",
  },
  {
    num: "03",
    phase: "Custom Workshop Crafting",
    title: "Building your custom furniture and cabinets",
    desc: "Our master craftsmen build your custom wardrobes, kitchens, and furniture at our local workshop. This keeps quality control high and ensures every piece is built to your home's exact size.",
  },
  {
    num: "04",
    phase: "Complete Installation",
    title: "On-site management and final handover",
    desc: "Our design team manages the entire on-site setup, coordinating painters, electricians, and carpenters. We check every detail to ensure everything is perfect before we hand you the keys to your new home.",
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
              A careful, step-by-step process from a bare room to a finished home.
            </h2>
            <p className="text-foreground/60 leading-relaxed font-sans max-w-md">
              We manage every detail of the project for you. By combining our own custom 
              furniture workshop with active on-site supervision, we guarantee that the 
              final space looks exactly like the approved 3D design.
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
