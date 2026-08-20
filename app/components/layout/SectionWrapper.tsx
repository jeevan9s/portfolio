"use client";

import { useEffect, useRef } from "react";
import { useScrollStore } from "@/lib/scrollStore";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sections } from "@/lib/sections";

gsap.registerPlugin(ScrollTrigger);

export default function SectionWrapper({ id, children }: { id: string; children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const setSection = useScrollStore((s) => s.setSection);

  const sectionMeta = sections.find((s) => s.id === id);
  const bgColor = sectionMeta?.bgColor ? `#${sectionMeta.bgColor}` : "#000000";
  const needsChromeClearance = sectionMeta?.showChrome === true;
  const isCompactSection = id === "connect";
  const sectionHeightClass = isCompactSection
    ? "min-h-[55vh] md:min-h-[60vh]"
    : "min-h-screen";
  const clearanceClass = needsChromeClearance
    ? isCompactSection
      ? "pt-16 pb-20 md:pt-20 md:pb-24"
      : "pt-16 pb-16 md:pt-20 md:pb-20"
    : "";

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom center',
      onEnter: () => setSection(id),
      onEnterBack: () => setSection(id),
    });

    return () => st.kill();
  }, [id, setSection]);

  return (
    <section 
      id={id} 
      ref={containerRef} 
      data-bgcolor={bgColor}
      className={`${sectionHeightClass} relative ${clearanceClass}`}
    >
      {children}
    </section>
  );
}