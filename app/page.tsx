// landing page
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row flex-1 bg-[#1D1D1D] md:justify-between md:items-start items-center gap-y-10 justify-center min-h-screen p-8 md:p-12">
      <div className="flex flex-col gap-y-5 max-w-[100rem] md:max-w-350">
        <h1 className="text-[2rem] text-white md:text-[5.25rem] montserrat">
          Developing hardware and firmware for embedded platforms.
        </h1>

        <Tooltip>
            <div className="md:flex hidden">
              <TooltipTrigger>
                <Image
                data-cursor="grow"
                  alt="chakana"
                  src="/chakana.svg"
                  width={60}
                  height={60}
                />
              </TooltipTrigger>
              <TooltipContent side="right" className="inter max-w-42 bg-[#1D1D1D]">the Chakana, a symbol of my Peruvian heritage</TooltipContent>
            </div>
        </Tooltip>
      </div>

      <div className="flex flex-col md:gap-y-3 gap-y-5 md:max-w-100 md:bottom-30 md:right-40 md:absolute">
        <p className="text-white/70 inter md:text-[1.2rem]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut
          dictum orci. In consecm tellus, a tempor mi. 
        </p>
        <p className="text-white/40 inter md:text-[1.2rem]">
          based in Toronto, CA.
        </p>
      </div>
    </div>
  );
}
