"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Center, Bounds } from "@react-three/drei";
import {
  CARD_WIDTH,
  CARD_ASPECT,
  CARD_TEXT_WRAPPER,
  CARD_TITLE,
  CARD_DESCRIPTION,
} from "./cardTypes";

interface HardwareCardProps {
  title: string;
  description: string;
  mcu: string;
  layers: number;
  size: string;
  image?: string;
  modelPath?: string; 
}

function PlaceholderBoard() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.35;
  });

  return (
    <mesh ref={meshRef} rotation={[0.15, 0.6, 0]}>
      <boxGeometry args={[1.6, 2, 0.08]} />
      <meshStandardMaterial color="#2B2B2B" roughness={0.5} metalness={0.2} />
    </mesh>
  );
}

function RealBoard({ modelPath }: { modelPath: string }) {
  const groupRef = useRef<Mesh>(null);
  const { scene } = useGLTF(modelPath);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.35;
  });

  return (
    <group ref={groupRef as never} rotation={[0.15, 0.6, 0]}>
      <primitive object={scene} />
    </group>
  );
}

export default function HardwareCard({
  title,
  description,
  mcu,
  layers,
  size,
  modelPath,
}: HardwareCardProps) {
  return (
    <div className={`shrink-0 ${CARD_WIDTH} flex flex-col cursor-pointer`}>
      <div
        className={`relative w-full ${CARD_ASPECT} rounded-xl bg-[#1E1E1E] overflow-hidden transition-transform duration-300 hover:scale-[0.98]`}
      >
        <Canvas
          camera={{ position: [0, 0, 4], fov: 40 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 3, 4]} intensity={1.1} />
          <directionalLight position={[-3, -2, 2]} intensity={0.3} />
          <Suspense fallback={null}>
            {modelPath ? (
              <Bounds fit clip observe margin={1.2}>
                <Center>
                  <RealBoard modelPath={modelPath} />
                </Center>
              </Bounds>
            ) : (
              <PlaceholderBoard />
            )}
          </Suspense>
        </Canvas>

        <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-[#F4F4F4] rounded-md px-2 py-1.5 sm:px-3 sm:py-2 text-right pointer-events-none max-w-[65%]">
          <div className="flex flex-col gap-y-0.5">
            <div className="flex items-center justify-between gap-x-2 sm:gap-x-4">
              <span className="inter text-[0.55rem] sm:text-[0.65rem] text-[#9B9B9B] uppercase tracking-wide">
                MCU
              </span>
              <span className="inter text-[0.55rem] sm:text-[0.65rem] text-[#1E1E1E] font-medium truncate">
                {mcu}
              </span>
            </div>
            <div className="flex items-center justify-between gap-x-2 sm:gap-x-4">
              <span className="inter text-[0.55rem] sm:text-[0.65rem] text-[#9B9B9B] uppercase tracking-wide">
                Layers
              </span>
              <span className="inter text-[0.55rem] sm:text-[0.65rem] text-[#1E1E1E] font-medium">
                {layers}
              </span>
            </div>
            <div className="flex items-center justify-between gap-x-2 sm:gap-x-4">
              <span className="inter text-[0.55rem] sm:text-[0.65rem] text-[#9B9B9B] uppercase tracking-wide">
                Size
              </span>
              <span className="inter text-[0.55rem] sm:text-[0.65rem] text-[#1E1E1E] font-medium">
                {size}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={CARD_TEXT_WRAPPER}>
        <h4 className={CARD_TITLE}>{title}</h4>
        <p className={CARD_DESCRIPTION}>{description}</p>
      </div>
    </div>
  );
}