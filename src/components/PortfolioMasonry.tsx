"use client";

import { motion } from "framer-motion";

const projects = [
  { id: 1, title: "The Heritage Villa", location: "Madurai", img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop", className: "col-span-1 md:col-span-2 row-span-2" },
  { id: 2, title: "Skyline Penthouse", location: "Chennai", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop", className: "col-span-1 row-span-1" },
  { id: 3, title: "Zen Workspace", location: "Madurai", img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1200&auto=format&fit=crop", className: "col-span-1 row-span-1" },
  { id: 4, title: "Lakeside Retreat", location: "Kodaikanal", img: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?q=80&w=1200&auto=format&fit=crop", className: "col-span-1 md:col-span-3 row-span-2 md:aspect-[21/9]" },
];

export default function PortfolioMasonry() {
  return (
    <section id="gallery" className="py-24 md:py-48 px-6 bg-background">
      <div className="container mx-auto">
        <div className="mb-20 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-6xl font-bold mb-6"
          >
            Selected Works
          </motion.h2>
          <motion.a 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            href="#" 
            className="text-accent uppercase tracking-widest text-sm border-b border-accent pb-1 inline-block hover:opacity-80 transition-opacity"
          >
            View All Projects
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 md:auto-rows-[400px]">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className={`relative group overflow-hidden ${project.className} aspect-square md:aspect-auto`}
            >
              <img 
                src={project.img} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <span className="text-accent text-sm tracking-widest uppercase mb-2 block transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{project.location}</span>
                <h3 className="font-serif text-3xl text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{project.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
