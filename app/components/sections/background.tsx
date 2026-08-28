// about section

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import Image from "next/image";

export default function Background() {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isChakanaHovered, setIsChakanaHovered] = useState(false);

  return (
    <div className="flex flex-col flex-1 bg-transparent items-center min-h-screen pt-24 md:pt-36 p-8 md:p-12">
      <div className="flex flex-col gap-y-8 max-w-[100rem] md:max-w-350 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.4 }}
          onViewportLeave={() => setIsExpanded(false)}
          transition={{
            duration: 1.4,
            ease: [0.16, 1, 0.3, 1],
            opacity: { duration: 0.5, ease: "linear", delay: 0.2 },
            delay: 0.5,
          }}
          style={{
            willChange: "transform, opacity, filter",
          }}
        >
          <motion.div className="flex md:flex-row gap-x-4">
            <Tooltip open={isChakanaHovered} onOpenChange={setIsChakanaHovered}>
              <div className="md:flex hidden mb-6">
                <TooltipTrigger>
                  <Image
                    className="transition-all duration-300 hover:scale-105"
                    data-cursor="grow"
                    alt="chakana"
                    src="/chakana.svg"
                    width={50}
                    height={50}
                  />
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="inter max-w-45 bg-transparent border-none shadow-none nav-theme-active"
                >
                  la Chakana, a symbol of my Peruvian background.
                </TooltipContent>
              </div>
            </Tooltip>

            <div
              className={`md:flex hidden mb-6 transition-all duration-300 ease-in-out ${
                isChakanaHovered
                  ? "opacity-0 -translate-x-2 pointer-events-none"
                  : "opacity-100 translate-x-0"
              }`}
            >
              <Tooltip>
                <TooltipTrigger>
                  <p
                    className="inter md:text-lg transition-all duration-300 hover:scale-105"
                    data-cursor="grow"
                  >
                    जीवन
                  </p>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="inter max-w-55 bg-transparent border-none shadow-none nav-theme-active"
                >
                  जीवन, my Marathi name meaning life.
                </TooltipContent>
              </Tooltip>
            </div>
          </motion.div>

          <p className="inter md:text-[3rem] text-[1.25rem] cursor-pointer leading-tight">
            <motion.span
              animate={{
                color: isHovered ? "var(--text-muted)" : "var(--text-primary)",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
            embedded engineer inclined toward building practical systems
            across hardware and software that work.{" "}
            </motion.span>

            <motion.span
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              animate={{
                color: isHovered ? "var(--text-primary)" : "var(--text-muted)",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              I leverage creativity, drive, and technical depth to turn ideas into something tangible.
            </motion.span>
          </p>

          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="inter text-sm md:text-base mt-6 font-medium nav-theme-muted hover:nav-theme-active duration-300 flex items-center gap-2 cursor-pointer bg-transparent border-none overflow-hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isExpanded ? "less" : "more"}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
              >
                {isExpanded ? "less" : "more about me"}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: 20 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="md:ml-10 overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-[var(--text-muted)]/20">
                <motion.div
                  initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-2"
                >
                  <h3 className="inter font-semibold text-lg nav-theme-active">
                    background
                  </h3>
                  <p className="inter text-sm md:text-base nav-theme-muted leading-relaxed">
                    I started teaching myself tech and got into robotics late in high school.
                    Since then, it&apos;s been projects, independent study, and figuring things out. 
                    Now I&apos;m
                    in second year CE at Queen&apos;s. 
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-2"
                >
                  <h3 className="inter font-semibold text-lg nav-theme-active">
                    scope
                  </h3>
                  <p className="inter text-sm md:text-base nav-theme-muted leading-relaxed">
                    I work across schematic and PCB design in <span className="font-semibold">KiCad</span>, embedded software in <span className="font-semibold">C++</span> and <span className="font-semibold">Python</span>, and systems development, 
                    with a focus on avionics, intelligent robotics, and embedded AI.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-2"
                >
                  <h3 className="inter font-semibold text-lg nav-theme-active">
                    next
                  </h3>
                  <p className="inter text-sm md:text-base nav-theme-muted leading-relaxed">
                  Currently co-leading the Avionics subteam at QRET, building an audio interface,
                  and keeping learning and growth constant.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
