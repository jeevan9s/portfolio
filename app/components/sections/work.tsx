"use client";

import { useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGLTF } from "@react-three/drei";
import HardwareCard from "../work/hwCard";
import FirmwareCard from "../work/fwCard";

gsap.registerPlugin(ScrollTrigger);

export type specification = {
  label: string;
  value: string;
  percentage?: number;
}

const avLib: specification[] = [
  { label: "flash", value: "34%", percentage: 34 },
  { label: "ram", value: "18%", percentage: 18 },
];
const lsmLib: specification[] = [
  { label: "flash", value: "34%", percentage: 34 },
  { label: "ram", value: "18%", percentage: 18 },
];
const calmeca: specification[] = [
  { label: "platform", value: "desktop" },
];

type Project =
  | { type: "hardware"; id: string; title: string; description: string; mcu: string; layers: number; size: string; image?: string; modelPath?: string; }
  | { type: "firmware"; id: string; title: string; description: string; image?: string; language: string; framework: string; protocol?: string; apis?: string; specs: specification[] }

const projects: Project[] = [
  { type: "hardware", id: "proj-1", title: "Penguin", description: "Hybrid wheel-legged rover for intelligent robotics, computer vision, and embodied AI.", mcu: "ESP32-S3", layers: 4, size: "62 × 90mm", modelPath: "/projs/models/penguin_controller-optimized.glb" },
  { type: "hardware", id: "proj-2", title: "Avionics Sensor & Control Modules", description: "Custom avionics hardware for propulsion control, sensing, and communications.", mcu: "STM32F1", layers: 4, size: "70 x 62mm", modelPath: "/projs/models/modules-optimized.glb" },
  { type: "hardware", id: "proj-3", title: "Homectrl", description: "Home automation controller for streamlining routine household tasks.", mcu: "ESP32-S3-1U", layers: 4, size: "Ø60mm", modelPath: "/projs/models/homectrl_controller-optimized.glb" },
  { type: "firmware", id: "proj-4", title: "Avionics Libraries", description: "Reusable embedded drivers and peripheral libraries for avionics systems.", language: "C++", framework: "PlatformIO", protocol: "SPI, I2C", specs: avLib },
  { type: "firmware", id: "proj-5", title: "Motion Library", description: "Embedded IMU driver and motion utilities for the LSM6DSM measuring unit.", language: "C++", framework: "PlatformIO", protocol: "I2C", specs: lsmLib },
  { type: "firmware", id: "proj-6", title: "Calmeca", description: "Academic productivity app built to streamline course scheduling and management.", language: "TypeScript", framework: "Next.js", apis: "Google, OAuth", specs: calmeca },
];

projects.forEach((project) => {
  if (project.type === "hardware" && project.modelPath) {
    useGLTF.preload(project.modelPath, true, true);
  }
});

export default function Work() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollHostRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
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
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[250vh] w-full bg-transparent min-h-screen"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-start overflow-hidden p-8 md:p-12 pt-10 md:pt-10">
        <div className="flex flex-col gap-y-3 max-w-[100rem] mb-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <h1 className="text-[3rem] text-[#1E1E1E] md:text-[5.25rem] montserrat">selected works</h1>
            <h3 className="text-[1.5rem] text-[#878787] md:text-[2rem] inter font-light">
              an index of builds
            </h3>
          </motion.div>
        </div>

        <div ref={scrollHostRef} className="w-full overflow-hidden overflow-y-visible">
          <div
            ref={trackRef}
            className="flex flex-row items-center gap-x-10 md:gap-x-16 py-6 w-max will-change-transform"
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="work-card shrink-0"
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