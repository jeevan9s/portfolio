import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const revealTransition = { duration: 0.7, ease: [0.16, 1, 0.3, 1] } as const;
const viewport = { once: false, amount: 0.3, margin: "0px 0px -10% 0px" } as const;

type Orientation = "landscape" | "portrait" | "square" | "tall";

type Photo = {
  id: string;
  src: string;
  alt: string;
  orientation: Orientation;
};

const photos: Photo[] = [
  { id: "1", src: "/gallery/img_01.jpg", alt: "Gallery image 1", orientation: "portrait" },
  { id: "2", src: "/gallery/img_02.jpg", alt: "Gallery image 2", orientation: "portrait" },
  { id: "3", src: "/gallery/img_03.jpg", alt: "Gallery image 3", orientation: "portrait" },
  { id: "4", src: "/gallery/img_04.jpg", alt: "Gallery image 4", orientation: "portrait" },
  { id: "5", src: "/gallery/img_05.jpg", alt: "Gallery image 5", orientation: "portrait" },
  { id: "6", src: "/gallery/img_06.jpg", alt: "Gallery image 6", orientation: "portrait" },
  { id: "7", src: "/gallery/img_07.jpg", alt: "Gallery image 7", orientation: "portrait" },
  { id: "8", src: "/gallery/img_08.jpg", alt: "Gallery image 8", orientation: "landscape" },
  { id: "9", src: "/gallery/img_09.jpg", alt: "Gallery image 9", orientation: "portrait" },
  { id: "10", src: "/gallery/img_10.jpg", alt: "Gallery image 10", orientation: "portrait" },
  { id: "11", src: "/gallery/img_11.jpg", alt: "Gallery image 11", orientation: "landscape" },
  { id: "12", src: "/gallery/img_12.jpg", alt: "Gallery image 12", orientation: "square" },
  { id: "13", src: "/gallery/img_13.jpg", alt: "Gallery image 13", orientation: "landscape" },
  { id: "14", src: "/gallery/img_14.jpg", alt: "Gallery image 14", orientation: "portrait" },
  { id: "15", src: "/gallery/img_15.jpg", alt: "Gallery image 15", orientation: "landscape" },
  { id: "16", src: "/gallery/img_16.jpg", alt: "Gallery image 16", orientation: "portrait" },
  { id: "17", src: "/gallery/img_17.jpg", alt: "Gallery image 17", orientation: "landscape" },
  { id: "18", src: "/gallery/img_18.jpg", alt: "Gallery image 18", orientation: "portrait" },
  { id: "19", src: "/gallery/img_19.jpg", alt: "Gallery image 19", orientation: "portrait" },
  { id: "20", src: "/gallery/img_20.jpg", alt: "Gallery image 20", orientation: "portrait" },
  { id: "21", src: "/gallery/img_21.jpg", alt: "Gallery image 21", orientation: "portrait" },
  { id: "22", src: "/gallery/img_22.jpg", alt: "Gallery image 22", orientation: "portrait" },
  { id: "23", src: "/gallery/img_23.jpg", alt: "Gallery image 23", orientation: "landscape" },
  { id: "24", src: "/gallery/img_24.jpg", alt: "Gallery image 24", orientation: "portrait" },
  { id: "25", src: "/gallery/img_25.jpg", alt: "Gallery image 25", orientation: "portrait" },
  { id: "26", src: "/gallery/img_26.jpg", alt: "Gallery image 26", orientation: "portrait" },
  { id: "27", src: "/gallery/img_27.jpg", alt: "Gallery image 27", orientation: "portrait" },
  { id: "28", src: "/gallery/img_28.jpg", alt: "Gallery image 28", orientation: "portrait" },
  { id: "29", src: "/gallery/img_29.jpg", alt: "Gallery image 29", orientation: "portrait" },
  { id: "30", src: "/gallery/img_30.jpg", alt: "Gallery image 30", orientation: "portrait" },
  { id: "31", src: "/gallery/img_31.jpg", alt: "Gallery image 31", orientation: "portrait" },
  { id: "32", src: "/gallery/img_32.jpg", alt: "Gallery image 32", orientation: "portrait" },
];

const aspectClass: Record<Orientation, string> = {
  landscape: "aspect-[4/3]",
  square: "aspect-[1/1]",
  portrait: "aspect-[4/5]",
  tall: "aspect-[4/5.5]",
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
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
      className={`relative w-full ${aspectClass[photo.orientation]} rounded-lg sm:rounded-xl overflow-hidden bg-[#2A2A2A]`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(min-width: 1024px) 25vw, 50vw"
        quality={60}
        loading="lazy"
        decoding="async"
        onLoad={() => onLoad(photo.id)}
        className={`absolute inset-0 w-full h-full object-cover hover:scale-[1.03] ${
          isLoaded
            ? "opacity-100 scale-100 transition-transform duration-300 ease-out"
            : "opacity-0 scale-105 transition-opacity duration-300 ease-out"
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

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5 lg:gap-6">
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