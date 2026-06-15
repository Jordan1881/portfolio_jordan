import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const css = readFileSync(resolve(__dirname, "globals.css"), "utf8");

describe("design tokens", () => {
  const tokens = [
    "--bg-primary",
    "--bg-secondary",
    "--bg-tertiary",
    "--text-primary",
    "--text-secondary",
    "--text-muted",
    "--accent",
    "--accent-glow",
    "--border",
  ];

  it.each(tokens)("defines %s", (token) => {
    expect(css).toContain(token);
  });

  it("uses the dark primary background", () => {
    expect(css).toMatch(/--bg-primary:\s*#121218/i);
  });

  it("keeps the indigo accent", () => {
    expect(css).toMatch(/--accent:\s*#5855d4/i);
  });

  it("exposes the loaded font family variables", () => {
    expect(css).toContain("--font-space-grotesk");
    expect(css).toContain("--font-inter");
    expect(css).toContain("--font-jetbrains-mono");
  });
});
