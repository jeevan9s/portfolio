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

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.3, ease: "power3.out" });

    let isHovering = false;

    const moveCursor = (e: MouseEvent): void => {
      if (!isHovering) {
        gsap.to(cursor, { scale: 1, duration: 0.3, overwrite: "auto" });
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-cursor='grow']")) {
        isHovering = true;
        gsap.to(cursor, {
          scale: 2,
          duration: 0.3,
          overwrite: "auto",
        });
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-cursor='grow']")) {
        isHovering = false;
        gsap.to(cursor, {
          scale: 1,
          duration: 0.3,
          overwrite: "auto",
        });
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseEnter); 
    window.addEventListener("mouseout", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseEnter);
      window.removeEventListener("mouseout", handleMouseLeave);
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
