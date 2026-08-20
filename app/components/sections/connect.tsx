import { motion } from "framer-motion";

// contact section
export default function Connect() {
  return (
    <div className="flex flex-col md:flex-row flex-1 bg-transparent md:justify-between md:items-start items-center gap-y-10 justify-center h-auto p-8 md:p-12">
      <div className="flex flex-col gap-y-5 w-full md:max-w-2xl">
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
        >
          <h1 className="text-[2rem] text-[#FFFFFF] md:text-[5.25rem] md:leading-none montserrat">
            let&apos;s connect.
          </h1>
        </motion.div>

        <div className="flex flex-col w-full md:max-w-[30rem]">
          <p className="inter text-[1rem] md:text-xl text-[#969696] leading-tight text-center md:text-left">
            reach out to me. I&apos;m always
            <span className="inter text-[1rem] md:text-xl text-[#DEDCDC]">
              {" "}
              interested in hearing new ideas and learning
            </span>{" "}
            something new.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-y-5 justify-start w-full md:w-[28rem] md:self-start">
        <p className="inter text-[#DEDCDC] md:text-2xl md:leading-none">
          jeevansanchez42@gmail.com
        </p>
        <p className="inter text-[#DEDCDC] md:text-2xl">LinkedIn</p>
        <p className="inter text-[#DEDCDC] md:text-2xl">GitHub</p>
        <p className="inter text-[#DEDCDC] md:text-2xl">Resume</p>
      </div>
    </div>
  );
}
