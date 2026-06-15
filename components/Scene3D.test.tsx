import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

// Control WebGL availability per test.
vi.mock("@/lib/webgl", () => ({
  isWebGLAvailable: vi.fn(),
}));

import Scene3D from "./Scene3D";
import { isWebGLAvailable } from "@/lib/webgl";

const mockedWebGL = vi.mocked(isWebGLAvailable);

describe("Scene3D", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the CSS gradient fallback when WebGL is unavailable", () => {
    mockedWebGL.mockReturnValue(false);
    render(<Scene3D />);
    expect(screen.getByTestId("scene-fallback")).toBeInTheDocument();
  });

  it("mounts without crashing and degrades gracefully when context creation fails", () => {
    // WebGL reported available, but no real GL context exists in jsdom — the
    // component must catch the failure and fall back rather than throw.
    mockedWebGL.mockReturnValue(true);
    expect(() => render(<Scene3D />)).not.toThrow();
    expect(screen.getByTestId("scene-fallback")).toBeInTheDocument();
  });

  it("is decorative and non-interactive for assistive tech", () => {
    mockedWebGL.mockReturnValue(false);
    const { container } = render(<Scene3D />);
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveAttribute("aria-hidden", "true");
    expect(root.style.pointerEvents).toBe("none");
  });
});
