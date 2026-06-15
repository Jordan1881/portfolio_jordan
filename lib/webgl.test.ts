import { describe, it, expect, vi, afterEach } from "vitest";
import { isWebGLAvailable } from "./webgl";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("isWebGLAvailable", () => {
  it("returns true when a webgl context can be created", () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(
      {} as RenderingContext
    );
    expect(isWebGLAvailable()).toBe(true);
  });

  it("returns false when no context is available", () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
    expect(isWebGLAvailable()).toBe(false);
  });

  it("returns false when context creation throws", () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(() => {
      throw new Error("no webgl");
    });
    expect(isWebGLAvailable()).toBe(false);
  });
});
