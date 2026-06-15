"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { isWebGLAvailable } from "@/lib/webgl";
import { getSceneConfig } from "@/lib/scene-config";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Scene3D — a single persistent Three.js canvas fixed behind all content.
 *
 * Two layers:
 *  1. A particle network — drifting points with thin lines drawn between
 *     near neighbours, plus subtle mouse repulsion.
 *  2. A few large wireframe geometries at varied depths for parallax.
 *
 * The render loop reads a mutable `params` object so scroll-driven
 * choreography can modulate the scene over time without restructuring.
 * Falls back to an animated CSS gradient when WebGL is unavailable, and
 * holds still when the user prefers reduced motion.
 */

const ACCENT = new THREE.Color(0x5855d4);
const PARTICLE_FIELD = { x: 14, y: 9, z: 8 }; // half-extents of the drift box
const LINK_DISTANCE = 1.6; // max distance for a connecting line
const MOUSE_RADIUS = 2.2; // world-space radius of pointer influence

export default function Scene3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [fallback, setFallback] = useState(false);
  // Holds the live params object so scroll choreography can mutate it.
  const sceneParamsRef = useRef<SceneParams | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    if (!isWebGLAvailable()) {
      setFallback(true);
      return;
    }

    const reduce = prefersReducedMotion();
    const config = getSceneConfig(window.innerWidth);
    let width = window.innerWidth;
    let height = window.innerHeight;

    // ---- Renderer / scene / camera ---------------------------------------
    // Detection can pass yet context creation still fail (driver issues,
    // headless env). Fall back gracefully instead of crashing.
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      setFallback(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, config.pixelRatioCap));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 12;

    /**
     * Mutable scene parameters. Defaults describe the Hero state; scroll
     * choreography (separate slice) animates these values.
     */
    const params = {
      particleSpeed: 1,
      geometrySpeed: 1,
      accentIntensity: 0.2,
      cameraZ: 12,
      particleSpread: 1,
      clusterX: 0,
      geometryDriftX: 0,
    };

    // ---- Particle network -------------------------------------------------
    const count = config.particleCount;
    const basePositions = new Float32Array(count * 3);
    const phases = new Float32Array(count); // per-particle sine phase
    const mouseOffset = new Float32Array(count * 3); // eased pointer push

    for (let i = 0; i < count; i++) {
      basePositions[i * 3] = (Math.random() * 2 - 1) * PARTICLE_FIELD.x;
      basePositions[i * 3 + 1] = (Math.random() * 2 - 1) * PARTICLE_FIELD.y;
      basePositions[i * 3 + 2] = (Math.random() * 2 - 1) * PARTICLE_FIELD.z;
      phases[i] = Math.random() * Math.PI * 2;
    }

    // Particles as instanced spheres (cheap, satisfies "sphere geometry").
    const particleGeometry = new THREE.SphereGeometry(0.035, 8, 8);
    const particleMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.45,
    });
    const particles = new THREE.InstancedMesh(
      particleGeometry,
      particleMaterial,
      count
    );
    particles.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(particles);

    // Connecting lines — capacity sized to the worst case we actually draw.
    const maxLines = count * 6;
    const linePositions = new Float32Array(maxLines * 2 * 3);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3)
    );
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.08,
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // ---- Floating geometries ---------------------------------------------
    const geometryGroup = new THREE.Group();
    scene.add(geometryGroup);

    const shapeFactories = [
      () => new THREE.IcosahedronGeometry(1.6, 0),
      () => new THREE.OctahedronGeometry(1.3, 0),
      () => new THREE.TorusKnotGeometry(1, 0.32, 80, 12),
      () => new THREE.IcosahedronGeometry(1.1, 0),
      () => new THREE.OctahedronGeometry(1.7, 0),
    ];

    const geometries: THREE.BufferGeometry[] = [];
    const geometryMaterials: THREE.MeshBasicMaterial[] = [];
    const spins: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < config.geometryCount; i++) {
      const geometry = shapeFactories[i % shapeFactories.length]();
      const material = new THREE.MeshBasicMaterial({
        color: ACCENT,
        wireframe: true,
        transparent: true,
        opacity: params.accentIntensity,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() * 2 - 1) * 8,
        (Math.random() * 2 - 1) * 5,
        -2 - Math.random() * 6
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      geometryGroup.add(mesh);
      geometries.push(geometry);
      geometryMaterials.push(material);
      spins.push({
        x: (Math.random() - 0.5) * 0.0015,
        y: (Math.random() - 0.5) * 0.0015,
        z: (Math.random() - 0.5) * 0.0015,
      });
    }

    // ---- Pointer ----------------------------------------------------------
    const mouse = new THREE.Vector3(9999, 9999, 0); // world point on z=0 plane
    const ndc = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    const onPointerMove = (e: PointerEvent) => {
      ndc.x = (e.clientX / window.innerWidth) * 2 - 1;
      ndc.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(ndc, camera);
      raycaster.ray.intersectPlane(plane, mouse);
    };
    if (config.enableMouse && !reduce) {
      window.addEventListener("pointermove", onPointerMove);
    }

    // ---- Render -----------------------------------------------------------
    const dummy = new THREE.Object3D();
    const clock = new THREE.Clock();
    let frameId = 0;

    const renderParticles = (t: number) => {
      let lineIdx = 0;
      const drawn = new Float32Array(count * 3); // resolved positions this frame

      for (let i = 0; i < count; i++) {
        const ix = i * 3;
        // Base position + slow sine drift.
        const drift = reduce ? 0 : Math.sin(t * 0.4 * params.particleSpeed + phases[i]);
        let x = basePositions[ix] * params.particleSpread + params.clusterX;
        let y = basePositions[ix + 1] + drift * 0.4;
        let z = basePositions[ix + 2];

        // Mouse repulsion (eased).
        if (config.enableMouse && !reduce) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < MOUSE_RADIUS && dist > 0.0001) {
            const force = (1 - dist / MOUSE_RADIUS) * 0.6;
            mouseOffset[ix] += (dx / dist) * force;
            mouseOffset[ix + 1] += (dy / dist) * force;
          }
        }
        mouseOffset[ix] *= 0.9;
        mouseOffset[ix + 1] *= 0.9;
        x += mouseOffset[ix];
        y += mouseOffset[ix + 1];

        drawn[ix] = x;
        drawn[ix + 1] = y;
        drawn[ix + 2] = z;

        dummy.position.set(x, y, z);
        dummy.updateMatrix();
        particles.setMatrixAt(i, dummy.matrix);
      }
      particles.instanceMatrix.needsUpdate = true;

      // Connecting lines between near neighbours.
      for (let i = 0; i < count && lineIdx < maxLines; i++) {
        const ix = i * 3;
        for (let j = i + 1; j < count && lineIdx < maxLines; j++) {
          const jx = j * 3;
          const dx = drawn[ix] - drawn[jx];
          const dy = drawn[ix + 1] - drawn[jx + 1];
          const dz = drawn[ix + 2] - drawn[jx + 2];
          if (dx * dx + dy * dy + dz * dz < LINK_DISTANCE * LINK_DISTANCE) {
            const p = lineIdx * 6;
            linePositions[p] = drawn[ix];
            linePositions[p + 1] = drawn[ix + 1];
            linePositions[p + 2] = drawn[ix + 2];
            linePositions[p + 3] = drawn[jx];
            linePositions[p + 4] = drawn[jx + 1];
            linePositions[p + 5] = drawn[jx + 2];
            lineIdx++;
          }
        }
      }
      lineGeometry.setDrawRange(0, lineIdx * 2);
      lineGeometry.attributes.position.needsUpdate = true;
    };

    const renderFrame = () => {
      const t = clock.getElapsedTime();

      renderParticles(t);

      geometryGroup.position.x = params.geometryDriftX;
      geometryGroup.children.forEach((mesh, i) => {
        if (!reduce) {
          mesh.rotation.x += spins[i].x * params.geometrySpeed * 16;
          mesh.rotation.y += spins[i].y * params.geometrySpeed * 16;
          mesh.rotation.z += spins[i].z * params.geometrySpeed * 16;
        }
        geometryMaterials[i].opacity = params.accentIntensity;
      });

      camera.position.z += (params.cameraZ - camera.position.z) * 0.05;
      renderer.render(scene, camera);
    };

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      renderFrame();
    };

    if (reduce) {
      renderFrame(); // single static frame
    } else {
      animate();
    }

    // ---- Resize -----------------------------------------------------------
    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, config.pixelRatioCap)
      );
    };
    window.addEventListener("resize", onResize);

    // Expose params for sibling choreography (set by a later slice).
    sceneParamsRef.current = params;

    // ---- Cleanup ----------------------------------------------------------
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      sceneParamsRef.current = null;

      particleGeometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      geometries.forEach((g) => g.dispose());
      geometryMaterials.forEach((m) => m.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
      scene.clear();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      data-scene-root
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      {fallback && (
        <div
          data-testid="scene-fallback"
          className="scene-fallback"
          style={{ position: "absolute", inset: 0 }}
        />
      )}
    </div>
  );
}

export interface SceneParams {
  particleSpeed: number;
  geometrySpeed: number;
  accentIntensity: number;
  cameraZ: number;
  particleSpread: number;
  clusterX: number;
  geometryDriftX: number;
}
