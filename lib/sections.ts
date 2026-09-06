"use client";

import { ComponentType, createElement, useEffect, useRef, useState } from "react";
import Hero from "@/app/components/sections/hero";
import Background from "@/app/components/sections/background";
import Connect from "@/app/components/sections/connect";
import EndCard from "@/app/components/sections/end";
import Gallery from "@/app/components/sections/gallery";
import { lenisController } from "@/lib/lenisController";

type WorkModule = typeof import("@/app/components/sections/work");

let workModulePromise: Promise<WorkModule> | null = null;

function loadWork() {
    workModulePromise ??= import("@/app/components/sections/work");
    return workModulePromise.then((workModule) => {
        workModule.preloadHardwareModels();
        return workModule.default;
    });
}

function DeferredWork() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [Work, setWork] = useState<ComponentType | null>(null);

    useEffect(() => {
        if (!Work) return;

        const frameId = requestAnimationFrame(() => lenisController.instance?.resize());
        return () => cancelAnimationFrame(frameId);
    }, [Work]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let isUnmounted = false;
        const warmWork = () => {
            clearTimeout(warmTimeout);
            void loadWork().then((WorkSection) => {
                if (!isUnmounted) setWork(() => WorkSection);
            });
            window.removeEventListener("scroll", warmWork);
            window.removeEventListener("wheel", warmWork);
            window.removeEventListener("touchstart", warmWork);
        };
        const warmTimeout = window.setTimeout(warmWork, 900);

        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            observer.disconnect();
            warmWork();
        });

        observer.observe(container);
        window.addEventListener("scroll", warmWork, { passive: true, once: true });
        window.addEventListener("wheel", warmWork, { passive: true, once: true });
        window.addEventListener("touchstart", warmWork, { passive: true, once: true });
        return () => {
            isUnmounted = true;
            clearTimeout(warmTimeout);
            window.removeEventListener("scroll", warmWork);
            window.removeEventListener("wheel", warmWork);
            window.removeEventListener("touchstart", warmWork);
            observer.disconnect();
        };
    }, []);

    return createElement(
        "div",
        { ref: containerRef, className: "min-h-[250vh]" },
        Work && createElement(Work),
    );
}

export type SectionConfig = {
    id: string;
    Component: ComponentType;
    bgColor: bgTheme; 
    showChrome: boolean;
    displayNav?: boolean;
}

type bgTheme = "1D1D1D" | "EFEFEF"; 

export const sections: SectionConfig[] = [
    {id: 'hero', Component: Hero, bgColor: "1D1D1D", showChrome:false}, 
    {id: 'work', Component: DeferredWork, bgColor:"EFEFEF", showChrome:true},
    {id: 'background', Component: Background, bgColor:"EFEFEF", showChrome:true}, 
    {id: 'connect', Component: Connect, bgColor:"1D1D1D", showChrome:true}, 
    {id: 'gallery', Component: Gallery, bgColor:"1D1D1D", showChrome: false},
    {id: 'end', Component: EndCard, bgColor:"1D1D1D", showChrome: false, displayNav: false}
]