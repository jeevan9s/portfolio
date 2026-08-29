import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";

const enterEase = [0.16, 1, 0.3, 1] as const;
const exitEase = [0.7, 0, 0.84, 0] as const;

const viewport = {
  once: false,
  amount: 0.3,
  margin: "0px 0px -5% 0px",
} as const;

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: -10,
    filter: "blur(4px)",
    transition: { duration: 0.4, ease: exitEase },
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: enterEase },
  },
};

const dividerVariants: Variants = {
  hidden: {
    opacity: 0,
    scaleX: 0,
    transition: { duration: 0.35, ease: exitEase },
  },
  show: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.7, ease: enterEase },
  },
};

const wordmarkVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
    scale: 0.97,
    filter: "blur(6px)",
    transition: { duration: 0.4, ease: exitEase },
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: enterEase },
  },
};

const listVariants: Variants = {
  hidden: {
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
    filter: "blur(4px)",
    transition: { duration: 0.3, ease: exitEase },
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: enterEase },
  },
};

function useTorontoClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));

    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return time;
}

export default function EndCard() {
  const time = useTorontoClock();

  return (
    <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end bg-transparent w-full p-6 sm:p-8 md:p-12 gap-y-8 md:gap-y-10">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={dividerVariants}
        className="w-full h-px bg-white/10 origin-left"
      />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={fadeUp}
        className="flex flex-row justify-between items-start w-full gap-x-6"
      >
        <div className="flex flex-col gap-y-1">
          <p className="inter text-[0.7rem] sm:text-xs md:text-sm nav-theme-muted leading-none tabular-nums">
            {time}
          </p>

          <div className="flex md:flex-row md:items-center md:gap-x-1">
            <p className="inter text-sm sm:text-base md:text-lg nav-theme-active">
              {" "}
              toronto | {" "}
            </p>
            <p className="inter text-sm sm:text-base md:text-lg nav-theme-active">
              {" "}
               &nbsp;kingston{" "}
            </p>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={listVariants}
          className="flex flex-col items-end gap-y-1.5 sm:gap-y-2 text-right shrink-0"
        >
          <motion.p
            variants={itemVariants}
            className="inter text-[0.7rem] sm:text-xs md:text-sm nav-theme-muted leading-none mb-1"
          >
            connect
          </motion.p>
          <motion.a
            variants={itemVariants}
            href="mailto:jeevansanchez42@gmail.com"
            data-cursor="grow"
            className="inter text-sm sm:text-base md:text-lg nav-theme-active transition-all duration-300 active:scale-95 hover:opacity-70"
          >
            mail
          </motion.a>
          <motion.a
            variants={itemVariants}
            href="https://www.linkedin.com/in/jeevansanchez/"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="grow"
            className="inter text-sm sm:text-base md:text-lg nav-theme-active transition-all duration-300 active:scale-95 hover:opacity-70"
          >
            linkedin
          </motion.a>
          <motion.a
            variants={itemVariants}
            href="https://github.com/jeevan9s"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="grow"
            className="inter text-sm sm:text-base md:text-lg nav-theme-active transition-all duration-300 active:scale-95 hover:opacity-70"
          >
            github
          </motion.a>
          <motion.button
            variants={itemVariants}
            data-cursor="grow"
            className="inter text-sm sm:text-base md:text-lg nav-theme-active transition-all duration-300 active:scale-95 hover:opacity-70 bg-transparent border-none cursor-pointer"
          >
            resume
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={dividerVariants}
        className="w-full h-px nav-theme-muted opacity-20 origin-left"
      />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={wordmarkVariants}
        className="flex flex-row items-end justify-between w-full gap-x-4"
      >
        <div className="flex items-center gap-x-3 sm:gap-x-4 md:gap-x-5 leading-none">
          <span
            className="inter nav-theme-active"
            style={{
              fontSize: "clamp(4.5rem, 20vw, 9rem)",
              lineHeight: 0.85,
            }}
          >
            JS
          </span>
          <span
            className="inter nav-theme-active"
            style={{
              fontSize: "clamp(3rem, 13vw, 6.5rem)",
              lineHeight: 0.85,
            }}
          >
            &copy;
          </span>
        </div>

        <p className="inter text-[0.65rem] sm:text-xs md:text-sm nav-theme-muted whitespace-nowrap pb-1 sm:pb-2">
          &copy; Jeevan Sanchez 2026
        </p>
      </motion.div>
    </div>
  );
}
