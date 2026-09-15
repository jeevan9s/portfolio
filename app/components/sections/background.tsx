import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import Image from "next/image";

export default function Background() {
  const [isSecondActive, setIsSecondActive] = useState(false);
  const [isChakanaOpen, setIsChakanaOpen] = useState(false);
  const [isNameOpen, setIsNameOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const canHover = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  return (
    <div className="flex flex-col flex-1 bg-transparent items-center min-h-screen pt-8 md:pt-12 p-6 md:p-12 pb-16">
      <div className="flex flex-col gap-y-8 max-w-[100rem] md:max-w-350 2xl:max-w-[110rem] 3xl:max-w-[130rem] 4xl:max-w-[150rem] w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          onViewportEnter={() => setIsSecondActive(false)}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
            opacity: { duration: 0.5, ease: "linear", delay: 0.2 },
            delay: 0.2,
          }}
          style={{
            willChange: "transform, opacity",
          }}
        >
          <motion.div className="flex gap-x-4">
            <Tooltip
              open={isChakanaOpen}
              onOpenChange={(open) => {
                setIsChakanaOpen(open);
                if (open) setIsNameOpen(false);
              }}
            >
              <div className="flex mb-6">
                <TooltipTrigger
                  onMouseEnter={() => {
                    if (canHover()) {
                      setIsChakanaOpen(true);
                      setIsNameOpen(false);
                    }
                  }}
                  onMouseLeave={() => {
                    if (canHover()) setIsChakanaOpen(false);
                  }}
                  onClick={() => {
                    if (!canHover()) {
                      setIsChakanaOpen((prev) => !prev);
                      setIsNameOpen(false);
                    }
                  }}
                  data-cursor="grow"
                  className="transition-all duration-300 hover:scale-105 active:scale-95 bg-transparent border-none p-0 cursor-pointer"
                >
                  <Image
                    alt="chakana"
                    src="/chakana.svg"
                    width={32}
                    height={32}
                    className="md:w-[50px] md:h-[50px] 3xl:w-[60px] 3xl:h-[60px] 4xl:w-[70px] 4xl:h-[70px]"
                  />
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="inter max-w-45 3xl:max-w-70 4xl:max-w-80 3xl:text-lg 4xl:text-xl bg-transparent border-none shadow-none nav-theme-active"
                >
                  la Chakana, a symbol of my Peruvian background.
                </TooltipContent>
              </div>
            </Tooltip>

            <div
              className={`flex mb-6 transition-all duration-300 ease-in-out ${
                isChakanaOpen
                  ? "opacity-0 -translate-x-2 pointer-events-none"
                  : "opacity-100 translate-x-0"
              }`}
            >
              <Tooltip
                open={isNameOpen}
                onOpenChange={(open) => {
                  setIsNameOpen(open);
                  if (open) setIsChakanaOpen(false);
                }}
              >
                <TooltipTrigger
                  onMouseEnter={() => {
                    if (canHover()) {
                      setIsNameOpen(true);
                      setIsChakanaOpen(false);
                    }
                  }}
                  onMouseLeave={() => {
                    if (canHover()) setIsNameOpen(false);
                  }}
                  onClick={() => {
                    if (!canHover()) {
                      setIsNameOpen((prev) => !prev);
                      setIsChakanaOpen(false);
                    }
                  }}
                  data-cursor="grow"
                  className="inter text-base md:text-lg 3xl:text-2xl 4xl:text-3xl transition-all duration-300 hover:scale-105 active:scale-95 bg-transparent border-none p-0 cursor-pointer"
                >
                  जीवन
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="inter max-w-55 3xl:max-w-75 4xl:max-w-85 3xl:text-lg 4xl:text-xl bg-transparent border-none shadow-none nav-theme-active"
                >
                  my Marathi name, meaning life.
                </TooltipContent>
              </Tooltip>
            </div>
          </motion.div>

          <p
            className="inter text-2xl sm:text-3xl md:text-[3rem] 3xl:text-[3.75rem] 4xl:text-[4.25rem] leading-[1.35] md:leading-tight 3xl:leading-[1.3] 3xl:tracking-wide"
            onMouseLeave={() => canHover() && setIsSecondActive(false)}
          >
            <motion.span
              onMouseEnter={() => canHover() && setIsSecondActive(false)}
              onClick={() => !canHover() && setIsSecondActive(false)}
              animate={{
                color: isSecondActive
                  ? "var(--text-muted)"
                  : "var(--text-primary)",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="cursor-pointer active:opacity-80"
            >
              embedded engineer inclined toward building practical systems
              across hardware and software that work.{" "}
            </motion.span>

            <motion.span
              onMouseEnter={() => canHover() && setIsSecondActive(true)}
              onClick={() => !canHover() && setIsSecondActive(true)}
              animate={{
                color: isSecondActive
                  ? "var(--text-primary)"
                  : "var(--text-muted)",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="cursor-pointer active:opacity-80"
            >
              I leverage creativity, drive, and technical depth to turn ideas into something tangible.
            </motion.span>
          </p>

          <motion.button
            onClick={() => setIsExpanded((expanded) => !expanded)}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            aria-expanded={isExpanded}
            aria-controls="background-details"
            className="inter text-sm md:text-base 2xl:text-xl 3xl:text-3xl 4xl:text-4xl mt-8 2xl:mt-10 3xl:mt-12 4xl:mt-14 -mx-1 px-1 py-2 font-medium nav-theme-muted hover:nav-theme-active duration-300 flex items-center gap-2 cursor-pointer bg-transparent border-none overflow-hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isExpanded ? "less" : "more"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block text-sm md:text-base 2xl:text-xl 3xl:text-3xl 4xl:text-4xl"
              >
                {isExpanded ? "less" : "more about me"}
              </motion.span>
            </AnimatePresence>
          </motion.button>

        </motion.div>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              id="background-details"
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: 20 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="md:ml-10 2xl:ml-12 3xl:ml-16 4xl:ml-20 overflow-hidden"
            >
              <div className="flex flex-col gap-8 md:grid md:grid-cols-3 md:gap-8 2xl:gap-12 3xl:gap-16 4xl:gap-20 pt-8 2xl:pt-10 3xl:pt-12 4xl:pt-16 mt-2 border-t border-[var(--text-muted)]/20">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-2 2xl:gap-3 3xl:gap-4 4xl:gap-5"
                >
                  <h3 className="inter font-semibold text-lg md:text-lg 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl nav-theme-active">
                    background
                  </h3>
                  <p className="inter text-base md:text-base 2xl:text-lg 3xl:text-2xl 4xl:text-[2rem] 2xl:leading-relaxed 3xl:leading-relaxed 4xl:leading-relaxed nav-theme-muted leading-relaxed">
                    I started teaching myself tech and got into robotics late in high school.
                    Since then, it&apos;s been projects, independent study, and figuring things out.
                    Now I&apos;m
                    in second year CE at Queen&apos;s.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-2 2xl:gap-3 3xl:gap-4 4xl:gap-5"
                >
                  <h3 className="inter font-semibold text-lg md:text-lg 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl nav-theme-active">
                    scope
                  </h3>
                  <p className="inter text-base md:text-base 2xl:text-lg 3xl:text-2xl 4xl:text-[2rem] 2xl:leading-relaxed 3xl:leading-relaxed 4xl:leading-relaxed nav-theme-muted leading-relaxed">
                    I work across schematic and PCB design in <span className="font-semibold">KiCad</span>, embedded software in <span className="font-semibold">C++</span> and <span className="font-semibold">Python</span>, and systems development,
                    with a focus on avionics, intelligent robotics, and embedded AI.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-2 2xl:gap-3 3xl:gap-4 4xl:gap-5"
                >
                  <h3 className="inter font-semibold text-lg md:text-lg 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl nav-theme-active">
                    next
                  </h3>
                  <p className="inter text-base md:text-base 2xl:text-lg 3xl:text-2xl 4xl:text-[2rem] 2xl:leading-relaxed 3xl:leading-relaxed 4xl:leading-relaxed nav-theme-muted leading-relaxed">
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