"use client";

import Link from "next/link";
import { useState } from "react";
import ProjectCarousel from "./ProjectCarousel";

interface FirmwareProject {
  title: string;
  description: string;
  language: string;
  framework: string;
  protocol?: string;
  apis?: string;
}

export default function FirmwarePage({ project }: { project: FirmwareProject }) {
  const [activeFlowNode, setActiveFlowNode] = useState("input");
  const flow = ["input", "driver", "application"];
  const code = `bool readData() {\n  return sensor.ready();\n}`;
  const slides = [
    { label: "API surface", content: <pre className="min-h-[20rem] whitespace-pre-wrap bg-[#171717] p-8 font-mono text-sm leading-relaxed text-white/80 sm:min-h-[25rem]">{code}</pre> },
    { label: "interactive flow", content: <div className="flex min-h-[20rem] flex-col items-center justify-center gap-3 p-8 sm:min-h-[25rem] sm:flex-row">{flow.map((node, index) => <div key={node} className="flex items-center gap-3"><button type="button" onClick={() => setActiveFlowNode(node)} className={`inter rounded-lg border px-4 py-3 text-sm transition-colors ${activeFlowNode === node ? "border-black bg-black text-white" : "border-black/15 bg-white/50"}`}>{node}</button>{index < flow.length - 1 && <span className="text-black/35">→</span>}</div>)}</div> },
    { label: "runtime behavior", content: <div className="flex min-h-[20rem] items-center justify-center p-8 text-center inter text-xl text-black/65 sm:min-h-[25rem]">Data moves from the hardware interface through the driver and into the application layer.</div> },
  ];

  return (
    <article className="min-h-screen bg-[#1D1D1D] px-6 py-10 text-white sm:px-8 md:px-12">
      <Link href="/#work" className="inter text-sm text-white/50 hover:text-white">
        back to work
      </Link>
      <div className="mx-auto flex w-full max-w-[100rem] flex-col gap-y-8 pt-24 md:pt-32">
        <div>
          <p className="inter mb-3 text-sm uppercase tracking-[0.18em] text-white/50">firmware</p>
          <h1 className="montserrat text-5xl md:text-8xl">{project.title}</h1>
          <p className="inter mt-6 max-w-2xl text-lg leading-relaxed text-white/60">{project.description}</p>
        </div>
        <ProjectCarousel slides={slides} />
      </div>
    </article>
  );
}
