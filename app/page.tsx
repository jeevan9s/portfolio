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
  const [navbarVisible, setNavbarVisible] = useState(false);
  const [navbarTheme, setNavbarTheme] = useState<"light" | "dark">("dark");
  const [footerVisible, setFooterVisible] = useState(false);
  const [footerTheme, setFooterTheme] = useState<"light" | "dark">("dark");
  const setSection = useScrollStore((s) => s.setSection);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lenisRef = useRef<Lenis | null>(null);
  const navbarWrapperRef = useRef<HTMLDivElement | null>(null);
  const footerWrapperRef = useRef<HTMLDivElement | null>(null);
  const chromeHeightsRef = useRef({ navbar: 64, footer: 64 });

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

    // Finds whichever section currently occupies a given viewport y-coordinate.
    const findSectionAtViewportY = (y: number) => {
      for (const sec of sections) {
        const el = document.getElementById(`section-${sec.id}`);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= y && rect.bottom > y) return sec;
      }
      return null;
    };

    // Navbar and footer track separate viewport edges, so each can show/hide
    // and theme independently even when two different sections are on screen.
    // Sampling at the center of each chrome band (rather than the outer edge)
    // keeps the reported theme matched to whatever content actually sits behind it.
    const updateChromeZones = () => {
      const { navbar: navH, footer: footH } = chromeHeightsRef.current;
      const navSection = findSectionAtViewportY(Math.max(1, navH / 2));
      const footSection = findSectionAtViewportY(
        Math.min(window.innerHeight - 1, window.innerHeight - footH / 2),
      );

      setNavbarVisible(navSection?.showChrome === true);
      setNavbarTheme(navSection?.bgColor === "EFEFEF" ? "light" : "dark");

      setFooterVisible(footSection?.showChrome === true);
      setFooterTheme(footSection?.bgColor === "EFEFEF" ? "light" : "dark");
    };

    const forceHeroTop = () => {
      lenis.scrollTo(0, { immediate: true });
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      setSection("hero");
      updateChromeZones();
    };

    forceHeroTop();

    lenis.on("scroll", ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    window.addEventListener("scroll", updateChromeZones, { passive: true });
    window.addEventListener("resize", updateChromeZones);

    const rafId = requestAnimationFrame(() => {
      forceHeroTop();
      setIsMounted(true);
    });

    const timeoutId = window.setTimeout(forceHeroTop, 50);

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
      window.removeEventListener("scroll", updateChromeZones);
      window.removeEventListener("resize", updateChromeZones);
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

  // Measures the real rendered height of the floating navbar/footer and exposes
  // it as CSS vars so section padding always matches, preventing overlap with content.
  useEffect(() => {
    const root = document.documentElement;

    const applyHeight = (key: "navbar" | "footer", value: number) => {
      if (value <= 0) return;
      chromeHeightsRef.current[key] = value;
      root.style.setProperty(`--${key}-h`, `${value}px`);
    };

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height;
        if (entry.target === navbarWrapperRef.current) applyHeight("navbar", height);
        if (entry.target === footerWrapperRef.current) applyHeight("footer", height);
      }
    });

    if (navbarWrapperRef.current) observer.observe(navbarWrapperRef.current);
    if (footerWrapperRef.current) observer.observe(footerWrapperRef.current);

    return () => observer.disconnect();
  }, [navbarVisible, footerVisible]);

  const currentId = useScrollStore((s) => s.section);
  const current = sections.find((s) => s.id === currentId);
  const currentTheme = current?.bgColor === "EFEFEF" ? "light" : "dark";
  const showNavbar = isMounted && navbarVisible;
  const showFooter = isMounted && footerVisible;

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
        {showNavbar && (
          <motion.div
            ref={navbarWrapperRef}
            key="navbar"
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 inset-x-0 z-50"
          >
            <Navbar currPage={currentId} theme={navbarTheme} />
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
        {showFooter && (
          <motion.div
            ref={footerWrapperRef}
            key="footer"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-0 inset-x-0 w-full z-50"
          >
            <Footer theme={footerTheme} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}