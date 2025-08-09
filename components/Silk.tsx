"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SilkProps {
  speed?: number;
  scale?: number;
  color?: string;
  noiseIntensity?: number;
  rotation?: number;
}

function SilkMesh({
  speed = 5,
  scale = 1,
  color = "#7B7481",
  noiseIntensity = 1.5,
  rotation = 0,
}: SilkProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Vertex shader for wave-like distortion
  const vertexShader = `
    uniform float uTime;
    uniform float uNoiseIntensity;
    varying vec2 vUv;
    varying vec3 vPosition;

    float noise(vec3 p) {
      return fract(sin(dot(p, vec3(12.9898, 78.233, 54.53))) * 43758.5453);
    }

    void main() {
      vUv = uv;
      vPosition = position;
      
      vec3 pos = position;
      float wave1 = sin(pos.x * 2.0 + uTime * 0.5) * 0.1;
      float wave2 = sin(pos.y * 1.5 + uTime * 0.3) * 0.1;
      float noiseValue = noise(pos + uTime * 0.1) * uNoiseIntensity * 0.05;
      
      pos.z += wave1 + wave2 + noiseValue;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  // Fragment shader for silk-like appearance
  const fragmentShader = `
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uOpacity;
    varying vec2 vUv;
    varying vec3 vPosition;

    void main() {
      vec2 uv = vUv;
      
      // Create flowing pattern with higher visibility
      float pattern1 = sin(uv.x * 8.0 + uTime * 0.3) * 0.5 + 0.5;
      float pattern2 = sin(uv.y * 6.0 + uTime * 0.2) * 0.5 + 0.5;
      float pattern3 = sin((uv.x + uv.y) * 4.0 + uTime * 0.15) * 0.5 + 0.5;
      
      float intensity = (pattern1 + pattern2 + pattern3) / 3.0;
      intensity = pow(intensity, 1.2);
      
      // Softer edge fade
      float edgeFade = smoothstep(0.0, 0.2, uv.x) * smoothstep(1.0, 0.8, uv.x) *
                      smoothstep(0.0, 0.2, uv.y) * smoothstep(1.0, 0.8, uv.y);
      
      vec3 finalColor = uColor * (intensity + 0.2);
      float alpha = (intensity * 0.8 + 0.2) * edgeFade * uOpacity;
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `;

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uOpacity: { value: 0.8 },
      uNoiseIntensity: { value: noiseIntensity },
    }),
    [color, noiseIntensity]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value =
        state.clock.elapsedTime * speed * 0.2;
    }
    if (meshRef.current) {
      meshRef.current.rotation.z = rotation + state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} scale={scale}>
      <planeGeometry args={[20, 20, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

const Silk: React.FC<SilkProps> = (props) => {
  return (
    <div className="absolute inset-0 z-0 opacity-70 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ width: "100%", height: "100%" }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <SilkMesh {...props} />
      </Canvas>
    </div>
  );
};

export default Silk;
