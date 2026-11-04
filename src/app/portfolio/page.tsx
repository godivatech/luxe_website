"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { projects } from "@/data/projects";

type Category = "All" | "Residential" | "Commercial";

function PortfolioContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read category directly from URL parameter ?category=...
  const categoryParam = searchParams.get("category");
  const validParam: Category | null =
    categoryParam === "Residential" || categoryParam === "Commercial"
      ? categoryParam
      : categoryParam === "All"
      ? "All"
      : null;

  // Initialize from URL param, fallback to sessionStorage or 'All'
  const [filter, setFilter] = useState<Category>(validParam || "All");

  // Keep state synced with URL search params (e.g. browser back/forward buttons)
  useEffect(() => {
    if (validParam) {
      setFilter(validParam);
    } else {
      // Check if user previously had a tab selected in this session
      const saved = sessionStorage.getItem("luxe_portfolio_category") as Category | null;
      if (saved && (saved === "Residential" || saved === "Commercial")) {
        setFilter(saved);
      } else {
        setFilter("All");
      }
    }
  }, [validParam]);

  const handleFilterChange = (category: Category) => {
    setFilter(category);
    if (category === "All") {
      sessionStorage.removeItem("luxe_portfolio_category");
      router.replace("/portfolio", { scroll: false });
    } else {
      sessionStorage.setItem("luxe_portfolio_category", category);
      router.replace(`/portfolio?category=${category}`, { scroll: false });
    }
  };

  const filteredProjects = projects.filter(
    (project) => filter === "All" || project.category === filter
  );

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-7xl font-bold mb-6"
          >
            Our Portfolio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-foreground/60 max-w-2xl mx-auto"
          >
            Explore our curated collection of luxury residential and commercial spaces, designed to elevate your lifestyle and business.
          </motion.p>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-8 mb-16"
        >
          {(["All", "Residential", "Commercial"] as Category[]).map((category) => (
            <button
              key={category}
              onClick={() => handleFilterChange(category)}
              className={`text-sm uppercase tracking-widest pb-2 border-b-2 transition-all cursor-pointer ${
                filter === category
                  ? "border-accent text-accent font-medium"
                  : "border-transparent text-foreground/50 hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group cursor-pointer"
              >
                <Link
                  href={`/portfolio/${project.id}?category=${filter}`}
                  className="block"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xl mb-4 bg-surface-muted shadow-[0_8px_30px_rgba(22,21,20,0.06)]">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif text-2xl text-foreground group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-foreground/50 text-sm tracking-widest uppercase mt-1">
                        {project.category}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-32 pb-24 min-h-screen bg-background">
          <div className="container mx-auto px-6 md:px-12 text-center">
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6">Our Portfolio</h1>
            <div className="flex justify-center gap-8 mb-16">
              <span className="text-sm uppercase tracking-widest pb-2 border-b-2 border-accent text-accent">All</span>
              <span className="text-sm uppercase tracking-widest pb-2 border-b-2 border-transparent text-foreground/50">Residential</span>
              <span className="text-sm uppercase tracking-widest pb-2 border-b-2 border-transparent text-foreground/50">Commercial</span>
            </div>
          </div>
        </div>
      }
    >
      <PortfolioContent />
    </Suspense>
  );
}
