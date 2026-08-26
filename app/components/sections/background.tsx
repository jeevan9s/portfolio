// about section

import {motion} from "framer-motion"

export default function Background() {
  return (
    <div className="flex flex-col md:flex-row flex-1 bg-transparent md:justify-between md:items-start items-center gap-y-10 justify-center min-h-screen p-8 md:p-12">
      <div className="flex flex-col gap-y-5 max-w-[100rem] md:max-w-350">
        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{
            duration: 1.8,
            ease: [0.16, 1, 0.3, 1],
            opacity: { duration: 0.6, ease: "linear", delay: 0.4 },
            delay: 1,
          }}
          style={{
            willChange: "transform, opacity, filter",
          }}
          className="md:mt-25"
        >
        </motion.div>
        background
      </div>
    </div>
  );
}
