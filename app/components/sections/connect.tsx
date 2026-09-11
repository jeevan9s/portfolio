"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const revealTransition = { duration: 0.7, ease: [0.16, 1, 0.3, 1] } as const;
const viewport = { once: true, amount: 0.2 } as const;
const email = "jeevansanchez42@gmail.com";

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: revealTransition,
  },
};

export default function Connect() {
  const [isEmailTooltipOpen, setIsEmailTooltipOpen] = useState(false);
  const [resumeType, setResumeType] = useState<"hw-resume" | "sw-resume">(
    "hw-resume",
  );
  const emailTooltipTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resumeLinks = {
    "hw-resume": "/projs/downloads/Sanchez_Jeevan_HW_Resume.pdf",
    "sw-resume": "/projs/downloads/Sanchez_Jeevan_FW_Resume.pdf",
  };

  useEffect(() => {
    return () => {
      if (emailTooltipTimeout.current) clearTimeout(emailTooltipTimeout.current);
    };
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard?.writeText(email);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = email;
      textArea.setAttribute("readonly", "");
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      textArea.remove();
    }

    setIsEmailTooltipOpen(true);
    if (emailTooltipTimeout.current) clearTimeout(emailTooltipTimeout.current);
    emailTooltipTimeout.current = setTimeout(() => setIsEmailTooltipOpen(false), 750);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] flex-1 bg-transparent gap-y-10 md:gap-x-12 items-start justify-start md:justify-between min-h-[26rem] p-6 sm:p-8 md:p-12 xl:p-16 2xl:p-20">
      <div className="flex flex-col gap-y-4 w-full md:max-w-2xl 2xl:max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={revealTransition}
          style={{
            willChange: "transform, opacity",
          }}
        >
          <h1 className="text-[2.25rem] leading-[1.1] text-[#FFFFFF] sm:text-[3rem] md:text-[5.25rem] md:leading-none 2xl:text-[6rem] montserrat text-left">
            let&apos;s connect.
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ ...revealTransition, delay: 0.1 }}
          className="flex flex-col w-full md:max-w-[30rem]"
        >
          <p className="inter text-base sm:text-lg md:text-xl text-[#969696] leading-relaxed text-left">
            reach out to me. I&apos;m always interested in
            <span className="inter text-base sm:text-lg md:text-xl text-[#DEDCDC]">
              {" "}
              hearing new ideas and learning
            </span>{" "}
            something new.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={listVariants}
        className="flex flex-col divide-y divide-white/10 md:divide-none w-full md:w-[28rem] md:gap-y-6 md:pt-3 text-left items-start"
      >
        <motion.div
          variants={itemVariants}
        >
          <Tooltip open={isEmailTooltipOpen} onOpenChange={() => {}}>
            <TooltipTrigger
              type="button"
              onClick={copyEmail}
              data-cursor="grow"
              className="inter text-[#DEDCDC] text-lg sm:text-xl md:text-2xl md:leading-none transition-all duration-300 active:scale-95 hover:scale-110 py-3 md:py-1 w-full md:w-fit block cursor-pointer bg-transparent border-none"
            >
              email
            </TooltipTrigger>
            <TooltipContent className="inter">copied email</TooltipContent>
          </Tooltip>
        </motion.div>
        <motion.a
          variants={itemVariants}
          href="https://www.linkedin.com/in/jeevansanchez/"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="grow"
          className="inter text-[#DEDCDC] text-lg sm:text-xl md:text-2xl transition-all duration-300 active:scale-95 hover:scale-110 py-3 md:py-1 w-full md:w-fit block cursor-pointer"
        >
          linkedin
        </motion.a>
        <motion.a
          variants={itemVariants}
          href="https://github.com/jeevan9s"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="grow"
          className="inter text-[#DEDCDC] text-lg sm:text-xl md:text-2xl transition-all duration-300 active:scale-95 hover:scale-110 py-3 md:py-1 w-full md:w-fit block cursor-pointer"
        >
          github
        </motion.a>
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-x-3 py-3 md:py-1"
        >
          {(["hw-resume", "sw-resume"] as const).map((type, index) => (
            <div key={type} className="flex items-center gap-x-3">
              {index > 0 && <span className="inter text-[#DEDCDC]/50">/</span>}
              <motion.a
                whileHover={{ scale: 1.1 }}
                href={resumeLinks[type]}
                target="_blank"
                rel="noreferrer"
                onClick={() => setResumeType(type)}
                data-cursor="grow"
                className={`inter text-lg sm:text-xl md:text-2xl transition-all duration-300 active:scale-95 cursor-pointer ${
                  resumeType === type ? "text-[#DEDCDC]" : "text-[#DEDCDC]/50"
                }`}
              >
                {type === "hw-resume" ? "hw resume" : "fw resume"}
              </motion.a>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={viewport}
        transition={revealTransition}
        className="col-span-full w-full h-px bg-white/10 origin-center"
      />
    </div>
  );
}