"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Pages with a dark hero background photography at the top
  const isDarkHeroPage = pathname === "/" || pathname === "/philosophy";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Dynamic link styling: luminous white over dark hero photography, dark charcoal when scrolled onto the frosted bar
  const navLinkClasses = clsx(
    "text-sm uppercase tracking-widest transition-colors duration-300 font-medium",
    !isScrolled && isDarkHeroPage
      ? "text-white/95 hover:text-accent drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
      : "text-foreground/80 hover:text-accent"
  );

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled 
            ? "bg-background/90 backdrop-blur-md py-4 border-b border-border shadow-[0_2px_20px_rgba(22,21,20,0.04)]" 
            : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="z-50 relative">
            <Image
              src="/LUXE LOGO.png"
              alt="LUXE Interior Decors"
              width={120}
              height={120}
              className="w-20 h-20 md:w-28 md:h-28 object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            <Link href="/#gallery" className={navLinkClasses}>
              Spaces
            </Link>
            <Link href="/philosophy" className={navLinkClasses}>
              Philosophy
            </Link>
            <Link href="/portfolio" className={navLinkClasses}>
              Portfolio
            </Link>
            <Link href="/connect" className={navLinkClasses}>
              Connect
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button 
            className={clsx(
              "md:hidden z-50 relative transition-colors duration-300",
              mobileMenuOpen 
                ? "text-foreground" 
                : (!isScrolled && isDarkHeroPage ? "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]" : "text-foreground")
            )} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu (Moved outside the transformed header to prevent positioning bounds clipping) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background z-40 flex flex-col items-center justify-center px-6"
          >
            <nav className="flex flex-col items-center gap-8 mt-12">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Link href="/#gallery" onClick={() => setMobileMenuOpen(false)} className="font-serif text-4xl text-foreground hover:text-accent transition-colors">
                  Spaces
                </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Link href="/philosophy" onClick={() => setMobileMenuOpen(false)} className="font-serif text-4xl text-foreground hover:text-accent transition-colors">
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
    </>
  );
}
