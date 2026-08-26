import { motion, type Variants } from "framer-motion";

// contact section
const revealTransition = { duration: 0.7, ease: [0.16, 1, 0.3, 1] } as const;
const viewport = { once: false, amount: 0.3, margin: "0px 0px -10% 0px" } as const;

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: revealTransition,
  },
};

export default function Connect() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] flex-1 bg-transparent gap-y-10 md:gap-x-12 items-center md:items-start justify-center md:justify-between h-auto p-8 md:p-12">
      <div className="flex flex-col gap-y-5 w-full md:max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={viewport}
          transition={revealTransition}
          style={{
            willChange: "transform, opacity, filter",
          }}
        >
          <h1 className="text-[2rem] text-[#FFFFFF] md:text-[5.25rem] md:leading-none montserrat">
            let&apos;s connect.
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={viewport}
          transition={{ ...revealTransition, delay: 0.1 }}
          className="flex flex-col w-full md:max-w-[30rem]"
        >
          <p className="inter text-[1rem] md:text-xl text-[#969696] leading-tight text-center md:text-left cursor-pointer">
            reach out to me. I&apos;m always interested in
            <span className="inter text-[1rem] md:text-xl text-[#DEDCDC]">
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
        className="flex flex-col gap-y-8 justify-start w-full md:w-[28rem] md:pt-3"
      >
        <motion.a
          variants={itemVariants}
          href="mailto:jeevansanchez42@gmail.com"
          data-cursor="grow"
          className="inter text-[#DEDCDC] md:text-2xl md:leading-none transition-all duration-300 hover:scale-105 w-fit"
        >
          Email
        </motion.a>
        <motion.p
          variants={itemVariants}
          onClick={() =>
            window.open("https://www.linkedin.com/in/jeevansanchez/", "_blank")
          }
          data-cursor="grow"
          className="inter text-[#DEDCDC] md:text-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
        >
          LinkedIn
        </motion.p>
        <motion.p
          variants={itemVariants}
          onClick={() => window.open("https://github.com/jeevan9s", "_blank")}
          data-cursor="grow"
          className="inter text-[#DEDCDC] md:text-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
        >
          GitHub
        </motion.p>
        <motion.p
          variants={itemVariants}
          data-cursor="grow"
          className="inter text-[#DEDCDC] md:text-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
        >
          Resume
        </motion.p>
      </motion.div>
    </div>
  );
}