"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { projects } from "@/data/projects";

const masonryLayouts = [
  "col-span-1 md:col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 md:col-span-3 row-span-2 md:aspect-[21/9]",
];

const featuredProjects = projects.slice(0, 4).map((p, i) => ({
  ...p,
  className: masonryLayouts[i]
}));

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
            Our Works
          </motion.h2>
          <Link
            href="/portfolio"
            className="text-accent uppercase tracking-widest text-sm border-b border-accent pb-1 inline-block hover:opacity-80 transition-opacity"
          >
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              View All Projects
            </motion.span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 md:auto-rows-[400px]">
          {featuredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className={`relative group overflow-hidden ${project.className} aspect-square md:aspect-auto`}
            >
              <Link href={`/portfolio/${project.id}`} className="block w-full h-full">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <span className="text-accent text-sm tracking-widest uppercase mb-2 block transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{project.category}</span>
                  <h3 className="font-serif text-3xl text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{project.title}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
