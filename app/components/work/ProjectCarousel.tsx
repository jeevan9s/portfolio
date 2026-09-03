"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface CarouselSlide {
  label: string;
  content: React.ReactNode;
}

export default function ProjectCarousel({ slides }: { slides: CarouselSlide[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex];

  const move = (direction: number) => {
    setActiveIndex((current) => (current + direction + slides.length) % slides.length);
  };

  return (
    <section className="w-full" aria-label="Project details carousel">
      <div className="relative min-h-[24rem] overflow-hidden rounded-xl border border-black/10 bg-white/30 p-4 sm:min-h-[30rem] sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-4">
          <p className="inter text-xs uppercase tracking-[0.18em] text-black/45">{activeSlide.label}</p>
          <p className="inter text-xs tabular-nums text-black/45">{String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</p>
        </div>
        <div key={activeIndex} className="animate-[project-slide-in_350ms_ease-out]">
          {activeSlide.content}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-2" aria-label="Carousel slides">
          {slides.map((slide, index) => (
            <button
              key={slide.label}
              type="button"
              aria-label={`Show ${slide.label}`}
              aria-current={index === activeIndex}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 w-2.5 rounded-full transition-transform ${index === activeIndex ? "scale-125 bg-black" : "bg-black/20 hover:bg-black/45"}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" aria-label="Previous slide" onClick={() => move(-1)} className="grid h-10 w-10 place-items-center rounded-full border border-black/15 transition-colors hover:bg-black hover:text-white"><ArrowLeft size={16} /></button>
          <button type="button" aria-label="Next slide" onClick={() => move(1)} className="grid h-10 w-10 place-items-center rounded-full border border-black/15 transition-colors hover:bg-black hover:text-white"><ArrowRight size={16} /></button>
        </div>
      </div>
    </section>
  );
}
