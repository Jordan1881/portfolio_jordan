import { describe, it, expect } from "vitest";
import { getSceneConfig, MOBILE_BREAKPOINT } from "./scene-config";

describe("getSceneConfig", () => {
  it("uses the full desktop budget on wide viewports", () => {
    const config = getSceneConfig(1440);
    expect(config.particleCount).toBeGreaterThanOrEqual(200);
    expect(config.particleCount).toBeLessThanOrEqual(300);
    expect(config.geometryCount).toBe(5);
    expect(config.pixelRatioCap).toBe(2);
    expect(config.enableMouse).toBe(true);
  });

  it("reduces the budget below the mobile breakpoint", () => {
    const config = getSceneConfig(MOBILE_BREAKPOINT - 1);
    expect(config.particleCount).toBeGreaterThanOrEqual(80);
    expect(config.particleCount).toBeLessThanOrEqual(120);
    expect(config.geometryCount).toBe(3);
    expect(config.pixelRatioCap).toBe(1.5);
    expect(config.enableMouse).toBe(false);
  });

  it("treats the breakpoint itself as desktop", () => {
    expect(getSceneConfig(MOBILE_BREAKPOINT).geometryCount).toBe(5);
  });
});
