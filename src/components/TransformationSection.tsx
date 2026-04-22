"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { MoveHorizontal } from "lucide-react";

export default function TransformationSection() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  return (
    <section className="py-24 md:py-48 bg-[#0a0a0a] px-6">
      <div className="container mx-auto">
        <div className="mb-20 text-center max-w-2xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-6xl font-bold mb-6 text-foreground"
          >
            The Transformation
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-foreground/60"
          >
            Experience the journey from a bare shell to a masterfully curated living space.
            Drag the slider to reveal the magic.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          ref={containerRef}
          className="relative w-full aspect-[4/3] md:aspect-[21/9] overflow-hidden select-none cursor-ew-resize rounded-lg"
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onMouseDown={(e) => {
            setIsDragging(true);
            handleMove(e.clientX);
          }}
          onTouchStart={(e) => {
            setIsDragging(true);
            handleMove(e.touches[0].clientX);
          }}
        >
          {/* After image (Background) */}
          <div className="absolute inset-0 w-full h-full">
            <img 
              src="https://images.unsplash.com/photo-1600210491369-e753d80a41f3?q=80&w=2000&auto=format&fit=crop" 
              alt="After Design" 
              className="w-full h-full object-cover select-none"
              draggable="false"
            />
            <div className="absolute top-6 right-6 bg-black/50 backdrop-blur-sm px-4 py-2 rounded text-white text-sm font-sans tracking-widest uppercase">After</div>
          </div>

          {/* Before image (Foreground clippath) */}
          <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}>
            <img 
              src="https://images.unsplash.com/photo-1598928308498-80f074d2aa4c?q=80&w=2000&auto=format&fit=crop" 
              alt="Before Design" 
              className="w-full h-full object-cover blur-[2px] grayscale-[50%] select-none"
              draggable="false"
            />
            <div className="absolute top-6 left-6 bg-black/50 backdrop-blur-sm px-4 py-2 rounded text-white text-sm font-sans tracking-widest uppercase">Before</div>
          </div>

          {/* Slider Line & Handle */}
          <div className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_15px_rgba(0,0,0,0.5)]" style={{ left: `calc(${sliderPosition}% - 2px)` }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg text-black">
              <MoveHorizontal size={24} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
