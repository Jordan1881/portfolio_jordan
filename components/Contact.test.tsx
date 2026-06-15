import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Contact from "./Contact";
import { personal } from "@/data/content";

describe("Contact", () => {
  it("renders the CONTACT eyebrow and #contact anchor", () => {
    const { container } = render(<Contact />);
    expect(screen.getByText("CONTACT")).toBeInTheDocument();
    expect(container.querySelector("#contact")).toBeInTheDocument();
  });

  it("renders the closing headline", () => {
    render(<Contact />);
    expect(screen.getByText(/let's build something/i)).toBeInTheDocument();
  });

  it("links GitHub, LinkedIn, and Email", () => {
    render(<Contact />);
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
      "href",
      personal.github
    );
    expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
      "href",
      personal.linkedin
    );
    expect(screen.getByRole("link", { name: /email/i })).toHaveAttribute(
      "href",
      `mailto:${personal.email}`
    );
  });
});
