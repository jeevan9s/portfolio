"use client";

// floating footer component
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";

import { motion, useAnimationControls } from "framer-motion";

interface footerProps {
  theme: "light" | "dark";
}

export default function Footer({ theme }: footerProps) {
  const [selectedResume, setSelectedResume] = useState<"hw" | "sw">("hw");
  const copyAnimation = useAnimationControls();

  const handleCopyEmail = () => {
    void navigator.clipboard.writeText("jeevansanchez42@gmail.com");
    void copyAnimation.start({
      y: [0, -10, 0],
      transition: { duration: 0.35, ease: [0.1, 0.8, 0.3, 1] },
    });
  };

  return (
    <div
      data-theme={theme}
      className="nav-theme-bg flex flex-row w-full items-center justify-between px-6 py-4"
    >
      <div className="hidden md:flex flex-row items-center gap-x-2 flex-1">
        <motion.button
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          onClick={() => {
            setSelectedResume("hw");
            window.open("/hw-resume.pdf", "_blank");
          }}
          className={`inter text-base bg-transparent border-none p-0 cursor-pointer ${
            selectedResume === "hw"
              ? "nav-theme-active"
              : "nav-theme-muted hover:nav-theme-active"
          }`}
        >
          hw resume
        </motion.button>

        <span className="nav-theme-muted">•</span>

        <motion.button
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          onClick={() => {
            setSelectedResume("sw");
            window.open("/sw-resume.pdf", "_blank");
          }}
          className={`inter text-base bg-transparent border-none p-0 cursor-pointer ${
            selectedResume === "sw"
              ? "nav-theme-active"
              : "nav-theme-muted hover:nav-theme-active"
          }`}
        >
          sw resume
        </motion.button>
      </div>

      <div className="flex flex-row items-center justify-end flex-1">
        <div className="hidden md:flex flex-row items-center gap-x-10 pt-0.5">
          <Tooltip>
            <motion.div
              whileHover={{ scale: 1.25 }}
              animate={copyAnimation}
              transition={{
                scale: {
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                  duration: 0.5,
                },
              }}
              className="relative z-10 w-4 h-4"
            >
              <TooltipTrigger
                onClick={handleCopyEmail}
                className="absolute inset-0 w-full h-full bg-[#878787] rounded-sm cursor-pointer border-none block"
              />
            </motion.div>
            <TooltipContent
              data-theme={theme}
              side="top"
              className="inter text-xs bg-transparent border-none shadow-none nav-theme-active"
            >
              copy email
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <motion.div
              whileHover={{ scale: 1.25 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative z-10 w-4 h-4"
            >
              <TooltipTrigger
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/jeevansanchez/",
                    "_blank",
                  )
                }
                className="absolute inset-0 w-full h-full bg-[#4B4A4A] rounded-sm cursor-pointer border-none"
              />
            </motion.div>
            <TooltipContent
              data-theme={theme}
              side="top"
              className="inter text-xs bg-transparent border-none shadow-none nav-theme-active"
            >
              linkedin
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <motion.div
              whileHover={{ scale: 1.25 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative z-10 w-4 h-4"
            >
              <TooltipTrigger
                onClick={() =>
                  window.open("https://github.com/jeevan9s", "_blank")
                }
                className="absolute inset-0 w-full h-full bg-[#111111] rounded-sm cursor-pointer border-none"
              />
            </motion.div>
            <TooltipContent
              data-theme={theme}
              side="top"
              className="inter text-xs bg-transparent border-none shadow-none nav-theme-active"
            >
              github
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
