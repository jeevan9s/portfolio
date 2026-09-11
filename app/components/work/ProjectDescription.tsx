"use client";

import { useState } from "react";

type ProjectDescriptionProps = {
  description: string;
  details?: string;
};

function paragraphs(value: string) {
  return value.split("\n\n").filter(Boolean);
}

function renderParagraph(paragraph: string) {
  const acronymStart = "Perception-Enabled Navigation";
  const acronymEnd = "General Utility Intelligence";
  const acronym = `${acronymStart} and ${acronymEnd}`;
  const acronymIndex = paragraph.indexOf(acronym);

  if (acronymIndex !== -1) {
    return (
      <>
        {paragraph.slice(0, acronymIndex)}
        <strong className="font-semibold text-[#1E1E1E]">{acronymStart}</strong>
        {" and "}
        <strong className="font-semibold text-[#1E1E1E]">{acronymEnd}</strong>
        {paragraph.slice(acronymIndex + acronym.length)}
      </>
    );
  }

  const collaborator = "Tristan Alderson";
  const collaboratorIndex = paragraph.indexOf(collaborator);

  if (collaboratorIndex !== -1) {
    const linkClass = "text-[#1E1E1E] underline decoration-black/20 underline-offset-4 hover:decoration-black/45";
    return (
      <>
        {paragraph.slice(0, collaboratorIndex)}
        {collaborator}
        {" ("}
        <a href="https://github.com/tristanalderson" target="_blank" rel="noreferrer" className={linkClass}>GitHub</a>
        {", "}
        <a href="https://www.linkedin.com/in/tristanalderson/" target="_blank" rel="noreferrer" className={linkClass}>LinkedIn</a>
        {")"}
        {paragraph.slice(collaboratorIndex + collaborator.length)}
      </>
    );
  }

  return paragraph;
}

export default function ProjectDescription({ description, details }: ProjectDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const descriptionParagraphs = paragraphs(description);
  const detailParagraphs = paragraphs(details ?? "");
  const introParagraphs = [descriptionParagraphs[0] ?? description, ...(detailParagraphs.length > 0 ? [detailParagraphs[0]] : [])];
  const extended = [...descriptionParagraphs.slice(1), ...detailParagraphs.slice(1)];

  return (
    <div className="inter mt-5 max-w-xl text-base leading-relaxed text-[#5F5F5F]">
      {introParagraphs.map((paragraph, index) => (
        <p key={`${index}-${paragraph}`} className={index > 0 ? "mt-4" : undefined}>
          {renderParagraph(paragraph)}
        </p>
      ))}
      {extended.length > 0 && (
        <>
          <div className={`mt-4 space-y-4 ${isExpanded ? "block" : "hidden md:block"}`}>
            {extended.map((paragraph, index) => (
              <p key={`${index}-${paragraph}`}>{renderParagraph(paragraph)}</p>
            ))}
          </div>
          <button
            type="button"
            aria-expanded={isExpanded}
            onClick={() => setIsExpanded((expanded) => !expanded)}
            className="mt-3 text-sm text-[#1E1E1E] underline decoration-black/20 underline-offset-4 md:hidden"
          >
            {isExpanded ? "read less" : "read more"}
          </button>
        </>
      )}
    </div>
  );
}
