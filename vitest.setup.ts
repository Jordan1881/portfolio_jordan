import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

// jsdom lacks matchMedia — default to "no match" (e.g. reduced-motion off).
// Individual tests can override window.matchMedia as needed.
if (!window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

// jsdom lacks ResizeObserver / IntersectionObserver, used by the 3D canvas
// and scroll components.
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
  takeRecords: vi.fn(() => []),
  root: null,
  rootMargin: "",
  thresholds: [],
})) as unknown as typeof IntersectionObserver;

// GSAP touches layout/scroll APIs jsdom doesn't implement. Component tests
// verify rendered content and structure, not animation, so stub the animation
// surface to keep them fast and deterministic.
vi.mock("gsap", () => {
  const tween = { kill: vi.fn(), progress: vi.fn(), pause: vi.fn() };
  const timeline = {
    to: vi.fn(() => timeline),
    from: vi.fn(() => timeline),
    fromTo: vi.fn(() => timeline),
    set: vi.fn(() => timeline),
    add: vi.fn(() => timeline),
    kill: vi.fn(),
  };
  const gsap = {
    registerPlugin: vi.fn(),
    to: vi.fn(() => tween),
    from: vi.fn(() => tween),
    fromTo: vi.fn(() => tween),
    set: vi.fn(),
    timeline: vi.fn(() => timeline),
    context: vi.fn((fn: () => void) => {
      if (typeof fn === "function") fn();
      return { revert: vi.fn(), kill: vi.fn() };
    }),
    killTweensOf: vi.fn(),
    utils: { toArray: vi.fn((x: unknown) => (Array.isArray(x) ? x : [x])) },
  };
  return { gsap, default: gsap };
});

vi.mock("gsap/ScrollTrigger", () => {
  const ScrollTrigger = {
    create: vi.fn(() => ({ kill: vi.fn() })),
    refresh: vi.fn(),
    getAll: vi.fn(() => []),
    killAll: vi.fn(),
  };
  return { ScrollTrigger, default: ScrollTrigger };
});
