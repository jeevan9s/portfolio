import { ComponentType } from "react";
import Hero from "@/app/components/sections/hero";
import Work from "@/app/components/sections/work";
import Background from "@/app/components/sections/background";
import Connect from "@/app/components/sections/connect";
import EndCard from "@/app/components/sections/end";

export type SectionConfig = {
    id: string;
    Component: ComponentType;
    bgColor: bgTheme; 
    showChrome: boolean;
}

type bgTheme = "1D1D1D" | "EFEFEF"; 

export const sections: SectionConfig[] = [
    {id: 'hero', Component: Hero, bgColor: "1D1D1D", showChrome:false}, 
    {id: 'work', Component: Work, bgColor:"EFEFEF", showChrome:true}, 
    {id: 'background', Component: Background, bgColor:"EFEFEF", showChrome:true}, 
    {id: 'connect', Component: Connect, bgColor:"1D1D1D", showChrome:true}, 

    {id: 'end', Component: EndCard, bgColor:"1D1D1D", showChrome: false}

]