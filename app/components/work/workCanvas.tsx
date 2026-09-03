"use client";

import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";

export default function WorkCanvas() {
  return (
    <Canvas
      className="!fixed !inset-0 !z-20 !pointer-events-none"
      eventSource={document.body}
      camera={{ position: [0, 0.2, 4.5], fov: 26 }}
      dpr={[1, 1.25]}
      frameloop="always"
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      flat
    >
      <ambientLight intensity={0.9} color="#ffffff" />
      <directionalLight position={[3, 3, 4]} intensity={0.9} color="#ffffff" />
      <directionalLight position={[-4, -2, 2]} intensity={0.4} color="#ffffff" />
      <View.Port />
    </Canvas>
  );
}