"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

function BoardModel({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath, true, true);
  const boardRef = useRef<THREE.Group>(null);
  const model = useMemo(() => scene.clone(), [scene]);
  const scale = useMemo(() => {
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    model.position.sub(box.getCenter(new THREE.Vector3()));
    return 2.4 / Math.max(size.x, size.y, size.z);
  }, [model]);

  useFrame((_, delta) => {
    if (boardRef.current) boardRef.current.rotation.y += Math.min(delta, 0.05) * 0.25;
  });

  return <group ref={boardRef} scale={scale}><primitive object={model} /></group>;
}

export default function BoardViewer({ modelPath }: { modelPath?: string }) {
  if (!modelPath) return <div className="grid h-full min-h-[20rem] place-items-center inter text-sm text-black/45">No viewer available</div>;

  return (
    <div className="h-[20rem] w-full sm:h-[25rem]">
      <Canvas camera={{ position: [0, 0.25, 5], fov: 28 }} dpr={[1, 1.25]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
        <ambientLight intensity={1.1} />
        <directionalLight position={[3, 4, 5]} intensity={1.4} />
        <directionalLight position={[-3, -2, 2]} intensity={0.5} />
        <Suspense fallback={null}><BoardModel modelPath={modelPath} /></Suspense>
      </Canvas>
    </div>
  );
}
