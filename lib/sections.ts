import { ComponentType } from "react";
import Hero from "@/app/components/sections/hero";
import Work from "@/app/components/sections/work";

export type SectionConfig = {
    id: string;
    Component: ComponentType;
    bgColor: bgTheme; 
    showChrome: boolean;
}

type bgTheme = "1d1d1d" | "F5F5F5"; 

export const sections: SectionConfig[] = [
    {id: 'hero', Component: Hero, bgColor: "1d1d1d", showChrome:false}, 
    {id: 'work', Component: Work, bgColor:"F5F5F5", showChrome:true}
]