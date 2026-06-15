/**
 * Viewport-aware budget for the persistent 3D scene.
 *
 * Mobile devices get fewer particles and geometries, a lower pixel-ratio cap,
 * and no mouse interaction — keeping the background cheap on small/low-power
 * devices. Pure function so the policy is unit-testable without a renderer.
 */

export const MOBILE_BREAKPOINT = 768;

export interface SceneConfig {
  /** Number of network particles to spawn. */
  particleCount: number;
  /** Number of large floating geometries. */
  geometryCount: number;
  /** Upper bound for renderer.setPixelRatio. */
  pixelRatioCap: number;
  /** Whether pointer interaction nudges nearby particles. */
  enableMouse: boolean;
}

export function getSceneConfig(viewportWidth: number): SceneConfig {
  const isMobile = viewportWidth < MOBILE_BREAKPOINT;

  if (isMobile) {
    return {
      particleCount: 100,
      geometryCount: 3,
      pixelRatioCap: 1.5,
      enableMouse: false,
    };
  }

  return {
    particleCount: 260,
    geometryCount: 5,
    pixelRatioCap: 2,
    enableMouse: true,
  };
}
