"use client";
import Lenis from "lenis";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Global click listener to intercept same-page anchor link clicks for smooth scroll
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      try {
        const url = new URL(link.href, window.location.href);
        if (
          url.origin === window.location.origin &&
          url.pathname === window.location.pathname &&
          url.hash
        ) {
          const element = document.querySelector(url.hash);
          if (element) {
            e.preventDefault();
            lenis.scrollTo(element, { offset: 0, duration: 1.2 });
            window.history.pushState(null, "", url.hash);
          }
        }
      } catch (err) {
        // ignore invalid URL parsing
      }
    };

    document.addEventListener("click", handleAnchorClick, { capture: true });

    // Handle initial hash on page load
    if (window.location.hash) {
      const initialHash = window.location.hash;
      setTimeout(() => {
        const element = document.querySelector(initialHash);
        if (element) {
          lenis.scrollTo(element, { offset: 0, duration: 1.2, immediate: false });
        }
      }, 100);
    }

    return () => {
      lenis.destroy();
      document.removeEventListener("click", handleAnchorClick, { capture: true });
    };
  }, []);

  // Listen for page/route changes and scroll to the hash smoothly if present
  useEffect(() => {
    if (!lenisRef.current) return;

    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element && lenisRef.current) {
          lenisRef.current.scrollTo(element, { offset: 0, duration: 1.2, immediate: false });
        }
      }, 150);
    } else {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return <>{children}</>;
}
