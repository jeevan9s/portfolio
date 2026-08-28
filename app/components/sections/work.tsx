"use client";

// selected work page

import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HardwareCard from "../work/hwCard";
import FirmwareCard from "../work/fwCard";


gsap.registerPlugin(ScrollTrigger);

type Project =
  | {
      type: "hardware";
      id: string;
      title: string;
      description: string;
      mcu: string;
      layers: number;
      size: string;
      image?: string;
    }
  | {
      type: "firmware";
      id: string;
      title: string;
      description: string;
      image?: string;
    };

const projects: Project[] = [
  {
    type: "hardware",
    id: "proj-1",
    title: "Title",
    description:
      "orem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus gravida, ipsum eget sagittis vestibulum, nisi ipsum",
    mcu: "STM32H7",
    layers: 4,
    size: "42 × 28mm",
  },
  {
    type: "firmware",
    id: "proj-2",
    title: "Firmware Title",
    description: "Short description of what this firmware does and why it exists.",
  },
  {
    type: "hardware",
    id: "proj-3",
    title: "Another Board",
    description:
      "Short description of what this board does and the problem it solves.",
    mcu: "RP2040",
    layers: 2,
    size: "35 × 20mm",
  },
  {
    type: "firmware",
    id: "proj-4",
    title: "RTOS Scheduler",
    description: "A short blurb describing the scheduler's purpose and approach.",
  },
];

const PIN_START_OFFSET = 250;

export default function Work() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;

    const ctx = gsap.context(() => {
      const getScrollDistance = () =>
        Math.max(0, track.scrollWidth - pin.clientWidth);

      // Pin must lock below the fixed navbar, not at the raw viewport top,
      // otherwise the pinned row sits under/behind the navbar the whole scroll.
      const getNavClearance = () =>
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--navbar-h"),
        ) || 72;

      const cards = gsap.utils.toArray<HTMLElement>(".work-card", track);

      // Cards fade/rise/scale in once the section is mostly in view; driving this
      // via GSAP (rather than per-card whileInView) keeps it reliable even
      // though most cards start off-screen inside the horizontally pinned track.
      gsap.set(cards, { opacity: 0, y: 44, scale: 0.94, filter: "blur(10px)" });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "back.out(1.4)",
        stagger: 0.1,
        scrollTrigger: {
          trigger: pin,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      const st = ScrollTrigger.create({
        trigger: pin,
        start: () => `top+=${PIN_START_OFFSET} top+=${getNavClearance()}`,
        end: () => `+=${getScrollDistance()}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        animation: gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: "none",
        }),
      });

      const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 300);

      return () => {
        window.clearTimeout(refreshId);
        st.kill();
      };
    }, pin);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pinRef}
      className="relative flex flex-col bg-transparent min-h-screen overflow-hidden p-8 md:p-12"
    >
      <div className="flex flex-col gap-y-5 max-w-[100rem] md:max-w-350">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.97, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
            opacity: { duration: 0.6, ease: "linear" },
          }}
          style={{
            willChange: "transform, opacity, filter",
          }}
          className="md:mt-25"
        >
          <h1 className="text-[3rem] text-[#1E1E1E] md:text-[5.25rem] montserrat">
            selected works
          </h1>

          <motion.h3
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.25,
            }}
            className="text-[2rem] text-[#878787] md:text-[2.5rem] inter font-light"
          >
            an index of builds
          </motion.h3>
        </motion.div>
      </div>

      <div className="flex-1 flex items-center overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-row items-start gap-x-10 md:gap-x-16"
          style={{ willChange: "transform" }}
        >
          {projects.map((project) => (
            <div key={project.id} className="work-card shrink-0">
              {project.type === "hardware" ? (
                <HardwareCard
                  title={project.title}
                  description={project.description}
                  mcu={project.mcu}
                  layers={project.layers}
                  size={project.size}
                  image={project.image}
                />
              ) : (
                <FirmwareCard
                  title={project.title}
                  description={project.description}
                  image={project.image}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}