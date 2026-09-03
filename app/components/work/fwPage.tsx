import Link from "next/link";

interface FirmwareProject {
  title: string;
  description: string;
  language: string;
  framework: string;
  protocol?: string;
  apis?: string;
}

export default function FirmwarePage({ project }: { project: FirmwareProject }) {
  return (
    <article className="min-h-screen bg-[#1D1D1D] px-6 py-10 text-white sm:px-8 md:px-12">
      <Link href="/#work" className="inter text-sm text-white/50 hover:text-white">
        back to work
      </Link>
      <div className="mx-auto flex w-full max-w-[100rem] flex-col gap-y-8 pt-24 md:pt-32">
        <div>
          <p className="inter mb-3 text-sm uppercase tracking-[0.18em] text-white/50">firmware</p>
          <h1 className="montserrat text-5xl md:text-8xl">{project.title}</h1>
          <p className="inter mt-6 max-w-2xl text-lg leading-relaxed text-white/60">{project.description}</p>
        </div>
        <dl className="grid max-w-2xl grid-cols-2 gap-4 border-t border-white/15 pt-6 sm:grid-cols-4">
          <div><dt className="inter text-xs uppercase text-white/45">Language</dt><dd className="inter mt-1 text-lg">{project.language}</dd></div>
          <div><dt className="inter text-xs uppercase text-white/45">Framework</dt><dd className="inter mt-1 text-lg">{project.framework}</dd></div>
          {project.protocol && <div><dt className="inter text-xs uppercase text-white/45">Protocol</dt><dd className="inter mt-1 text-lg">{project.protocol}</dd></div>}
          {project.apis && <div><dt className="inter text-xs uppercase text-white/45">APIs</dt><dd className="inter mt-1 text-lg">{project.apis}</dd></div>}
        </dl>
      </div>
    </article>
  );
}
