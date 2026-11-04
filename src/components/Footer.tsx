"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const words = ["LUXE", "INTERIORS"];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0.1,
    },
  },
};

const letterVariants = {
  hidden: {
    opacity: 0,
    y: "100%",
  },
  visible: {
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function Footer() {
  return (
    <footer 
      className="bg-background relative text-foreground pt-16 md:pt-20 pb-8 px-6 md:px-12 border-t border-border overflow-hidden" 
      id="connect"
    >
      <div className="container mx-auto">
        
        {/* Main Content Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <Image
              src="/LUXE LOGO.png"
              alt="LUXE Interior Decors"
              width={100}
              height={100}
              className="w-16 h-16 md:w-20 md:h-20 mb-5 object-contain"
            />
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4 tracking-tight leading-tight">
              Let&apos;s craft <br />
              <span className="text-accent italic font-light">your vision</span>
            </h2>
            <p className="text-foreground/60 max-w-sm text-sm md:text-base leading-relaxed">
              Award-winning luxury interior design based in Madurai, transforming spaces into timeless experiences.
            </p>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-7 pt-1 lg:pt-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12 font-sans">
              
              <div className="flex flex-col gap-3">
                <h4 className="uppercase tracking-[0.2em] text-xs text-foreground/40 font-semibold mb-1">
                  Explore
                </h4>
                <Link href="/#gallery" className="text-sm text-foreground/75 hover:text-accent transition-colors">
                  Spaces
                </Link>
                <Link href="/philosophy" className="text-sm text-foreground/75 hover:text-accent transition-colors">
                  Philosophy
                </Link>
                <Link href="/portfolio" className="text-sm text-foreground/75 hover:text-accent transition-colors">
                  Portfolio
                </Link>
                <Link href="/gallery" className="text-sm text-foreground/75 hover:text-accent transition-colors">
                  Gallery
                </Link>
                <Link href="/connect" className="text-sm text-foreground/75 hover:text-accent transition-colors">
                  Connect
                </Link>
              </div>

              <div className="flex flex-col gap-3">
                <h4 className="uppercase tracking-[0.2em] text-xs text-foreground/40 font-semibold mb-1">
                  Socials
                </h4>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-sm text-foreground/75 hover:text-accent transition-colors">
                  Instagram
                </a>
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="text-sm text-foreground/75 hover:text-accent transition-colors">
                  Pinterest
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-sm text-foreground/75 hover:text-accent transition-colors">
                  LinkedIn
                </a>
              </div>

              <div className="flex flex-col gap-3 col-span-2 sm:col-span-1">
                <h4 className="uppercase tracking-[0.2em] text-xs text-foreground/40 font-semibold mb-1">
                  Studio
                </h4>
                <p className="text-sm text-foreground/75 leading-relaxed">
                  11a Navalar nagar 3rd street,<br />
                  ss colony, Madurai - 625010<br />
                  Tamil Nadu, India
                </p>
                <div className="pt-1 flex flex-col gap-1">
                  <a href="mailto:luxeinteriordecors@gmail.com" className="text-sm text-foreground/75 hover:text-accent transition-colors">
                    luxeinteriordecors@gmail.com
                  </a>
                  <a href="tel:+917868016007" className="text-sm text-foreground/75 hover:text-accent transition-colors">
                    +91 78680 16007
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Architectural Brand Watermark (Staggered Letter-by-Letter Alignment) */}
        <div className="w-full select-none pointer-events-none py-3 border-t border-border flex items-center justify-center overflow-hidden">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex items-center justify-center gap-4 sm:gap-6 md:gap-10 font-serif text-[9.5vw] font-bold leading-none text-foreground/[0.09] uppercase tracking-tighter whitespace-nowrap"
          >
            {words.map((word, wordIdx) => (
              <span key={wordIdx} className="inline-flex overflow-hidden">
                {word.split("").map((letter, letterIdx) => (
                  <motion.span
                    key={letterIdx}
                    variants={letterVariants}
                    className="inline-block transform-gpu"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Sub-Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-border text-xs text-foreground/50 gap-3">
          <p>&copy; {new Date().getFullYear()} LUXE Interior Decors. All rights reserved.</p>
          <div className="flex gap-6">
            <p>
              Designed and Developed by{' '}
              <a 
                href="https://www.godivatech.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-bold text-foreground hover:text-accent transition-colors"
              >
                Godivatech
              </a>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
