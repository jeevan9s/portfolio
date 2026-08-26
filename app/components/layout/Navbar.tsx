"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScrollStore } from "@/lib/scrollStore";
import { sections } from "@/lib/sections";
import { motion } from "framer-motion";

interface navbarProps {
  currPage: string;
  theme: "light" | "dark";
}

const hidden = ["/project"];

export default function Navbar({ theme }: navbarProps) {
  const pathname = usePathname();
  const [time, setTime] = useState<string | null>(null);
  const activeSection = useScrollStore((s) => s.section);

  useEffect(() => {
    setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));

    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (hidden.includes(pathname)) return null;

  const getLink = (id: string) => {
    const isActive = activeSection === id;
    return `inter text-base inline-block ${
      isActive ? "nav-theme-active font-medium" : "nav-theme-muted hover:nav-theme-active"
    }`;
  };

  const navSections = sections.filter((sec) => sec.id !== "hero");

  return (
    <motion.div
      data-theme={theme}
      className="flex flex-row w-full items-center justify-between px-6 py-4 bg-transparent"
      style={{ willChange: "transform" }}
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
            <motion.div key={sec.id} whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
              <Link href={`#${sec.id}`} className={getLink(sec.id)}>
                {sec.id.charAt(0).toUpperCase() + sec.id.slice(1)}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="md:hidden">
          <motion.button whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 25 }} onClick={() => {}} className="text-sm bg-transparent border-none nav-theme-muted inter cursor-pointer hover:nav-theme-active transition-colors duration-300">
            menu
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}