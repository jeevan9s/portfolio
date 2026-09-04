"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Grid, OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

function disposeScene(object: THREE.Object3D) {
  object.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (mesh.geometry) mesh.geometry.dispose();
    if (mesh.material) {
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      materials.forEach((mat) => {
        Object.values(mat).forEach((value) => {
          if (value && typeof value === "object" && "isTexture" in value) {
            (value as THREE.Texture).dispose();
          }
        });
        mat.dispose();
      });
    }
  });
}

function BoardModel({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath, true, true);
  const boardRef = useRef<THREE.Group>(null);
  const animationStart = useRef<number | null>(null);
  const model = useMemo(() => scene.clone(), [scene]);
  const scale = useMemo(() => {
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    model.position.sub(box.getCenter(new THREE.Vector3()));
    return 2.4 / Math.max(size.x, size.y, size.z);
  }, [model]);

  useEffect(() => () => disposeScene(model), [model]);

  useFrame(({ clock, invalidate }) => {
    animationStart.current ??= clock.elapsedTime;
    const progress = Math.min((clock.elapsedTime - animationStart.current) / 0.55, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3);

    if (boardRef.current) {
      boardRef.current.scale.setScalar(scale * (0.72 + easedProgress * 0.28));
      boardRef.current.rotation.y = (1 - easedProgress) * -0.32;
    }

    if (progress < 1) invalidate();
  });

  return <group ref={boardRef}><primitive object={model} /></group>;
}

export default function BoardViewer({
  modelPath,
  cameraPosition = [0, 0.25, 5],
  cameraTarget = [0, 0, 0],
  cameraUp = [0, 1, 0],
}: {
  modelPath?: string;
  cameraPosition?: [number, number, number];
  cameraTarget?: [number, number, number];
  cameraUp?: [number, number, number];
}) {
  const gridTransform = useMemo(() => {
    const target = new THREE.Vector3(...cameraTarget);
    const cameraOffset = new THREE.Vector3(...cameraPosition).sub(target);
    const gridNormal = cameraOffset.normalize();
    const position = target.clone().sub(gridNormal.multiplyScalar(1.6));
    const rotation = new THREE.Euler().setFromQuaternion(
      new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), gridNormal),
    );

    return { position, rotation };
  }, [cameraPosition, cameraTarget]);

  if (!modelPath) return <div className="grid h-full min-h-[20rem] place-items-center inter text-sm text-black/45">No viewer available</div>;

  return (
    <div className="h-[20rem] w-full touch-none sm:h-[25rem]">
      <Canvas frameloop="demand" camera={{ position: cameraPosition, up: cameraUp, fov: 28 }} dpr={[1, 1.1]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
        <ambientLight intensity={1.1} />
        <directionalLight position={[3, 4, 5]} intensity={1.4} />
        <directionalLight position={[-3, -2, 2]} intensity={0.5} />
        <Suspense fallback={null}><BoardModel modelPath={modelPath} /></Suspense>
        <Grid position={gridTransform.position} rotation={gridTransform.rotation} args={[6, 6]} cellSize={0.4} cellThickness={0.45} cellColor="#d1d1d1" sectionSize={2} sectionThickness={0.7} sectionColor="#b8b8b8" fadeDistance={6} fadeStrength={1.2} />
        <OrbitControls target={cameraTarget} enableDamping dampingFactor={0.08} enablePan minDistance={3} maxDistance={8} />
      </Canvas>
    </div>
  );
}