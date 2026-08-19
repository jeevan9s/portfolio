"use client";

// floating navbar component
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScrollStore } from "@/lib/scrollStore";

interface navbarProps {
  currPage: string;
}

const hidden = ["/project"];

export default function Navbar({ currPage }: navbarProps) {
  const pathname = usePathname();
  const [time, setTime] = useState<string | null>(null);
  const activeSection = useScrollStore((s) => s.section);

  if (hidden.includes(pathname)) return null; 

  useEffect(() => {
    setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));

    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getLink = (path: string) => {
    const isActive = currPage === path || activeSection === path;
    return `inter text-md transition-all duration-300 inline-block transform hover:scale-105 ${
      isActive ? "nav-theme-active scale-105 font-medium" : "nav-theme-muted hover:nav-theme-active"
    }`;
  };

  return (
    <div className="flex flex-row nav-theme-bg fixed top-0 left-0 right-0 w-full z-50 items-center justify-between px-6 py-4 transition-colors duration-300">
      <div className="hidden md:flex flex-row items-center gap-x-3 flex-1">
        <p className="inter text-md nav-theme-active font-medium whitespace-nowrap">Jeevan Sanchez</p>
        <p className="inter text-md nav-theme-muted whitespace-nowrap">Embedded Systems Engineer</p>
      </div>

      <div className="hidden md:flex flex-1 justify-center">
        <p className="inter text-md nav-theme-muted text-center whitespace-nowrap">{time} ET</p>
      </div>

      <div className="flex flex-row items-center justify-end flex-1">
        <div className="hidden md:flex flex-row items-center gap-x-12 pt-0.5">
          <Link href="/work" className={getLink("work")}>Work</Link>
          <Link href="/about" className={getLink("about")}>About</Link>
          <Link href="/connect" className={getLink("connect")}>Connect</Link>
          <Link href="/gallery" className={getLink("gallery")}>Gallery</Link>
        </div>

        <div className="md:hidden">
          <button onClick={() => {}} className="text-sm bg-transparent border-none nav-theme-muted inter cursor-pointer hover:nav-theme-active">
            menu
          </button>
        </div>
      </div>
    </div>
  );
}
