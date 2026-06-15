import { describe, it, expect, vi, afterEach } from "vitest";
import { prefersReducedMotion } from "./motion";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("prefersReducedMotion", () => {
  it("is true when the user requests reduced motion", () => {
    vi.spyOn(window, "matchMedia").mockReturnValue({
      matches: true,
    } as MediaQueryList);
    expect(prefersReducedMotion()).toBe(true);
  });

  it("is false otherwise", () => {
    vi.spyOn(window, "matchMedia").mockReturnValue({
      matches: false,
    } as MediaQueryList);
    expect(prefersReducedMotion()).toBe(false);
  });

  it("queries the prefers-reduced-motion media feature", () => {
    const spy = vi
      .spyOn(window, "matchMedia")
      .mockReturnValue({ matches: false } as MediaQueryList);
    prefersReducedMotion();
    expect(spy).toHaveBeenCalledWith("(prefers-reduced-motion: reduce)");
  });
});
