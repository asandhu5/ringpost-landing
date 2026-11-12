"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * The brand's one 3D object, the Business Brain: RingPost's mark (an open ring with its cyan dot) made solid and
 * glossy, turning slowly, with small lights flowing into it like calls and messages
 * arriving. Built from plain three.js shapes so it stays light on phones.
 */

const VIOLET = new THREE.Color("#6a57f2");
const DEEP = new THREE.Color("#4433d1");
const CYAN = new THREE.Color("#0ec5e0");
const ARC = Math.PI * 1.62;

function Environment() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    return () => {
      env.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  return null;
}

function Ring({ pointer }: { pointer: React.RefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  const geometry = useMemo(() => {
    const g = new THREE.TorusGeometry(1.55, 0.36, 48, 220, ARC);
    const pos = g.attributes.position;
    const colors = new Float32Array(pos.count * 3);
    const c = new THREE.Color();
    for (let i = 0; i < pos.count; i++) {
      const angle = Math.atan2(pos.getY(i), pos.getX(i));
      const t = ((angle + Math.PI * 2) % (Math.PI * 2)) / ARC;
      if (t < 0.55) c.lerpColors(DEEP, VIOLET, t / 0.55);
      else c.lerpColors(VIOLET, CYAN, Math.min(1, (t - 0.55) / 0.45));
      colors.set([c.r, c.g, c.b], i * 3);
    }
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return g;
  }, []);
  const dotPosition = useMemo(() => new THREE.Vector3(Math.cos(ARC + 0.42) * 1.55, Math.sin(ARC + 0.42) * 1.55, 0), []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const p = pointer.current ?? { x: 0, y: 0 };
    g.rotation.z += delta * 0.12;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -0.35 + p.y * 0.25, 0.05);
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, 0.45 + p.x * 0.35, 0.05);
    g.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.06;
  });

  return (
    <group ref={group} rotation={[-0.35, 0.45, 0]}>
      <mesh geometry={geometry}>
        <meshPhysicalMaterial vertexColors roughness={0.22} metalness={0.05} clearcoat={1} clearcoatRoughness={0.06} envMapIntensity={0.55} iridescence={0.2} iridescenceIOR={1.3} />
      </mesh>
      <mesh position={dotPosition}>
        <sphereGeometry args={[0.36, 48, 48]} />
        <meshPhysicalMaterial color={CYAN} roughness={0.1} metalness={0.1} clearcoat={1} emissive={CYAN} emissiveIntensity={0.25} />
      </mesh>
    </group>
  );
}

/** Small lights spiralling in from the edges and vanishing into the ring. */
function Arrivals({ count }: { count: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const seeds = useMemo(() => Array.from({ length: count }, (_, i) => ({ angle: (i / count) * Math.PI * 2, speed: 0.12 + (i % 5) * 0.03, offset: (i * 0.37) % 1, height: ((i % 7) - 3) * 0.18 })), [count]);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const palette = useMemo(() => [new THREE.Color("#22d3ee"), new THREE.Color("#a594ff"), new THREE.Color("#ffffff")], []);

  useEffect(() => {
    const m = mesh.current;
    if (!m) return;
    seeds.forEach((_, i) => m.setColorAt(i, palette[i % palette.length]));
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }, [seeds, palette]);

  useFrame((state) => {
    const m = mesh.current;
    if (!m) return;
    const t = state.clock.elapsedTime;
    seeds.forEach((s, i) => {
      const life = (t * s.speed + s.offset) % 1;
      const radius = 4.2 - life * 2.6;
      const a = s.angle + life * 2.4;
      dummy.position.set(Math.cos(a) * radius, Math.sin(a) * radius * 0.62 + s.height, -0.4 + life * 0.4);
      const scale = 0.035 + Math.sin(life * Math.PI) * 0.05;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  );
}

/**
 * `scale` sizes the ring inside its canvas (1 fills about 80% of the height), so the
 * canvas can cover a whole stage while the ring sits in the middle of it. `active`
 * stops drawing while the ring is off screen.
 */
export default function RingCanvas({ small = false, scale = 1, active = true, onReady }: { small?: boolean; scale?: number; active?: boolean; onReady?: () => void }) {
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current = { x: (e.clientX / window.innerWidth) * 2 - 1, y: -((e.clientY / window.innerHeight) * 2 - 1) };
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <Canvas
      dpr={small ? [1, 1.5] : [1, 1.75]}
      camera={{ position: [0, 0, 6.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={active ? "always" : "never"}
      style={{ background: "transparent", pointerEvents: "none" }}
      onCreated={() => onReady?.()}
      aria-hidden
    >
      <Environment />
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} />
      <directionalLight position={[-4, -2, 2]} intensity={0.6} color="#22d3ee" />
      <group scale={scale}>
        <Ring pointer={pointer} />
        <Arrivals count={small ? 14 : 26} />
      </group>
    </Canvas>
  );
}
