import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "./Hero";
import { personal } from "@/data/content";

describe("Hero", () => {
  it("renders the name as the top-level heading", () => {
    render(<Hero />);
    expect(
      screen.getByRole("heading", { level: 1, name: new RegExp(personal.name, "i") })
    ).toBeInTheDocument();
  });

  it("renders the title and tagline", () => {
    render(<Hero />);
    expect(screen.getByText(personal.title)).toBeInTheDocument();
    expect(
      screen.getByText(/build ai-powered systems/i)
    ).toBeInTheDocument();
  });

  it("is the #home section anchor", () => {
    const { container } = render(<Hero />);
    expect(container.querySelector("#home")).toBeInTheDocument();
  });

  it("has a scroll indicator linking to the next section", () => {
    render(<Hero />);
    const indicator = screen.getByLabelText(/scroll/i);
    expect(indicator).toBeInTheDocument();
  });
});
