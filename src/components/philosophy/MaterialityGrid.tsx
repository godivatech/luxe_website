"use client";

import { motion } from "framer-motion";

const materials = [
  {
    title: "Bookmatched Stone & Marbles",
    desc: "Sourced globally to capture natural organic veins that serve as custom interior artwork.",
    img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop",
    gridClass: "col-span-1 md:col-span-2 row-span-1",
  },
  {
    title: "Milled Teak & Walnut",
    desc: "Custom fluted profiles and cabinetry hand-finished for visual warmth and longevity.",
    img: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1200&auto=format&fit=crop",
    gridClass: "col-span-1 row-span-2",
  },
  {
    title: "Brushed Metals & Glass",
    desc: "Anodized aluminum, brass accents, and custom fluted glass panels to define and reflect light.",
    img: "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=1200&auto=format&fit=crop",
    gridClass: "col-span-1 row-span-1",
  },
  {
    title: "Rich Organic Textiles",
    desc: "Custom linens, leathers, and velvet upholstery to deliver tactile luxury comfort.",
    img: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1200&auto=format&fit=crop",
    gridClass: "col-span-1 md:col-span-2 row-span-1",
  },
];

export default function MaterialityGrid() {
  return (
    <section className="py-24 md:py-36 bg-surface-muted px-6 border-b border-border">
      <div className="container mx-auto">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <span className="text-accent uppercase tracking-widest text-xs font-semibold block mb-4">
            Materiality
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6 text-foreground">
            The Craft of Textures
          </h2>
          <p className="text-foreground/60 leading-relaxed font-sans text-sm md:text-base">
            We believe that a space must feel as exquisite as it looks. We curating high-grade 
            raw materials that interact harmoniously with shadow, natural light, and sound.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px] md:auto-rows-[300px]">
          {materials.map((m, index) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`relative rounded-2xl overflow-hidden group ${m.gridClass}`}
            >
              <img
                src={m.img}
                alt={m.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6 md:p-8">
                <h3 className="font-serif text-xl md:text-2xl text-white mb-2 group-hover:text-accent transition-colors duration-300">
                  {m.title}
                </h3>
                <p className="text-white/60 text-xs md:text-sm font-sans max-w-md leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block">
                  {m.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
