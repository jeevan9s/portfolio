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
      <div className="flex flex-col gap-y-5 max-w-[100rem] md:max-w-350">
        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
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
          <h1 className="text-[2rem] nav-theme-active md:text-[5.25rem] md:leading-[8rem] montserrat">
            Developing hardware and firmware for embedded platforms.
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, filter: "blur(12px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
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
          <Tooltip>
            <div className="md:flex hidden">
              <TooltipTrigger>
                <Image
                  className="transition-all duration-300 hover:scale-105"
                  data-cursor="grow"
                  alt="chakana"
                  src="/chakana.svg"
                  width={60}
                  height={60}
                />
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="inter max-w-45 bg-[#1D1D1D]"
              >
                la Chakana, a symbol of my Peruvian background.
              </TooltipContent>
            </div>
          </Tooltip>
        </motion.div>
      </div>

      <div className="flex flex-col md:gap-y-3 gap-y-5 md:max-w-100 md:bottom-30 md:right-40 md:absolute">
        <motion.div
          initial={{ opacity: 0, y: 70, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut
            dictum orci. In consecm tellus, a tempor mi. 
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, filter: "blur(12px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{
            duration: 2,
            ease: [0.16, 1, 0.3, 1],
            opacity: { duration: 0.6, ease: "linear" },
            delay: 1,
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
