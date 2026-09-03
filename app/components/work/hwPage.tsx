import Link from "next/link";

interface HardwareProject {
  title: string;
  description: string;
  mcu: string;
  layers: number;
  size: string;
  modelPath?: string;
}

export default function HardwarePage({ project }: { project: HardwareProject }) {
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
        <dl className="grid max-w-2xl grid-cols-2 gap-4 border-t border-[#C9C9C9] pt-6 sm:grid-cols-4">
          <div><dt className="inter text-xs uppercase text-[#878787]">MCU</dt><dd className="inter mt-1 text-lg">{project.mcu}</dd></div>
          <div><dt className="inter text-xs uppercase text-[#878787]">Layers</dt><dd className="inter mt-1 text-lg">{project.layers}</dd></div>
          <div><dt className="inter text-xs uppercase text-[#878787]">Size</dt><dd className="inter mt-1 text-lg">{project.size}</dd></div>
          <div><dt className="inter text-xs uppercase text-[#878787]">Model</dt><dd className="inter mt-1 text-lg">{project.modelPath ? "3D" : "Concept"}</dd></div>
        </dl>
      </div>
    </article>
  );
}
