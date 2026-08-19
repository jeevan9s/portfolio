"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useScrollStore } from "@/lib/scrollStore";
import { sections } from "@/lib/sections";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import BackgroundLayer from "@/app/components/layout/BackgroundLayer";
import SectionWrapper from "./components/layout/SectionWrapper";

export default function Page() {
  const [isMounted, setIsMounted] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const setSection = useScrollStore((s) => s.setSection);

  useEffect(() => {
    if ("scrollRestoration" in window) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
    setSection("hero");

    const updateHeroBoundary = () => {
      setIsPastHero(window.scrollY >= window.innerHeight);
    };

    window.addEventListener("scroll", updateHeroBoundary, { passive: true });
    window.addEventListener("resize", updateHeroBoundary);

    const rafId = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      updateHeroBoundary();
      setIsMounted(true);
    });

    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, 50);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
      window.removeEventListener("scroll", updateHeroBoundary);
      window.removeEventListener("resize", updateHeroBoundary);
    };
  }, [setSection]);

  const currentId = useScrollStore((s) => s.section);
  const current = sections.find((s) => s.id === currentId);
  const showChrome = isMounted && current?.showChrome === true && isPastHero;

  return (
    <>
      <BackgroundLayer />

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

      <main className="relative z-10">
        {sections.map(({ id, Component }) => (
          <SectionWrapper key={id} id={id}>
            <Component />
          </SectionWrapper>
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