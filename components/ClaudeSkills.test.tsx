import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ClaudeSkills, { claudeSkills } from "./ClaudeSkills";

describe("ClaudeSkills", () => {
  it("renders the CLAUDE SKILLS eyebrow and #claude-skills anchor", () => {
    const { container } = render(<ClaudeSkills />);
    expect(screen.getByText("CLAUDE SKILLS")).toBeInTheDocument();
    expect(container.querySelector("#claude-skills")).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    render(<ClaudeSkills />);
    expect(
      screen.getByText(/extend claude's capabilities/i)
    ).toBeInTheDocument();
  });

  it("renders every custom skill with its name", () => {
    render(<ClaudeSkills />);
    for (const skill of claudeSkills) {
      expect(screen.getByText(new RegExp(skill.name))).toBeInTheDocument();
    }
  });
});
