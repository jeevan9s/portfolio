"use client";

// landing page
import { motion } from "framer-motion";


export default function Hero() {
  return (
    <div  className="flex flex-col md:flex-row flex-1 bg-transparent md:justify-between md:items-start items-start gap-y-10 justify-center min-h-screen p-8 md:p-12 xl:p-16 2xl:p-20">
      <div className="flex flex-col gap-y-5 max-w-[100rem] md:max-w-350 md:mt-5">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
            opacity: { duration: 0.6, ease: "linear", delay: 0.2 },
            delay: 0.2,
          }}
          style={{
            willChange: "transform, opacity",
          }}
        >
          <h1 className="text-[2rem] nav-theme-active md:text-[4rem] md:leading-[6rem] 2xl:text-[6.15rem] 2xl:leading-[7.25rem] montserrat">
            Developing hardware and firmware for embedded platforms.
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
            opacity: { duration: 0.6, ease: "linear", delay: 0.5},
            delay: 0.5,
          }}
          style={{
            willChange: "opacity",
          }}
        >
        </motion.div>
      </div>

      <div className="flex flex-col md:gap-y-3 gap-y-5 md:max-w-85 max-w-65 md:bottom-30 md:right-40 md:absolute">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
            opacity: { duration: 0.6, ease: "linear"},
          }}
          style={{
            willChange: "transform, opacity",
          }}
        >
          <p className="nav-theme-active inter md:text-[1.2rem] spaced-paragraph">
            Hey I&apos;m Jeevan.
            I build hardware and write code as an outlet for creativity, curiosity, and utility.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
            opacity: { duration: 0.6, ease: "linear" },
            delay: 0.5,
          }}
          style={{
            willChange: "opacity",
          }}
          className="opacity-0"
        >
          <p className="text-[#9C9A9A] inter md:text-[1.2rem]">
            based in Toronto, CA.
          </p>{" "}
        </motion.div>
      </div>
    </div>
  );
}
