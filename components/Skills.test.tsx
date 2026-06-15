import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Skills from "./Skills";
import { skills } from "@/data/content";

describe("Skills", () => {
  it("renders the SKILLS eyebrow and #skills anchor", () => {
    const { container } = render(<Skills />);
    expect(screen.getByText("SKILLS")).toBeInTheDocument();
    expect(container.querySelector("#skills")).toBeInTheDocument();
  });

  it("renders every category and its items", () => {
    render(<Skills />);
    for (const group of skills) {
      expect(screen.getByText(group.category)).toBeInTheDocument();
      for (const item of group.items) {
        expect(screen.getByText(item)).toBeInTheDocument();
      }
    }
  });
});
