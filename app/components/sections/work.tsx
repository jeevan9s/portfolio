"use client";

import { useEffect, useRef, useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGLTF } from "@react-three/drei";
import HardwareCard from "../work/hwCard";
import FirmwareCard from "../work/fwCard";

gsap.registerPlugin(ScrollTrigger);

// serve draco decoder locally instead of fetching from gstatic's CDN
useGLTF.setDecoderPath("/draco/");

export type specification = {
  label: string;
  value: string;
}

const avLib: specification[] = [];
const lsmLib: specification[] = [];
const calmeca: specification[] = [
  { label: "platform", value: "desktop" },
];

type Project =
  | { type: "hardware"; id: string; title: string; description: string; mcu: string; layers: number; size: string; image?: string; modelPath?: string; }
  | { type: "firmware"; id: string; title: string; description: string; image?: string; language: string; framework: string; protocol?: string; apis?: string; specs: specification[] }

const projects: Project[] = [
  { type: "hardware", id: "proj-1", title: "Penguin", description: "Hybrid wheel-legged rover for intelligent robotics, computer vision, and embodied AI.", mcu: "ESP32-S3", layers: 4, size: "62 × 90mm", modelPath: "/projs/models/penguin_controller-final-draco.glb" },
  { type: "hardware", id: "proj-2", title: "Avionics Sensor & Control Modules", description: "Custom avionics hardware for propulsion control, sensing, and communications.", mcu: "STM32F1", layers: 4, size: "70 x 62mm", modelPath: "/projs/models/modules-final-draco.glb" },
  { type: "hardware", id: "proj-3", title: "Homectrl", description: "Home automation controller for streamlining routine household tasks.", mcu: "ESP32-S3-1U", layers: 4, size: "Ø60mm", modelPath: "/projs/models/homectrl_controller-final-draco.glb" },
  { type: "firmware", id: "proj-4", title: "Avionics Libraries", description: "Reusable embedded drivers and peripheral libraries for avionics systems.", language: "C++", framework: "PlatformIO", protocol: "SPI, I2C", specs: avLib },
  { type: "firmware", id: "proj-5", title: "Motion Library", description: "Embedded IMU driver and motion utilities for the LSM6DSM measuring unit.", language: "C++", framework: "PlatformIO", protocol: "I2C", specs: lsmLib },
  { type: "firmware", id: "proj-6", title: "Calmeca", description: "Academic productivity app built to streamline course scheduling and management.", language: "TypeScript", framework: "Next.js", apis: "Google, OAuth", specs: calmeca },
];

export function preloadHardwareModels() {
  projects.forEach((project) => {
    if (project.type === "hardware" && project.modelPath) {
      useGLTF.preload(project.modelPath, true, true);
    }
  });
}

export default function Work() {
  const [isDesktop, setIsDesktop] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollHostRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useLayoutEffect(() => {
    if (!isDesktop) return;

    const container = containerRef.current;
    const host = scrollHostRef.current;
    const track = trackRef.current;
    if (!container || !host || !track) return;

    const ctx = gsap.context(() => {
      const tween = gsap.to(track, {
        x: () => -(track.scrollWidth - host.clientWidth),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      const ro = new ResizeObserver(() => ScrollTrigger.refresh());
      ro.observe(track);
      ro.observe(host);

      return () => {
        ro.disconnect();
        tween.kill();
      };
    }, container);

    return () => ctx.revert();
  }, [isDesktop]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-0 w-full bg-transparent md:h-[250vh] md:min-h-screen"
    >
      <div className="flex flex-col justify-start p-8 pt-10 md:sticky md:top-0 md:h-screen md:overflow-hidden md:p-12 md:pt-10 xl:p-16 2xl:p-20">
        <div className="flex flex-col gap-y-3 max-w-[100rem] mb-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <h1 className="text-[3rem] text-[#1E1E1E] md:text-[5.25rem] 2xl:text-[6rem] montserrat">selected works</h1>
            <h3 className="text-[1.5rem] text-[#878787] md:text-[2rem] 2xl:text-[2.25rem] inter font-light">
              an index of builds
            </h3>
          </motion.div>
        </div>

        <div ref={scrollHostRef} className="work-scrollbar w-full snap-x snap-proximity overflow-x-auto touch-auto overscroll-x-contain overflow-y-visible md:overflow-hidden md:snap-none">
          <div
            ref={trackRef}
            className="flex w-max flex-row items-center gap-x-4 py-6 will-change-transform md:gap-x-16"
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="work-card shrink-0 snap-start will-change-transform"
              >
                {project.type === "hardware" ? (
                  <HardwareCard {...project} />
                ) : (
                  <FirmwareCard {...project} />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}