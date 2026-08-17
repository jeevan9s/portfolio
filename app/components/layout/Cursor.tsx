"use client";

// custom rounded square cursor

import { useEffect, useRef } from "react";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      scale: 0,
    });

    const xTo = gsap.quickTo(cursor, "x", {
      duration: 0.1,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(cursor, "y", {
      duration: 0.1,
      ease: "power3.out",
    });

    const moveCursor = (e: MouseEvent): void => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.2,
        overwrite: "auto",
      });

      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="max-lg:hidden fixed top-0 left-0 w-4 h-4 bg-white rounded-sm pointer-events-none z-[9999] mix-blend-exclusion"
    />
  );
};

export default Cursor;
