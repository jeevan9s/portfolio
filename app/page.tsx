"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useScrollStore } from "@/lib/scrollStore";
import Hero from "./components/sections/hero";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

export default function Page() {
  const section = useScrollStore((s) => s.section);

  return (
    <>
      <AnimatePresence>
        {section === "work" && (
          <motion.div
            key="navbar"
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 inset-x-0 z-50"
          >
            <Navbar currPage={section} />
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <Hero />
      </main>

      <AnimatePresence>
        {section === "work" && (
          <motion.div
            key="footer"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}