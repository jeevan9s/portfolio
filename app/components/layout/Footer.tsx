"use client";

// floating footer component
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";

import { motion } from "framer-motion";

const MotionTooltipTrigger = motion.create(TooltipTrigger);

export default function Footer() {
  const [selectedResume, setSelectedResume] = useState<"hw" | "sw">("hw");
  const [bounceCount, setBounceCount] = useState(0);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("jeevansanchez42@gmail.com");
    setBounceCount((prev) => prev + 1);
  };

  return (
    <div className="flex flex-row nav-theme-bg fixed bottom-0 left-0 right-0 w-screen z-50 items-center justify-between px-6 py-4 transition-colors duration-300">
      <div className="hidden md:flex flex-row items-center gap-x-2 flex-1">
        <button
          onClick={() => {
            setSelectedResume("hw");
            window.open("/hw-resume.pdf", "_blank");
          }}
          className={`inter text-md transition-all duration-300 hover:scale-105 bg-transparent border-none p-0 ${
            selectedResume === "hw"
              ? "nav-theme-active"
              : "nav-theme-muted hover:nav-theme-active"
          }`}
        >
          hw resume
        </button>

        <span className="nav-theme-muted">•</span>

        <button
          onClick={() => {
            setSelectedResume("sw");
            window.open("/sw-resume.pdf", "_blank");
          }}
          className={`inter text-md transition-all duration-300 hover:scale-105 bg-transparent border-none p-0 ${
            selectedResume === "sw"
              ? "nav-theme-active"
              : "nav-theme-muted hover:nav-theme-active"
          }`}
        >
          sw resume
        </button>
      </div>

      <div className="flex flex-row items-center justify-end flex-1">
        <div className="hidden md:flex flex-row items-center gap-x-10 pt-0.5">
          <Tooltip>
            <MotionTooltipTrigger
              onClick={handleCopyEmail}
              key={bounceCount}
              animate={bounceCount > 0 ? { y: [0, -80, 0] } : { y: 0 }}
              transition={{ duration: 0.35, ease: [0.1, 0.8, 0.3, 1] }}
              className="w-4 h-4 bg-[#878787] rounded-sm transition-all duration-300 hover:scale-105 cursor-pointer border-none block"
            />
            <TooltipContent
              side="top"
              className="inter text-xs bg-transparent border-none shadow-none text-white"
            >
              copy email
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/jeevansanchez/",
                  "_blank",
                )
              }
              className="w-4 h-4 bg-[#4B4A4A] rounded-sm transition-all duration-300 hover:scale-105 cursor-pointer border-none"
            />
            <TooltipContent
              side="top"
              className="inter text-xs bg-transparent border-none shadow-none text-white"
            >
              li
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              onClick={() =>
                window.open("https://github.com/jeevan9s", "_blank")
              }
              className="w-4 h-4 bg-[#111111] rounded-sm transition-all duration-300 hover:scale-105 cursor-pointer border-none"
            />
            <TooltipContent
              side="top"
              className="inter text-xs bg-transparent border-none shadow-none text-white"
            >
              git
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
