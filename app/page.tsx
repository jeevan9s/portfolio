"use client";

import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollStore } from "@/lib/scrollStore";
import { sections } from "@/lib/sections";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import SectionWrapper from "./components/layout/SectionWrapper";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const [isMounted, setIsMounted] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isLightTheme, setIsLightTheme] = useState(false);
  const setSection = useScrollStore((s) => s.setSection);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ("scrollRestoration" in window) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
    setSection("hero");

    const updateHeroBoundary = () => {
      const scrollPosition = window.scrollY;
      setIsPastHero(scrollPosition >= window.innerHeight);
      setIsLightTheme(scrollPosition >= window.innerHeight / 2);
    };

    window.addEventListener("scroll", updateHeroBoundary, { passive: true });
    window.addEventListener("resize", updateHeroBoundary);

    const rafId = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      updateHeroBoundary();
      setIsMounted(true);
    });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", updateHeroBoundary);
      window.removeEventListener("resize", updateHeroBoundary);
    };
  }, [setSection]);

 useEffect(() => {
  if (!isMounted) return;

  const ctx = gsap.context(() => {
    if (bgRef.current && sections.length > 0) {
      gsap.set(bgRef.current, { backgroundColor: `#${sections[0].bgColor}` });
    }

    sections.slice(1).forEach((sec) => {
      const targetBg = `#${sec.bgColor}`;
      const el = document.getElementById(`section-${sec.id}`);
      if (!el) return;

      gsap.to(bgRef.current, {
        backgroundColor: targetBg,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "top center",
          scrub: 0.5,
        },
      });
    });
  });

  return () => ctx.revert();
}, [isMounted]);

  const currentId = useScrollStore((s) => s.section);
  const current = sections.find((s) => s.id === currentId);
  const showChrome = isMounted && current?.showChrome === true && isPastHero;

  return (
    <>
      <div 
        ref={bgRef} 
        className="fixed inset-0 z-0 pointer-events-none" 
      />

      <AnimatePresence>
        {showChrome && (
          <motion.div
            key="navbar"
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 inset-x-0 z-50"
          >
            <Navbar currPage={currentId} />
          </motion.div>
        )}
      </AnimatePresence>

      <main
        data-theme={isLightTheme ? "light" : "dark"}
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