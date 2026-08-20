"use client";

import { useEffect, useLayoutEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useScrollStore } from "@/lib/scrollStore";
import { sections } from "@/lib/sections";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import SectionWrapper from "./components/layout/SectionWrapper";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const [isMounted, setIsMounted] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const setSection = useScrollStore((s) => s.setSection);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lenisRef = useRef<Lenis | null>(null);

  useLayoutEffect(() => {
    if ("scrollRestoration" in window) {
      window.history.scrollRestoration = "manual";
    }

    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });
    lenisRef.current = lenis;

    const updateHeroBoundary = () => {
      const scrollPosition = window.scrollY;
      setIsPastHero(scrollPosition >= window.innerHeight);
    };

    const forceHeroTop = () => {
      lenis.scrollTo(0, { immediate: true });
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      setSection("hero");
      updateHeroBoundary();
    };

    forceHeroTop();

    lenis.on("scroll", ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    window.addEventListener("scroll", updateHeroBoundary, { passive: true });
    window.addEventListener("resize", updateHeroBoundary);

    const rafId = requestAnimationFrame(() => {
      forceHeroTop();
      setIsMounted(true);
    });

    const timeoutId = window.setTimeout(forceHeroTop, 50);

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
      window.removeEventListener("scroll", updateHeroBoundary);
      window.removeEventListener("resize", updateHeroBoundary);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [setSection]);

  useEffect(() => {
    if (!isMounted) return;

    const ctx = gsap.context(() => {
      panelRefs.current.forEach((panel, i) => {
        if (!panel) return;
        gsap.set(panel, { yPercent: i === 0 ? 0 : 100, force3D: true });
      });

      sections.forEach((sec, i) => {
        if (i === 0) return;

        const el = document.getElementById(`section-${sec.id}`);
        const panel = panelRefs.current[i];
        if (!el || !panel) return;

        gsap.to(panel, {
          yPercent: 0,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "top top",
            scrub: 1,
          },
        });
      });

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, [isMounted]);

  const currentId = useScrollStore((s) => s.section);
  const current = sections.find((s) => s.id === currentId);
  const showChrome = isMounted && current?.showChrome === true && isPastHero;
  const currentTheme = current?.bgColor === "EFEFEF" ? "light" : "dark";

  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {sections.map((sec, i) => (
          <div
            key={sec.id}
            ref={(el) => { panelRefs.current[i] = el; }}
            className="absolute inset-0"
            style={{
              backgroundColor: `#${sec.bgColor}`,
              willChange: "transform",
              backfaceVisibility: "hidden",
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        {showChrome && (
          <motion.div
            key="navbar"
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="sticky top-0 inset-x-0 z-50"
          >
            <Navbar currPage={currentId} />
          </motion.div>
        )}
      </AnimatePresence>

      <main
        data-theme={currentTheme}
        className="relative z-10"
      >
        {sections.map(({ id, Component }) => (
          <div id={`section-${id}`} key={id}>
            <SectionWrapper id={id}>
              <Component />
            </SectionWrapper>
          </div>
        ))}
      </main>

      <AnimatePresence>
        {showChrome && (
          <motion.div
            key="footer"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-0 inset-x-0 w-full z-50"
          >
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}