"use client";

import { useEffect, useLayoutEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useScrollStore } from "@/lib/scrollStore";
import { lenisController } from "@/lib/lenisController";
import { sections } from "@/lib/sections";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import SectionWrapper from "./components/layout/SectionWrapper";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const [isMounted, setIsMounted] = useState(false);

  const setSection = useScrollStore((s) => s.setSection);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lenisRef = useRef<Lenis | null>(null);
  const navbarWrapperRef = useRef<HTMLDivElement | null>(null);
  const footerWrapperRef = useRef<HTMLDivElement | null>(null);
  const chromeHeightsRef = useRef({ navbar: 64, footer: 64 });
  const initialSectionRef = useRef<string | null>(null);

  useLayoutEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const requestedSection = searchParams.get("section") ?? window.location.hash.slice(1);
    const initialSection = sections.some((section) => section.id === requestedSection)
      ? requestedSection
      : null;
    initialSectionRef.current = initialSection;

    if ("scrollRestoration" in window) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const lenis = isDesktop
      ? new Lenis({
          lerp: 0.075,
          smoothWheel: true,
          wheelMultiplier: 0.8,
        })
      : null;
    lenisRef.current = lenis;
    lenisController.instance = lenis;

    const forceHeroTop = () => {
      lenis?.scrollTo(0, { immediate: true });
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      setSection("hero");
    };

    const resetToHero = () => {
      forceHeroTop();
      requestAnimationFrame(forceHeroTop);
    };

    const resetToInitialSection = () => {
      if (!initialSection) {
        resetToHero();
        return;
      }

      const element = document.getElementById(`section-${initialSection}`);
      if (!element) return;

      const target = Math.max(0, element.getBoundingClientRect().top + window.scrollY);
      lenis?.scrollTo(target, { immediate: true });
      window.scrollTo({ top: target, left: 0, behavior: "instant" });
      setSection(initialSection);
    };

    const handlePageShow = () => resetToInitialSection();

    resetToInitialSection();
    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("load", handlePageShow, { once: true });

    if (lenis) lenis.on("scroll", ScrollTrigger.update);

    let snapTimeout: NodeJS.Timeout;
    const handleScrollSnap = () => {
      clearTimeout(snapTimeout);

      const y = window.scrollY;
      const isPinned = ScrollTrigger.getAll().some(
        (st) => st.vars.pin && y >= st.start && y <= st.end,
      );
      const workSection = document.getElementById("section-work");
      const workTop = workSection
        ? workSection.getBoundingClientRect().top + window.scrollY
        : Infinity;
      const workBottom = workSection
        ? workTop + workSection.offsetHeight - window.innerHeight
        : -Infinity;
      const isHorizontalScroll = y >= workTop && y <= workBottom;
      if (isPinned || isHorizontalScroll) return;

      snapTimeout = setTimeout(() => {
        let nearestTop = y;
        let minDistance = Infinity;

        sections.forEach((sec) => {
          const el = document.getElementById(`section-${sec.id}`);
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const absoluteTop = rect.top + window.scrollY;
          const distance = Math.abs(absoluteTop - y);

          if (distance < minDistance) {
            minDistance = distance;
            nearestTop = absoluteTop;
          }
        });

        if (minDistance > 5 && minDistance < window.innerHeight * 0.45) {
          lenis?.scrollTo(nearestTop, {
            duration: 0.6,
            easing: (t) => 1 - Math.pow(1 - t, 3),
          });
        }
      }, 180);
    };

    if (lenis) lenis.on("scroll", handleScrollSnap);

    const updateLenis = (time: number) => {
      lenis?.raf(time * 1000);
    };
    if (lenis) {
      gsap.ticker.add(updateLenis);
    }

    const rafId = requestAnimationFrame(() => setIsMounted(true));

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(snapTimeout);
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("load", handlePageShow);
      if (lenis) {
        gsap.ticker.remove(updateLenis);
        lenis.destroy();
      }
      lenisRef.current = null;
      lenisController.instance = null;
    };
  }, [setSection]);

  useEffect(() => {
    const initialSection = initialSectionRef.current;
    if (!isMounted || !initialSection) return;

    const firstFrame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const element = document.getElementById(`section-${initialSection}`);
        if (!element) return;

        const target = Math.max(0, element.getBoundingClientRect().top + window.scrollY);
        lenisController.instance?.scrollTo(target, { immediate: true });
        window.scrollTo({ top: target, left: 0, behavior: "instant" });
        setSection(initialSection);
        initialSectionRef.current = null;

        const searchParams = new URLSearchParams(window.location.search);
        searchParams.delete("section");
        window.history.replaceState(
          null,
          "",
          `${window.location.pathname}${searchParams.size ? `?${searchParams}` : ""}`,
        );
      });
    });

    return () => cancelAnimationFrame(firstFrame);
  }, [isMounted, setSection]);

  useEffect(() => {
    if (!isMounted) return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;

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
            scrub: true,
          },
        });
      });

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, [isMounted]);

  const currentId = useScrollStore((s) => s.section);
  const current = sections.find((s) => s.id === currentId);
  const currentTheme = current?.bgColor === "EFEFEF" ? "light" : "dark";

  useEffect(() => {
    const root = document.documentElement;
    let refreshTimeout: ReturnType<typeof setTimeout>;

    const applyHeight = (key: "navbar" | "footer", value: number) => {
      if (value <= 0) return;
      chromeHeightsRef.current[key] = value;
      root.style.setProperty(`--${key}-h`, `${value}px`);
      if (key === "navbar") lenisController.navbarHeight = value;
    };

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height;
        if (entry.target === navbarWrapperRef.current) applyHeight("navbar", height);
        if (entry.target === footerWrapperRef.current) applyHeight("footer", height);
      }
      clearTimeout(refreshTimeout);
      refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    });

    if (navbarWrapperRef.current) observer.observe(navbarWrapperRef.current);
    if (footerWrapperRef.current) observer.observe(footerWrapperRef.current);

    return () => {
      clearTimeout(refreshTimeout);
      observer.disconnect();
    };
  }, [currentId]);

  const showChrome = current?.showChrome === true;
  const showNavbar = isMounted && showChrome;
  const showFooter = isMounted && showChrome;

  useEffect(() => {
    document.title = currentId === "hero" ? "Jeevan | portfolio" : `Jeevan | ${currentId}`;
  }, [currentId]);

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
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed top-0 inset-x-0 z-50 pointer-events-auto"
          >
            <Navbar currPage={currentId} theme={currentTheme} />
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
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed bottom-0 inset-x-0 w-full z-50 pointer-events-auto"
          >
            <Footer theme={currentTheme} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}