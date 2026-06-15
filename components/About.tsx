"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personal } from "@/data/content";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

// Manifesto lines, drawn from real bio/focus content.
const LINES = [
  personal.bio,
  ...personal.focus.split(/(?<=\.)\s+/).filter(Boolean),
];

export default function About() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const lines = gsap.utils.toArray<HTMLElement>("[data-reveal-line]");

    if (prefersReducedMotion()) {
      gsap.set(lines, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      lines.forEach((line) => {
        gsap.fromTo(
          line,
          { opacity: 0.12, y: 30 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: line,
              start: "top 85%",
              end: "top 45%",
              scrub: true,
            },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="about"
      className="relative z-10 px-6 sm:px-10"
      style={{ paddingTop: "clamp(120px, 16vw, 160px)", paddingBottom: "clamp(120px, 16vw, 160px)" }}
    >
      <div className="max-w-[700px] mx-auto">
        <p className="eyebrow mb-8" style={{ color: "var(--accent)" }}>
          ABOUT
        </p>

        <div className="flex flex-col gap-6">
          {LINES.map((line, i) => (
            <p
              key={i}
              data-reveal-line
              style={{
                color: i === 0 ? "var(--text-primary)" : "var(--text-secondary)",
                fontSize: i === 0 ? "clamp(1.4rem, 3vw, 1.9rem)" : "1.0625rem",
                lineHeight: 1.6,
                fontFamily: i === 0 ? "var(--font-display)" : "var(--font-body)",
              }}
            >
              {line}
            </p>
          ))}
        </div>

        <div
          className="mt-14 grid sm:grid-cols-2 gap-8 pt-8"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <div data-reveal-line>
            <p className="eyebrow mb-2" style={{ color: "var(--text-muted)" }}>
              EDUCATION
            </p>
            <p style={{ color: "var(--text-primary)", fontWeight: 500 }}>
              B.Sc. Information Systems
            </p>
            <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
              Yezreel Valley College, Israel · 3rd Year
            </p>
          </div>
          <div data-reveal-line>
            <p className="eyebrow mb-2" style={{ color: "var(--text-muted)" }}>
              BASED IN
            </p>
            <p style={{ color: "var(--text-primary)", fontWeight: 500 }}>
              Israel 🇮🇱
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
