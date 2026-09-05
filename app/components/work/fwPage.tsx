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
  footprint?: string;
  build?: string;
  version?: string;
  repository?: string;
  code?: string;
  consoleOutput?: string;
  consoleLabel?: string;
  images?: string | Array<{ path: string; label?: string; alt?: string }>;
  media?: Array<Pick<CarouselSlide, "label" | "imagePath" | "imageAlt" | "content">>;
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

const CODE_TOKEN_PATTERN =
  /(\/\/.*)|(\/\*[\s\S]*?\*\/)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|\b(bool|int|void|float|double|char|short|long|struct|class|return|if|else|for|while|do|switch|case|break|continue|const|static|volatile|typedef|enum|namespace|public|private|protected|new|delete|true|false|null|nullptr|uint8_t|uint16_t|uint32_t|int8_t|int16_t|int32_t)\b|(#\w+)|(\b\d+\.?\d*[fFuUlL]*\b)|([A-Za-z_]\w*)(?=\()/g;

function highlightCode(code: string) {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  CODE_TOKEN_PATTERN.lastIndex = 0;
  while ((match = CODE_TOKEN_PATTERN.exec(code)) !== null) {
    const [full, comment, blockComment, string, keyword, directive, number, fn] = match;

    if (match.index > lastIndex) {
      nodes.push(code.slice(lastIndex, match.index));
    }

    let className = "";
    if (comment || blockComment) className = "text-[#6B806E] italic";
    else if (string) className = "text-[#9A5B35]";
    else if (keyword) className = "text-[#275D8C] font-medium";
    else if (directive) className = "text-[#765A8A] font-medium";
    else if (number) className = "text-[#A2672D]";
    else if (fn) className = "text-[#2E6F73] font-medium";

    nodes.push(
      <span key={key++} className={className}>
        {full}
      </span>
    );
    lastIndex = match.index + full.length;
  }
  if (lastIndex < code.length) {
    nodes.push(code.slice(lastIndex));
  }
  return nodes;
}

const CONSOLE_LINE_PATTERN = /^(\[[^\]]+\]\s*)?(\b(ERROR|ERR|FAIL)\b|\b(WARN|WARNING)\b|\b(OK|PASS|DONE|SUCCESS)\b|\b(INFO|DEBUG)\b)?/;

function highlightConsoleLine(line: string, key: number) {
  if (/^\s*[>$]\s?/.test(line)) {
    return (
      <div key={key} className="text-[#1E1E1E]">
        <span className="text-[#878787]">{line.match(/^\s*[>$]\s?/)?.[0]}</span>
        <span className="font-medium">{line.replace(/^\s*[>$]\s?/, "")}</span>
      </div>
    );
  }

  const match = line.match(CONSOLE_LINE_PATTERN);
  const timestamp = match?.[1];
  const level = match?.[2];

  let levelClassName = "";
  if (match?.[3]) levelClassName = "text-[#9A4B3F] font-medium"; // error/fail
  else if (match?.[4]) levelClassName = "text-[#A2672D] font-medium"; // warn
  else if (match?.[5]) levelClassName = "text-[#4F7A5C] font-medium"; // ok/pass/done
  else if (match?.[6]) levelClassName = "text-[#6B6B6B]"; // info/debug

  const rest = line.slice(match?.[0].length ?? 0);

  return (
    <div key={key}>
      {timestamp && <span className="text-[#A3A3A3]">{timestamp}</span>}
      {level && <span className={levelClassName}>{level}</span>}
      <span className="text-[#3A3A3A]">{rest}</span>
    </div>
  );
}

function ConsoleOutput({ output }: { output: string }) {
  const lines = output.split("\n");
  return (
    <pre className="min-h-[20rem] whitespace-pre-wrap bg-card p-8 font-mono text-sm leading-relaxed sm:min-h-[25rem]">
      {lines.map((line, index) => highlightConsoleLine(line, index))}
    </pre>
  );
}

export default function FirmwarePage({ project }: { project: FirmwareProject }) {
  const [openPanels, setOpenPanels] = useState({ specs: true, links: true });
  const metadataSpecifications = [
    { label: "Language", value: project.language },
    { label: "Framework", value: project.framework },
    ...(project.protocol ? [{ label: "Protocol", value: project.protocol }] : []),
    ...(project.apis ? [{ label: "APIs", value: project.apis }] : []),
    ...(project.footprint ? [{ label: "Footprint", value: project.footprint }] : []),
    ...(project.build ? [{ label: "Build", value: project.build }] : []),
    ...(project.version ? [{ label: "Version", value: project.version }] : []),
  ];
  const customSpecifications = project.specs ?? [];
  const specifications = [
    ...customSpecifications,
    ...metadataSpecifications.filter(
      (metadata) => !customSpecifications.some((spec) => spec.label.toLowerCase() === metadata.label.toLowerCase()),
    ),
  ];
  const projectLinks = project.repository ? [{ label: "GitHub", href: project.repository }] : [];
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
    {
      label: "API surface",
      content: (
        <pre className="min-h-[20rem] whitespace-pre-wrap bg-card p-8 font-mono text-sm leading-relaxed text-card-foreground sm:min-h-[25rem]">
          {highlightCode(code)}
        </pre>
      ),
    },
    ...imageSlides,
    ...(project.media ?? []),
    ...(project.consoleOutput
      ? [
          {
            label: project.consoleLabel ?? "Serial monitor",
            content: <ConsoleOutput output={project.consoleOutput} />,
          },
        ]
      : []),
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
                      <a href={link.href} target="_blank" rel="noreferrer" className="inter text-sm text-[#5F5F5F] underline decoration-black/20 underline-offset-4 transition-colors hover:text-[#1E1E1E]">{link.label}</a>
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