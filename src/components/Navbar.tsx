"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "bg-background/80 backdrop-blur-md py-4 border-b border-white/5" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl font-bold tracking-widest uppercase text-foreground z-50 relative">
          LUXE<span className="text-accent">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          <Link href="/#spaces" className="text-sm uppercase tracking-widest text-foreground/80 hover:text-accent transition-colors">
            Spaces
          </Link>
          <Link href="/#philosophy" className="text-sm uppercase tracking-widest text-foreground/80 hover:text-accent transition-colors">
            Philosophy
          </Link>
          <Link href="/portfolio" className="text-sm uppercase tracking-widest text-foreground/80 hover:text-accent transition-colors">
            Portfolio
          </Link>
          <Link href="/connect" className="text-sm uppercase tracking-widest text-foreground/80 hover:text-accent transition-colors">
            Connect
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button className="md:hidden text-foreground z-50 relative" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 bg-background/95 z-40 flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Link href="/#spaces" onClick={() => setMobileMenuOpen(false)} className="font-serif text-4xl text-foreground hover:text-accent transition-colors">
                  Spaces
                </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Link href="/#philosophy" onClick={() => setMobileMenuOpen(false)} className="font-serif text-4xl text-foreground hover:text-accent transition-colors">
                  Philosophy
                </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Link href="/portfolio" onClick={() => setMobileMenuOpen(false)} className="font-serif text-4xl text-foreground hover:text-accent transition-colors">
                  Portfolio
                </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Link href="/connect" onClick={() => setMobileMenuOpen(false)} className="font-serif text-4xl text-foreground hover:text-accent transition-colors">
                  Connect
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
