"use client";

import { personal, navLinks } from "@/data/content";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 py-5 flex items-center justify-between pointer-events-none">
      <span className="text-[#111] font-semibold text-sm pointer-events-auto">
        @ {personal.name}
      </span>

      <nav className="hidden sm:flex items-center gap-6 pointer-events-auto">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-[#999] text-sm hover:text-[#111] transition-colors duration-200"
          >
            {link.label}
          </a>
        ))}
        <a
          href="/cv/yarden-biton-cv.pdf"
          download
          className="text-sm font-medium text-[#5855d4] hover:text-[#4340c0] transition-colors duration-200"
        >
          CV ↓
        </a>
      </nav>
    </header>
  );
}
