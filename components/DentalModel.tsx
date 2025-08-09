"use client";

import { useRef, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Float } from "@react-three/drei";
import * as THREE from "three";

type DentalModelProps = {
  modelPath?: string;
  scale?: number;
};

function LoadedModel({ modelPath, scale = 2 }: DentalModelProps) {
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(modelPath!);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
      <group ref={meshRef} scale={[scale, scale, scale]}>
        <primitive object={scene.clone()} />
      </group>
    </Float>
  );
}

function FallbackModel() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
      <group ref={meshRef}>
        {/* Main tooth body */}
        <mesh castShadow receiveShadow position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.6, 0.8, 1.2, 16]} />
          <meshStandardMaterial
            color="#f8f8f8"
            metalness={0.1}
            roughness={0.3}
          />
        </mesh>
        {/* Tooth root */}
        <mesh castShadow receiveShadow position={[0, -0.6, 0]}>
          <coneGeometry args={[0.4, 0.8, 12]} />
          <meshStandardMaterial
            color="#f5f5f5"
            metalness={0.1}
            roughness={0.4}
          />
        </mesh>
        {/* Crown detail */}
        <mesh castShadow receiveShadow position={[0, 0.8, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.05}
            roughness={0.2}
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function DentalModel({
  modelPath = "/models/tooth.glb",
  scale = 2,
}: DentalModelProps) {
  return (
    <Suspense fallback={<FallbackModel />}>
      <LoadedModel modelPath={modelPath} scale={scale} />
    </Suspense>
  );
}

// Preload both models
useGLTF.preload("/models/tooth.glb");
useGLTF.preload("/models/teeth-set.glb");
