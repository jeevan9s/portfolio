"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import ProjectCarousel, { type CarouselSlide } from "./ProjectCarousel";

const MotionLink = motion.create(Link);

interface FirmwareProject {
  title: string;
  description: string;
  details?: string;
  category?: string;
  language: string;
  framework: string;
  protocol?: string;
  apis?: string;
  code?: string;
  images?: string | Array<{ path: string; label?: string; alt?: string }>;
  media?: Array<Pick<CarouselSlide, "label" | "imagePath" | "imageAlt">>;
  specs?: Array<{ label: string; value: string | number }>;
}

function Disclosure({ children, isOpen, label, onClick }: { children: React.ReactNode; isOpen: boolean; label: string; onClick: () => void }) {
  return (
    <section className="border-t border-black/10 pt-4">
      <button type="button" onClick={onClick} aria-expanded={isOpen} className="inter flex w-full items-center justify-between text-left text-xs uppercase tracking-[0.14em] text-[#878787] transition-colors hover:text-[#1E1E1E]">
        {label}
        <ChevronDown size={15} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "mt-4 grid-rows-[1fr]" : "mt-0 grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">{children}</div>
      </div>
    </section>
  );
}

export default function FirmwarePage({ project }: { project: FirmwareProject }) {
  const [specsOpen, setSpecsOpen] = useState(true);
  const specifications = project.specs ?? [
    { label: "Language", value: project.language },
    { label: "Framework", value: project.framework },
    ...(project.protocol ? [{ label: "Protocol", value: project.protocol }] : []),
    ...(project.apis ? [{ label: "APIs", value: project.apis }] : []),
  ];
  const code = project.code ?? `bool readData() {\n  return sensor.ready();\n}`;
  const images = typeof project.images === "string"
    ? [{ path: project.images }]
    : project.images ?? [];
  const imageSlides = images.map((image, index) => ({
    label: image.label ?? `Image ${index + 1}`,
    imagePath: image.path,
    imageAlt: image.alt ?? image.label ?? `${project.title} image ${index + 1}`,
  }));
  const slides = [
    ...imageSlides,
    ...(project.media ?? []),
    { label: "API surface", content: <pre className="min-h-[20rem] whitespace-pre-wrap bg-card p-8 font-mono text-sm leading-relaxed text-card-foreground sm:min-h-[25rem]">{code}</pre> },
  ];

  return (
    <article className="min-h-screen bg-[#EFEFEF] px-6 py-10 text-[#1E1E1E] sm:px-8 md:px-12">
      <MotionLink href="/?section=work" whileHover={{ scale: 1.25 }} transition={{ type: "spring", stiffness: 400, damping: 25 }} className="inter inline-block text-sm text-[#878787] hover:text-[#1E1E1E]">
        back to work
      </MotionLink>
      <div className="mx-auto grid w-full max-w-[100rem] gap-12 pt-16 md:grid-cols-[minmax(17rem,0.7fr)_minmax(0,1.3fr)] md:pt-24">
        <div className="flex flex-col">
          <p className="inter mb-3 text-sm uppercase tracking-[0.18em] text-[#878787]">{project.category ?? "Firmware"}</p>
          <h1 className="montserrat text-4xl sm:text-5xl md:text-6xl">{project.title}</h1>
          <p className="inter mt-5 max-w-xl text-base leading-relaxed text-[#5F5F5F]">{project.description}</p>
          {project.details && <p className="inter mt-5 max-w-xl text-sm leading-relaxed text-[#5F5F5F]">{project.details}</p>}

          <div className="mt-10 space-y-5">
            <Disclosure label="Specifications" isOpen={specsOpen} onClick={() => setSpecsOpen((isOpen) => !isOpen)}>
              <dl className="space-y-2.5">
                {specifications.map((spec) => (
                  <div key={spec.label} className="inter flex items-baseline justify-between gap-6 text-sm">
                    <dt className="text-[#878787]">{spec.label}</dt>
                    <dd className="text-right text-[#1E1E1E]">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </Disclosure>
          </div>
        </div>
        <div className="min-w-0">
          <ProjectCarousel slides={slides} />
        </div>
      </div>
    </article>
  );
}
