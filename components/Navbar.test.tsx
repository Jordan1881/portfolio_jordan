import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "./Navbar";
import { navLinks, personal } from "@/data/content";

describe("Navbar", () => {
  it("shows the name/logo and a closed menu toggle", () => {
    render(<Navbar />);
    expect(screen.getByText(new RegExp(personal.name, "i"))).toBeInTheDocument();
    const toggle = screen.getByRole("button", { name: /menu/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("opens the overlay with all section links when toggled", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(screen.getByRole("button", { name: /open menu/i }));

    const overlay = screen.getByRole("dialog");
    for (const link of navLinks) {
      expect(
        screen.getByRole("link", { name: link.label })
      ).toHaveAttribute("href", link.href);
    }
    expect(screen.getByRole("button", { name: /menu/i })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
    expect(overlay).toBeInTheDocument();
  });

  it("closes the overlay on Escape", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(screen.getByRole("button", { name: /open menu/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /menu/i })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });

  it("closes the overlay when a link is clicked", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(screen.getByRole("button", { name: /open menu/i }));
    await user.click(screen.getByRole("link", { name: "About" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
