import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import About from "./About";

describe("About", () => {
  it("renders the ABOUT eyebrow", () => {
    render(<About />);
    expect(screen.getByText("ABOUT")).toBeInTheDocument();
  });

  it("is the #about section anchor", () => {
    const { container } = render(<About />);
    expect(container.querySelector("#about")).toBeInTheDocument();
  });

  it("preserves the focus/manifesto content", () => {
    render(<About />);
    expect(screen.getByText(/tool-based AI systems/i)).toBeInTheDocument();
  });

  it("preserves the education detail", () => {
    render(<About />);
    expect(screen.getByText(/B\.Sc\. Information Systems/i)).toBeInTheDocument();
  });
});
