import { ComponentType } from "react";
import Hero from "@/app/components/sections/hero";
import Work from "@/app/components/sections/work";

export type SectionConfig = {
    id: string;
    Component: ComponentType;
    bgColor: bgTheme; 
    showChrome: boolean;
}

type bgTheme = "1D1D1D" | "EFEFEF"; 

export const sections: SectionConfig[] = [
    {id: 'hero', Component: Hero, bgColor: "1D1D1D", showChrome:false}, 
    {id: 'work', Component: Work, bgColor:"EFEFEF", showChrome:true}
]