import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Projects from "./Projects";
import { projects } from "@/data/content";

describe("Projects", () => {
  it("renders the PROJECTS eyebrow and #projects anchor", () => {
    const { container } = render(<Projects />);
    expect(screen.getByText("PROJECTS")).toBeInTheDocument();
    expect(container.querySelector("#projects")).toBeInTheDocument();
  });

  it("renders every project with its name and description", () => {
    render(<Projects />);
    for (const p of projects) {
      expect(
        screen.getByRole("heading", { name: p.name })
      ).toBeInTheDocument();
      expect(screen.getByText(p.description)).toBeInTheDocument();
    }
  });

  it("renders each project's tech stack tags", () => {
    const { container } = render(<Projects />);
    for (const p of projects) {
      const panel = container.querySelector(
        `[data-project="${p.slug}"]`
      ) as HTMLElement;
      expect(panel).toBeTruthy();
      for (const tech of p.stack) {
        expect(within(panel).getByText(tech)).toBeInTheDocument();
      }
    }
  });

  it("links each project to its case study", () => {
    const { container } = render(<Projects />);
    for (const p of projects) {
      const panel = container.querySelector(
        `[data-project="${p.slug}"]`
      ) as HTMLElement;
      const caseStudy = within(panel).getByRole("link", { name: /case study/i });
      expect(caseStudy).toHaveAttribute("href", `/projects/${p.slug}`);
    }
  });
});
