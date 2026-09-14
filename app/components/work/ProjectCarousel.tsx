"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGLTF } from "@react-three/drei";
import BoardViewer from "./BoardViewer";

export interface CarouselSlide {
  label: string;
  content?: React.ReactNode;
  modelPath?: string;
  cameraPosition?: [number, number, number];
  cameraTarget?: [number, number, number];
  cameraUp?: [number, number, number];
  imagePath?: string;
  imageAlt?: string;
}

export default function ProjectCarousel({ slides }: { slides: CarouselSlide[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex];

  // warm the neighbouring slides' models so switching feels instant
  useEffect(() => {
    const neighbours = [
      slides[(activeIndex + 1) % slides.length],
      slides[(activeIndex - 1 + slides.length) % slides.length],
    ];
    neighbours.forEach((slide) => {
      if (slide?.modelPath) useGLTF.preload(slide.modelPath, true, true);
    });
  }, [activeIndex, slides]);

  const move = (direction: number) => {
    setActiveIndex((current) => (current + direction + slides.length) % slides.length);
  };

  const slideContent = activeSlide.modelPath
    ? <BoardViewer modelPath={activeSlide.modelPath} cameraPosition={activeSlide.cameraPosition} cameraTarget={activeSlide.cameraTarget} cameraUp={activeSlide.cameraUp} />
    : activeSlide.imagePath
      ? <img src={activeSlide.imagePath} alt={activeSlide.imageAlt ?? activeSlide.label} className="h-[20rem] w-full object-contain sm:h-[25rem] 3xl:h-[32rem] 4xl:h-[38rem]" />
      : activeSlide.content;

  return (
    <section className="w-full" aria-label="Project details carousel">
      <div className="relative min-h-[24rem] overflow-hidden rounded-xl border border-black/10 bg-white/30 p-4 sm:min-h-[30rem] sm:p-6 3xl:min-h-[38rem] 3xl:p-8 4xl:min-h-[44rem]">
        <div className="mb-5 3xl:mb-7 flex items-center justify-between gap-4">
          <p className="inter text-xs 3xl:text-sm 4xl:text-base uppercase tracking-[0.18em] text-black/45">{activeSlide.label}</p>
          <p className="inter text-xs 3xl:text-sm 4xl:text-base tabular-nums text-black/45">{String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</p>
        </div>
        <div key={activeIndex} className="animate-[project-slide-in_350ms_ease-out]">
          {slideContent}
        </div>
      </div>
      <div className="mt-4 3xl:mt-6 flex items-center justify-between">
        <div className="flex gap-2 3xl:gap-3" aria-label="Carousel slides">
          {slides.map((slide, index) => (
            <button
              key={slide.label}
              type="button"
              aria-label={`Show ${slide.label}`}
              aria-current={index === activeIndex}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 w-2.5 3xl:h-3 3xl:w-3 transition-colors ${index === activeIndex ? "bg-black" : "bg-black/20 hover:bg-black/45"}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" aria-label="Previous slide" onClick={() => move(-1)} className="grid h-9 w-9 place-items-center text-black/60 transition-colors hover:text-black"><ChevronLeft size={20} /></button>
          <button type="button" aria-label="Next slide" onClick={() => move(1)} className="grid h-9 w-9 place-items-center text-black/60 transition-colors hover:text-black"><ChevronRight size={20} /></button>
        </div>
      </div>
    </section>
  );
}
