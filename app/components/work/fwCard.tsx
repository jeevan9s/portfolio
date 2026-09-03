import {
  CARD_WIDTH,
  CARD_ASPECT,
  CARD_TEXT_WRAPPER,
  CARD_TITLE,
  CARD_DESCRIPTION,
} from "./cardTypes";
import Link from "next/link";

export interface FirmwareSpecItem {
  label: string;
  value: string;
  percentage?: number;
}

interface FirmwareCardProps {
  id: string;
  title: string;
  description: string;
  specs: FirmwareSpecItem[];
  language: string;
  framework: string;
  protocol?: string;
  apis?: string;
}

export default function FirmwareCard({
  id,
  title,
  description,
  specs,
  language,
  framework,
  protocol,
  apis,
}: FirmwareCardProps) {
  return (
    <Link href={`/project/${id}`} className={`shrink-0 ${CARD_WIDTH} flex flex-col cursor-pointer`}>
      <div
        className={`relative w-full ${CARD_ASPECT} rounded-xl bg-[#1E1E1E] overflow-hidden transition-transform duration-300 hover:scale-[0.98] flex flex-col justify-between p-4 sm:p-5`}
      >
        <div className="relative z-10 flex flex-col gap-y-3 text-white">
          <span className="inter text-[0.6rem] uppercase tracking-[0.18em] text-white/45">
            specs
          </span>
          <div className="flex flex-col gap-y-1.5 border-l border-white/20 pl-3">
            <div className="flex items-center justify-between gap-x-4">
              <span className="inter text-xs text-white/45">language</span>
              <span className="inter text-xs font-medium text-white">{language}</span>
            </div>
            <div className="flex items-center justify-between gap-x-4">
              <span className="inter text-xs text-white/45">framework</span>
              <span className="inter text-xs font-medium text-white">{framework}</span>
            </div>
            {(protocol || apis) && (
              <div className="flex items-center justify-between gap-x-4">
                <span className="inter text-xs text-white/45">{protocol ? "protocol" : "APIs"}</span>
                <span className="inter text-xs font-medium text-white">{protocol ?? apis}</span>
              </div>
            )}
          </div>
        </div>

        <div className="relative z-15 mt-auto pt-4 border-t border-white/10 flex flex-col gap-y-2.5">
          {specs.map((spec, index) => (
            <div key={index} className="flex flex-col gap-y-1">
              <div className="flex items-center justify-between text-[0.65rem] sm:text-[0.7rem] uppercase tracking-wide">
                <span className="inter text-[#9B9B9B]">{spec.label}</span>
                <span className="inter text-white font-medium">{spec.value}</span>
              </div>
              {spec.percentage !== undefined && (
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-white/80 h-full rounded-full transition-all duration-500"
                    style={{ width: `${spec.percentage}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className={CARD_TEXT_WRAPPER}>
        <h4 className={CARD_TITLE}>{title}</h4>
        <p className={CARD_DESCRIPTION}>{description}</p>
      </div>
    </Link>
  );
}