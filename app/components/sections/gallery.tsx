import { useState } from "react";
import { motion } from "framer-motion";

const revealTransition = { duration: 0.7, ease: [0.16, 1, 0.3, 1] } as const;
const viewport = { once: false, amount: 0.3, margin: "0px 0px -10% 0px" } as const;

type Orientation = "landscape" | "portrait" | "square" | "tall";

type Photo = {
  id: string;
  src: string;
  alt: string;
  orientation: Orientation;
};

// add new photos here — that's it, nothing else in this file needs to change
const photos: Photo[] = [
  { id: "1", src: "https://picsum.photos/seed/js-gallery-01/800/600", alt: "", orientation: "landscape" },
  { id: "2", src: "https://picsum.photos/seed/js-gallery-02/800/1000", alt: "", orientation: "portrait" },
  { id: "3", src: "https://picsum.photos/seed/js-gallery-03/800/1000", alt: "", orientation: "portrait" },
  { id: "4", src: "https://picsum.photos/seed/js-gallery-04/800/1100", alt: "", orientation: "tall" },
  { id: "5", src: "https://picsum.photos/seed/js-gallery-05/800/650", alt: "", orientation: "landscape" },
  { id: "6", src: "https://picsum.photos/seed/js-gallery-06/800/1000", alt: "", orientation: "portrait" },
  { id: "7", src: "https://picsum.photos/seed/js-gallery-07/800/800", alt: "", orientation: "square" },
  { id: "8", src: "https://picsum.photos/seed/js-gallery-08/800/1150", alt: "", orientation: "tall" },
  { id: "9", src: "https://picsum.photos/seed/js-gallery-09/800/700", alt: "", orientation: "landscape" },
  { id: "10", src: "https://picsum.photos/seed/js-gallery-10/800/700", alt: "", orientation: "landscape" },
  { id: "11", src: "https://picsum.photos/seed/js-gallery-11/800/1000", alt: "", orientation: "portrait" },
  { id: "12", src: "https://picsum.photos/seed/js-gallery-12/800/900", alt: "", orientation: "square" },
];

const aspectClass: Record<Orientation, string> = {
  landscape: "aspect-[4/3]",
  square: "aspect-[1/1]",
  portrait: "aspect-[4/5]",
  tall: "aspect-[4/5.5]",
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: revealTransition,
  },
};

function GalleryCard({
  photo,
  isLoaded,
  onLoad,
}: {
  photo: Photo;
  isLoaded: boolean;
  onLoad: (id: string) => void;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={cardVariants}
      data-cursor="grow"
      className={`relative w-full ${aspectClass[photo.orientation]} rounded-lg sm:rounded-xl overflow-hidden bg-[#2A2A2A] mb-2.5 sm:mb-4 md:mb-5 lg:mb-6 break-inside-avoid`}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        decoding="async"
        onLoad={() => onLoad(photo.id)}
        className={`absolute inset-0 w-full h-full object-cover hover:scale-[1.03] ${
          isLoaded
            ? "opacity-100 scale-100 blur-0 transition-transform duration-300 ease-out"
            : "opacity-0 scale-105 blur-md transition-all duration-700 ease-out"
        }`}
      />
    </motion.div>
  );
}

export default function Gallery() {
  const [loadedIds, setLoadedIds] = useState<Set<string>>(new Set());

  const handleLoad = (id: string) => {
    setLoadedIds((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  return (
    <div className="flex flex-col flex-1 bg-transparent items-center pt-24 md:pt-32 p-4 sm:p-8 md:p-12">
      <div className="w-full max-w-[100rem]">
        <motion.p
          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={viewport}
          transition={revealTransition}
          className="inter text-xl md:text-2xl nav-theme-muted mb-6 sm:mb-8 md:mb-10"
        >
          gallery
        </motion.p>

        <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-2.5 sm:gap-4 md:gap-5 lg:gap-6">
          {photos.map((photo) => (
            <GalleryCard
              key={photo.id}
              photo={photo}
              isLoaded={loadedIds.has(photo.id)}
              onLoad={handleLoad}
            />
          ))}
        </div>
      </div>
    </div>
  );
}