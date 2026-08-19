// selected work page

import {motion} from "framer-motion"

export default function Work() {
  return (
    <div className="flex flex-col md:flex-row flex-1 bg-[#F5F5F5] md:justify-between md:items-start items-center gap-y-10 justify-center min-h-screen p-8 md:p-12">
      <div className="flex flex-col gap-y-5 max-w-[100rem] md:max-w-350">
        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 1.8,
            ease: [0.16, 1, 0.3, 1],
            opacity: { duration: 0.6, ease: "linear", delay: 0.4 },
            delay: 0.4,
          }}
          style={{
            willChange: "transform, opacity, filter",
          }}
          className="md:mt-25"
        >
          <h1 className="text-[3rem] text-[#1E1E1E] md:text-[5.25rem] montserrat">
            selected works
          </h1>

          <h3 className="text-[2rem] text-[#878787] md:text-[2.5rem] inter font-light">
            an index of builds
          </h3>
        </motion.div>
      </div>
    </div>
  );
}
