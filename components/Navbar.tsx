"use client";

import { personal } from "@/data/content";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 py-5 flex items-start justify-between pointer-events-none">
      <span className="text-[#111] font-semibold text-sm pointer-events-auto">
        @ {personal.name}
      </span>
      
    </header>
  );
}
