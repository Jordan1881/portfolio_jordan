/**
 * Whether the user has requested reduced motion. Components use this to skip
 * GSAP entrance/scroll animations and hold the 3D scene static, satisfying the
 * `prefers-reduced-motion` accessibility requirement.
 *
 * Returns false during SSR (no `window`).
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
