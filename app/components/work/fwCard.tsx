
import {
  CARD_WIDTH,
  CARD_ASPECT,
  CARD_TEXT_WRAPPER,
  CARD_TITLE,
  CARD_DESCRIPTION,
} from "./cardTypes";

interface FirmwareCardProps {
  title: string;
  description: string;
  image?: string;
}

export default function FirmwareCard({ title, description, image }: FirmwareCardProps) {
  return (
    <div className={`shrink-0 ${CARD_WIDTH} flex flex-col cursor-pointer`}>
      <div
        className={`relative w-full ${CARD_ASPECT} rounded-xl bg-[#1E1E1E] overflow-hidden transition-transform duration-300 hover:scale-[0.98]`}
      >
        {image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={title} className="w-full h-full object-cover" />
        )}
      </div>

      <div className={CARD_TEXT_WRAPPER}>
        <h4 className={CARD_TITLE}>{title}</h4>
        <p className={CARD_DESCRIPTION}>{description}</p>
      </div>
    </div>
  );
}