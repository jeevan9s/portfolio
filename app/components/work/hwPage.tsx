import Link from "next/link";
import BoardViewer from "./BoardViewer";
import ProjectCarousel from "./ProjectCarousel";

interface HardwareProject {
  title: string;
  description: string;
  mcu: string;
  layers: number;
  size: string;
  modelPath?: string;
}

export default function HardwarePage({ project }: { project: HardwareProject }) {
  const slides = [
    { label: "3D viewer", content: <BoardViewer modelPath={project.modelPath} /> },
    { label: "build overview", content: <div className="flex min-h-[20rem] items-center justify-center p-8 text-center inter text-xl text-black/65 sm:min-h-[25rem]">A compact embedded platform designed around {project.mcu}.</div> },
    { label: "board specifications", content: <dl className="grid min-h-[20rem] content-center grid-cols-2 gap-8 p-8 sm:min-h-[25rem] sm:grid-cols-4"><div><dt className="inter text-xs uppercase text-black/45">MCU</dt><dd className="inter mt-2 text-2xl">{project.mcu}</dd></div><div><dt className="inter text-xs uppercase text-black/45">Layers</dt><dd className="inter mt-2 text-2xl">{project.layers}</dd></div><div><dt className="inter text-xs uppercase text-black/45">Size</dt><dd className="inter mt-2 text-2xl">{project.size}</dd></div></dl> },
  ];

  return (
    <article className="min-h-screen bg-[#EFEFEF] px-6 py-10 text-[#1E1E1E] sm:px-8 md:px-12">
      <Link href="/#work" className="inter text-sm text-[#878787] hover:text-[#1E1E1E]">
        back to work
      </Link>
      <div className="mx-auto flex w-full max-w-[100rem] flex-col gap-y-8 pt-24 md:pt-32">
        <div>
          <p className="inter mb-3 text-sm uppercase tracking-[0.18em] text-[#878787]">hardware</p>
          <h1 className="montserrat text-5xl md:text-8xl">{project.title}</h1>
          <p className="inter mt-6 max-w-2xl text-lg leading-relaxed text-[#5F5F5F]">{project.description}</p>
        </div>
        <ProjectCarousel slides={slides} />
      </div>
    </article>
  );
}
