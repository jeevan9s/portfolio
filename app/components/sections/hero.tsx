"use client";

// landing page
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import { motion } from "framer-motion";


export default function Hero() {
  return (
    <div  className="flex flex-col md:flex-row flex-1 bg-transparent md:justify-between md:items-start items-center gap-y-10 justify-center min-h-screen p-8 md:p-12">
      <div className="flex flex-col gap-y-5 max-w-[100rem] md:max-w-350 md:mt-5">
        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{
            duration: 1.8,
            ease: [0.16, 1, 0.3, 1],
            opacity: { duration: 0.6, ease: "linear", delay: 0.4 },
            delay: 0.4,
          }}
          style={{
            willChange: "transform, opacity, filter",
          }}
        >
          <h1 className="text-[2rem] nav-theme-active md:text-[6rem] md:leading-[6.25rem] montserrat">
            Developing hardware and firmware for embedded platforms.
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{
            duration: 2,
            ease: [0.16, 1, 0.3, 1],
            opacity: { duration: 0.6, ease: "linear", delay: 1},
            delay: 1,
          }}
          style={{
            willChange: "opacity, filter",
          }}
        >
        </motion.div>
      </div>

      <div className="flex flex-col md:gap-y-3 gap-y-5 md:max-w-100 md:bottom-30 md:right-40 md:absolute">
        <motion.div
          initial={{ opacity: 0, y: 70, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
            opacity: { duration: 0.6, ease: "linear"},
          }}
          style={{
            willChange: "transform, opacity, filter",
          }}
        >
          <p className="nav-theme-active inter md:text-[1.2rem]">
          Hey, I’m Jeevan. Particular, observant, and into the details. 
          I tend to pull at things until they make sense.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{
            duration: 2,
            ease: [0.16, 1, 0.3, 1],
            opacity: { duration: 0.6, ease: "linear" },
            delay: 0.75,
          }}
          style={{
            willChange: "opacity, filter",
          }}
          className="opacity-0"
        >
          <p className="nav-theme-muted inter md:text-[1.2rem]">
            based in Toronto, CA.
          </p>{" "}
        </motion.div>
      </div>
    </div>
  );
}
