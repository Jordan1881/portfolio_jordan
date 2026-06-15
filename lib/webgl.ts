/**
 * Feature-detect WebGL so the 3D scene can fall back to a CSS gradient when
 * the GPU/context is unavailable, instead of rendering a broken canvas.
 */
export function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}
