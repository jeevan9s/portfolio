"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import ProjectCarousel, { type CarouselSlide } from "./ProjectCarousel";

const MotionLink = motion.create(Link);

interface HardwareProject {
  title: string;
  description: string;
  details?: string;
  category?: string;
  mcu: string;
  power?: string;
  layers: number;
  size: string;
  peripherals?: string;
  repository?: string;
  docsdownload?: string;
  kicaddownload?: string;
  modelsdownload?: string;
  modelPath?: string;
  models?: Array<{
    path: string;
    label?: string;
    cameraPosition?: [number, number, number];
    cameraTarget?: [number, number, number];
    cameraUp?: [number, number, number];
  }>;
  images?: string | Array<{ path: string; label?: string; alt?: string }>;
  media?: Array<Pick<CarouselSlide, "label" | "modelPath" | "imagePath" | "imageAlt" | "content">>;
  specs?: Array<{ label: string; value: string | number }>;
  links?: Array<{ label: string; href: string; download?: boolean }>;
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

function DetailParagraph({ children }: { children: string }) {
  const urlPattern = /(https?:\/\/[^\s,]+)/g;
  const isUrl = /^https?:\/\/[^\s,]+$/;
  const linkLabel = (url: string) => {
    if (url.includes("github.com")) return "GitHub";
    if (url.includes("linkedin.com")) return "LinkedIn";
    return new URL(url).hostname;
  };

  return (
    <p className="inter max-w-xl text-sm leading-relaxed text-[#5F5F5F]">
      {children.split(urlPattern).map((part, index) => (
        isUrl.test(part)
          ? <a key={`${part}-${index}`} href={part} target="_blank" rel="noreferrer" className="underline decoration-black/20 underline-offset-4 transition-colors hover:text-[#1E1E1E]">{linkLabel(part)}</a>
          : part
      ))}
    </p>
  );
}

export default function HardwarePage({ project }: { project: HardwareProject }) {
  const [openPanels, setOpenPanels] = useState({ specs: true, links: true });
  const specifications = project.specs ?? [
    { label: "MCU", value: project.mcu },
    ...(project.power ? [{ label: "Power", value: project.power }] : []),
    ...(project.peripherals ? [{ label: "Peripherals", value: project.peripherals }] : []),
    { label: "Layers", value: project.layers },
    { label: "Size", value: project.size },
  ];
  const modelSlides = [
    ...(project.modelPath ? [{ label: "3D viewer", modelPath: project.modelPath }] : []),
    ...(project.models ?? []).map((model, index) => ({
      label: model.label ?? `3D model ${index + (project.modelPath ? 2 : 1)}`,
      modelPath: model.path,
      cameraPosition: model.cameraPosition,
      cameraTarget: model.cameraTarget,
      cameraUp: model.cameraUp,
    })),
  ];
  const images = typeof project.images === "string"
    ? [{ path: project.images }]
    : project.images ?? [];
  const imageSlides = images.map((image, index) => ({
    label: image.label ?? `Image ${index + 1}`,
    imagePath: image.path,
    imageAlt: image.alt ?? image.label ?? `${project.title} image ${index + 1}`,
  }));
  const projectLinks = project.links ?? [
    ...(project.repository ? [{ label: "Repository", href: project.repository }] : []),
    ...(project.docsdownload ? [{ label: "Documentation", href: project.docsdownload, download: true }] : []),
    ...(project.kicaddownload ? [{ label: "KiCad files", href: project.kicaddownload, download: true }] : []),
    ...(project.modelsdownload ? [{ label: "3D models", href: project.modelsdownload, download: true }] : []),
  ];
  const slides = [
    ...modelSlides,
    ...imageSlides,
    ...(project.media ?? []),
  ];

  return (
    <article className="min-h-screen bg-[#EFEFEF] px-6 py-10 text-[#1E1E1E] sm:px-8 md:px-12">
      <MotionLink href="/?section=work" whileHover={{ scale: 1.25 }} transition={{ type: "spring", stiffness: 400, damping: 25 }} className="inter inline-block text-sm text-[#878787] hover:text-[#1E1E1E]">
        back to work
      </MotionLink>
      <div className="mx-auto grid w-full max-w-[100rem] gap-12 pt-16 md:grid-cols-[minmax(17rem,0.7fr)_minmax(0,1.3fr)] md:pt-24">
        <div className="flex flex-col">
          <p className="inter mb-3 text-sm uppercase tracking-[0.18em] text-[#878787]">{project.category ?? "Hardware"}</p>
          <h1 className="montserrat text-4xl sm:text-5xl md:text-6xl">{project.title}</h1>
          <p className="inter mt-5 max-w-xl text-base leading-relaxed text-[#5F5F5F]">{project.description}</p>
          {project.details && (
            <div className="mt-5 space-y-4">
              {project.details.split("\n\n").map((paragraph) => (
                <DetailParagraph key={paragraph}>{paragraph}</DetailParagraph>
              ))}
            </div>
          )}

          <div className="mt-10 space-y-5">
            <Disclosure label="Specifications" isOpen={openPanels.specs} onClick={() => setOpenPanels((panels) => ({ ...panels, specs: !panels.specs }))}>
              <dl className="space-y-2.5">
                {specifications.map((spec) => (
                  <div key={spec.label} className="inter flex items-baseline justify-between gap-6 text-sm">
                    <dt className="text-[#878787]">{spec.label}</dt>
                    <dd className="text-right text-[#1E1E1E]">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </Disclosure>

            {projectLinks.length > 0 && (
              <Disclosure label="Links" isOpen={openPanels.links} onClick={() => setOpenPanels((panels) => ({ ...panels, links: !panels.links }))}>
                <ul className="space-y-2.5">
                  {projectLinks.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} download={link.download} target={link.download ? undefined : "_blank"} rel={link.download ? undefined : "noreferrer"} className="inter text-sm text-[#5F5F5F] underline decoration-black/20 underline-offset-4 transition-colors hover:text-[#1E1E1E]">{link.label}</a>
                    </li>
                  ))}
                </ul>
              </Disclosure>
            )}
          </div>
        </div>
        <div className="min-w-0">
          <ProjectCarousel slides={slides} />
        </div>
      </div>
    </article>
  );
}
