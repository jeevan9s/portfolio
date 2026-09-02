"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useScrollStore } from "@/lib/scrollStore";
import { scrollToSection } from "@/lib/lenisController";
import { sections } from "@/lib/sections";
import { motion } from "framer-motion";

interface navbarProps {
  theme: "light" | "dark";
  currPage?: string;
}

const hidden = ["/project"];

export default function Navbar({ theme, currPage }: navbarProps) {
  const pathname = usePathname();
  const [time, setTime] = useState<string | null>(null);
  const storeSection = useScrollStore((s) => s.section);
  const activeSection = currPage ?? storeSection;

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    };

    const initialTimer = window.setTimeout(updateTime, 0);
    const timer = setInterval(() => {
      updateTime();
    }, 1000);
    return () => {
      window.clearTimeout(initialTimer);
      clearInterval(timer);
    };
  }, []);

  if (hidden.includes(pathname)) return null;

  const getLink = (id: string) => {
    const isActive = activeSection === id;
    return `inter text-base inline-block ${
      isActive ? "nav-theme-active font-medium" : "nav-theme-muted hover:nav-theme-active"
    }`;
  };

  const navSections = sections.filter((sec) => sec.id !== "hero" && sec.displayNav !== false);

  return (
    <div
      data-theme={theme}
      className="nav-theme-bg flex flex-row w-full items-center justify-between px-6 py-4"
    >
      <div className="hidden md:flex flex-row items-baseline gap-x-6 flex-1">
        <div className="flex flex-col">
          <p className="inter text-base nav-theme-active font-medium whitespace-nowrap transition-colors duration-300">
            Jeevan Sanchez
          </p>
          <p className="inter text-xs nav-theme-muted whitespace-nowrap transition-colors duration-300">
            {time} ET
          </p>
        </div>
        <p className="inter text-base nav-theme-muted whitespace-nowrap transition-colors duration-300">
          Embedded Systems Engineer
        </p>
      </div>

      <div className="hidden md:flex flex-1 justify-center"></div>

      <div className="flex flex-row items-center justify-end flex-1">
        <div className="hidden md:flex flex-row items-center gap-x-12 pt-0.5">
          {navSections.map((sec) => (
            <motion.div
              key={sec.id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <a
                href={`#${sec.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(sec.id);
                  window.history.replaceState(null, "", `#${sec.id}`);
                }}
                className={getLink(sec.id)}
              >
                {sec.id.charAt(0).toUpperCase() + sec.id.slice(1)}
              </a>
            </motion.div>
          ))}
        </div>

        <div className="md:hidden">
          <motion.button
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={() => {}}
            className="text-sm bg-transparent border-none nav-theme-muted inter cursor-pointer hover:nav-theme-active transition-colors duration-300"
          >
            menu
          </motion.button>
        </div>
      </div>
    </div>
  );
}
