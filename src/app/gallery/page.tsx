"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Film, ChevronLeft, ChevronRight } from "lucide-react";
import { videos, VideoProject } from "@/data/videos";

type Category = "All" | "Residential" | "Commercial";

const ITEMS_PER_PAGE = 9;

function formatDuration(seconds?: number) {
  if (!seconds) return "";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function GalleryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryParam = searchParams.get("category");
  const validParam: Category | null =
    categoryParam === "Residential" || categoryParam === "Commercial"
      ? categoryParam
      : categoryParam === "All"
      ? "All"
      : null;

  const [filter, setFilter] = useState<Category>(validParam || "All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState<VideoProject | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const gridTopRef = useRef<HTMLDivElement>(null);

  // Sync state with URL params & sessionStorage
  useEffect(() => {
    if (validParam) {
      setFilter(validParam);
      setCurrentPage(1);
    } else {
      const saved = sessionStorage.getItem("luxe_gallery_category") as Category | null;
      if (saved && (saved === "Residential" || saved === "Commercial")) {
        setFilter(saved);
      } else {
        setFilter("All");
      }
      setCurrentPage(1);
    }
  }, [validParam]);

  // Handle escape key to close cinema modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedVideo(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock scroll when cinema modal is open
  useEffect(() => {
    if (selectedVideo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedVideo]);

  const handleFilterChange = (category: Category) => {
    setFilter(category);
    setCurrentPage(1);
    if (category === "All") {
      sessionStorage.removeItem("luxe_gallery_category");
      router.replace("/gallery", { scroll: false });
    } else {
      sessionStorage.setItem("luxe_gallery_category", category);
      router.replace(`/gallery?category=${category}`, { scroll: false });
    }
  };

  const filteredVideos = videos.filter(
    (v) => filter === "All" || v.category === filter
  );

  const totalPages = Math.ceil(filteredVideos.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredVideos.length);
  const displayedVideos = filteredVideos.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    const scrollToTop = () => {
      const lenis = typeof window !== "undefined" ? (window as any).lenis : null;
      const target = gridTopRef.current;

      if (lenis && target) {
        lenis.scrollTo(target, { offset: -130, duration: 0.9 });
      } else if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - 130;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    scrollToTop();
    setTimeout(scrollToTop, 50);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs uppercase tracking-widest font-semibold mb-4"
          >
            <Film size={14} />
            <span>Cinematic Walkthroughs</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="font-serif text-5xl md:text-7xl font-bold mb-6 text-foreground"
          >
            Video Gallery
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-foreground/60 max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
          >
            Immerse yourself in our architectural statements and bespoke interior spaces through full-motion 3D walkthroughs.
          </motion.p>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
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

        {/* Scroll Anchor */}
        <div id="gallery-grid" ref={gridTopRef} className="scroll-mt-32 -mt-8 pt-8" />

        {/* Video Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {displayedVideos.map((video) => (
              <motion.div
                key={video.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group cursor-pointer"
                onClick={() => setSelectedVideo(video)}
              >
                {/* 16:9 Thumbnail Card */}
                <div className="relative aspect-video overflow-hidden rounded-xl mb-4 bg-surface-muted shadow-[0_8px_30px_rgba(22,21,20,0.06)] border border-border group-hover:border-accent/40 transition-colors">
                  <img
                    src={video.posterUrl}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Center Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-black/50 backdrop-blur-sm border border-white/30 text-white flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:border-accent group-hover:text-background shadow-lg">
                      <Play size={24} className="ml-1 fill-current" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  {video.duration && (
                    <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/75 backdrop-blur-sm text-white/90 text-xs font-mono tracking-wider">
                      {formatDuration(video.duration)}
                    </div>
                  )}

                  {/* Category Pill on Card */}
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-accent text-[11px] uppercase tracking-wider font-semibold">
                    {video.category}
                  </div>
                </div>

                {/* Card Title */}
                <div>
                  <h3 className="font-serif text-2xl text-foreground group-hover:text-accent transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-foreground/50 text-xs tracking-widest uppercase mt-1">
                    Full 3D Cinematic Tour
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Numbered Pagination (Option 1) */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 flex justify-center items-center gap-2 border-t border-border pt-8"
          >
            {/* Prev Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-foreground/70 hover:border-accent hover:text-accent disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
              aria-label="Previous page"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Number Buttons */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`w-10 h-10 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  currentPage === pageNum
                    ? "bg-accent text-accent-foreground font-semibold shadow-md"
                    : "border border-border text-foreground/70 hover:border-accent hover:text-accent"
                }`}
              >
                {pageNum}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-foreground/70 hover:border-accent hover:text-accent disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
              aria-label="Next page"
            >
              <ChevronRight size={18} />
            </button>
          </motion.div>
        )}

      </div>

      {/* Luxury Fullscreen Cinema Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-lg"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl bg-[#0F0F0F] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
                <div>
                  <span className="text-accent text-xs uppercase tracking-widest font-semibold block mb-0.5">
                    {selectedVideo.category} Walkthrough
                  </span>
                  <h2 className="text-white font-serif text-xl md:text-2xl font-bold">
                    {selectedVideo.title}
                  </h2>
                </div>

                <button
                  onClick={() => setSelectedVideo(null)}
                  className="w-10 h-10 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/50 hover:bg-white/10 flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Close video player"
                >
                  <X size={20} />
                </button>
              </div>

              {/* HTML5 Video Player */}
              <div className="relative aspect-video w-full bg-black">
                <video
                  ref={videoRef}
                  src={selectedVideo.videoUrl}
                  poster={selectedVideo.posterUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function GalleryPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-32 pb-24 min-h-screen bg-background">
          <div className="container mx-auto px-6 md:px-12 text-center animate-pulse">
            <div className="w-48 h-8 rounded-full bg-surface-subtle mx-auto mb-4" />
            <div className="w-80 h-14 rounded-lg bg-surface-subtle mx-auto mb-6" />
            <div className="w-full max-w-xl h-4 rounded bg-surface-subtle mx-auto mb-16" />
          </div>
        </div>
      }
    >
      <GalleryContent />
    </Suspense>
  );
}
