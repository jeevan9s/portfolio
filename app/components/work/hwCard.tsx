"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import type { Group } from "three";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  CARD_WIDTH,
  CARD_ASPECT,
  CARD_TEXT_WRAPPER,
  CARD_TITLE,
  CARD_DESCRIPTION
} from "./cardTypes";

interface HardwareCardProps {
  id: string;
  title: string;
  description: string;
  mcu: string;
  layers: number;
  size: string;
  image?: string;
  modelPath?: string;
}

function useNearViewport(ref: React.RefObject<HTMLElement | null>) {
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsNearViewport(entry.isIntersecting),
      { rootMargin: "400px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  return isNearViewport;
}

function useWarmModel(ref: React.RefObject<HTMLElement | null>, modelPath?: string) {
  useEffect(() => {
    const element = ref.current;
    if (!element || !modelPath) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        useGLTF.preload(modelPath, true, true);
        observer.disconnect();
      },
      { rootMargin: "800px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [modelPath, ref]);
}

function PlaceholderBoard() {
  return (
    <mesh>
      <boxGeometry args={[1.6, 2, 0.08]} />
      <meshStandardMaterial color="#2B2B2B" roughness={0.5} metalness={0.2} />
    </mesh>
  );
}

function RotatingPreview({ children }: { children: React.ReactNode }) {
  const previewRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (previewRef.current) previewRef.current.rotation.y += delta * 0.3;
  });

  return <group ref={previewRef} rotation={[0.05, 0, 0]}>{children}</group>;
}

function RealBoard({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath, true, true);
  const boardRef = useRef<Group>(null);
  const animationStart = useRef<number | null>(null);
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  const scale = useMemo(() => {
    const box = new THREE.Box3().setFromObject(clonedScene);
    const sphere = box.getBoundingSphere(new THREE.Sphere());
    const targetRadius = 0.85;
    clonedScene.position.sub(sphere.center);
    return targetRadius / sphere.radius;
  }, [clonedScene]);

  useFrame(({ clock }) => {
    animationStart.current ??= clock.elapsedTime;
    const progress = Math.min((clock.elapsedTime - animationStart.current) / 0.6, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 4);

    if (boardRef.current) {
      boardRef.current.scale.setScalar(scale * (0.85 + easedProgress * 0.15));
      boardRef.current.position.y = (1 - easedProgress) * -0.15;
    }
  });

  return (
    <group ref={boardRef} scale={scale * 0.85} position={[0, -0.15, 0]}>
      <primitive object={clonedScene} />
    </group>
  );
}

export default function HardwareCard({
  id,
  title,
  description,
  mcu,
  layers,
  size,
  modelPath,
}: HardwareCardProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const isNearViewport = useNearViewport(previewRef);
  useWarmModel(previewRef, modelPath);

  return (
    <Link href={`/project/${id}`} className={`shrink-0 ${CARD_WIDTH} flex flex-col cursor-pointer [contain:layout_paint]`}>
      <motion.div
        ref={previewRef}
        whileHover={{ scale: 1.025 }}
        transition={{ type: "spring", stiffness: 380, damping: 28, mass: 0.55 }}
        className={`relative w-full ${CARD_ASPECT} rounded-xl bg-[#1E1E1E] overflow-hidden will-change-transform`}
      >
        {isNearViewport ? (
          <Canvas
            camera={{ position: [0, 0.2, 4.5], fov: 26 }}
            dpr={[1, 1.5]}
            frameloop="always"
            gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
            className="absolute inset-0 h-full w-full pointer-events-none"
          >
            <ambientLight intensity={0.9} color="#ffffff" />
            <directionalLight position={[3, 3, 4]} intensity={1.2} color="#ffffff" />
            <directionalLight position={[-4, -2, 2]} intensity={0.6} color="#ffffff" />
            <RotatingPreview>
              <Suspense fallback={<PlaceholderBoard />}>
                {modelPath ? <RealBoard modelPath={modelPath} /> : <PlaceholderBoard />}
              </Suspense>
            </RotatingPreview>
          </Canvas>
        ) : (
          <div className="absolute inset-0 h-full w-full bg-[#1E1E1E]" />
        )}

        <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-[#F4F4F4] rounded-md px-2 py-1.5 sm:px-2 sm:py-1 text-right pointer-events-none max-w-[65%] z-10">
          <div className="flex flex-col gap-y-0.5">
            <div className="flex items-center justify-between gap-x-2 sm:gap-x-4">
              <span className="inter text-[0.55rem] sm:text-[0.62rem] text-[#9B9B9B] uppercase tracking-wide">MCU</span>
              <span className="inter text-[0.55rem] sm:text-[0.62rem] text-[#1E1E1E] font-medium truncate">{mcu}</span>
            </div>
            <div className="flex items-center justify-between gap-x-2 sm:gap-x-4">
              <span className="inter text-[0.55rem] sm:text-[0.62rem] text-[#9B9B9B] uppercase tracking-wide">Layers</span>
              <span className="inter text-[0.55rem] sm:text-[0.62rem] text-[#1E1E1E] font-medium">{layers}</span>
            </div>
            <div className="flex items-center justify-between gap-x-2 sm:gap-x-4">
              <span className="inter text-[0.55rem] sm:text-[0.62rem] text-[#9B9B9B] uppercase tracking-wide">Size</span>
              <span className="inter text-[0.55rem] sm:text-[0.62rem] text-[#1E1E1E] font-medium">{size}</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className={CARD_TEXT_WRAPPER}>
        <h4 className={CARD_TITLE}>{title}</h4>
        <p className={CARD_DESCRIPTION}>{description}</p>
      </div>
    </Link>
  );
}