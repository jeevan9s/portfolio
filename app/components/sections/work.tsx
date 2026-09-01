import { useRef, useLayoutEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HardwareCard from "../work/hwCard";
import FirmwareCard from "../work/fwCard";

gsap.registerPlugin(ScrollTrigger);

type Project =
  | { type: "hardware"; id: string; title: string; description: string; mcu: string; layers: number; size: string; image?: string; modelPath?: string; }
  | { type: "firmware"; id: string; title: string; description: string; image?: string; };

const projects: Project[] = [
  { type: "hardware", id: "proj-1", title: "Penguin", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", mcu: "STM32H7", layers: 4, size: "42 × 28mm", modelPath: "/projs/models/penguin_controller.glb", },
  { type: "hardware", id: "proj-2", title: "Avionics Sensor & Control Modules", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", mcu: "STM32H7", layers: 4, size: "42 × 28mm" },
  { type: "hardware", id: "proj-3", title: "Homectrl", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", mcu: "STM32H7", layers: 4, size: "42 × 28mm",  modelPath: "/projs/models/homectrl_controller.glb", },
  { type: "firmware", id: "proj-4", title: "Avionics Libraries", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { type: "firmware", id: "proj-5", title: "Motion Library", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { type: "firmware", id: "proj-6", title: "Calmeca", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
];

export default function Work() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const xTranslate = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".work-card", track);

      gsap.fromTo(cards, 
        { opacity: 0, y: 40, scale: 0.95, filter: "blur(10px)" },
        {
          opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
          duration: 1, ease: "power3.out", stagger: 0.08,
          scrollTrigger: { 
            trigger: container, 
            start: "top 75%", 
            toggleActions: "play none none reverse" 
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative h-[250vh] w-full bg-transparent min-h-screen" 
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden p-8 md:p-12">
        <div className="flex flex-col gap-y-3 max-w-[100rem] mb-8">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-[3rem] text-[#1E1E1E] md:text-[5.25rem] montserrat">selected works</h1>
            <h3 className="text-[1.5rem] text-[#878787] md:text-[2rem] inter font-light">
              an index of builds
            </h3>
          </motion.div>
        </div>

        <div className="w-full overflow-hidden">
          <motion.div 
            ref={trackRef} 
            style={{ x: xTranslate }}
            className="flex flex-row items-center gap-x-10 md:gap-x-16 py-6 w-max will-change-transform"
          >
            {projects.map((project) => (
              <div key={project.id} className="work-card shrink-0">
                {project.type === "hardware" ? (
                  <HardwareCard {...project} />
                ) : (
                  <FirmwareCard {...project} />
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}