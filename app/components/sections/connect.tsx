import { motion, type Variants } from "framer-motion";

const revealTransition = { duration: 0.7, ease: [0.16, 1, 0.3, 1] } as const;
const viewport = { once: false, amount: 0.2, margin: "0px 0px -5% 0px" } as const;

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
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
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] flex-1 bg-trandsparent gap-y-10 md:gap-x-12 items-start justify-start md:justify-between h-112 p-6 sm:p-8 md:p-12">
      <div className="flex flex-col gap-y-4 w-full md:max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={viewport}
          transition={revealTransition}
          style={{
            willChange: "transform, opacity, filter",
          }}
        >
          <h1 className="text-[2.25rem] leading-[1.1] text-[#FFFFFF] sm:text-[3rem] md:text-[5.25rem] md:leading-none montserrat text-left">
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
          <p className="inter text-base sm:text-lg md:text-xl text-[#969696] leading-relaxed text-left">
            reach out to me. I&apos;m always interested in
            <span className="inter text-base sm:text-lg md:text-xl text-[#DEDCDC]">
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
        className="flex flex-col divide-y divide-white/10 md:divide-none w-full md:w-[28rem] md:gap-y-6 md:pt-3 text-left items-start"
      >
        <motion.a
          variants={itemVariants}
          href="mailto:jeevansanchez42@gmail.com"
          data-cursor="grow"
          className="inter text-[#DEDCDC] text-lg sm:text-xl md:text-2xl md:leading-none transition-all duration-300 active:scale-95 hover:scale-110 py-3 md:py-1 w-full md:w-fit block"
        >
          email
        </motion.a>
        <motion.a
          variants={itemVariants}
          href="https://www.linkedin.com/in/jeevansanchez/"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="grow"
          className="inter text-[#DEDCDC] text-lg sm:text-xl md:text-2xl transition-all duration-300 active:scale-95 hover:scale-110 py-3 md:py-1 w-full md:w-fit block cursor-pointer"
        >
          linkedin
        </motion.a>
        <motion.a
          variants={itemVariants}
          href="https://github.com/jeevan9s"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="grow"
          className="inter text-[#DEDCDC] text-lg sm:text-xl md:text-2xl transition-all duration-300 active:scale-95 hover:scale-110 py-3 md:py-1 w-full md:w-fit block cursor-pointer"
        >
          github
        </motion.a>
        <motion.button
          variants={itemVariants}
          data-cursor="grow"
          className="inter text-[#DEDCDC] text-lg sm:text-xl md:text-2xl transition-all duration-300 active:scale-95 hover:scale-110 py-3 md:py-1 w-full md:w-fit text-left cursor-pointer"
        >
          resume
        </motion.button>
      </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              className="col-span-full w-full h-px bg-white/10 origin-center"
            />
    </div>
  );
}