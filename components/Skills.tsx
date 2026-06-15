"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "@/data/content";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

// Short framing per category (preserved from the previous design).
const descriptions: Record<string, string> = {
  Languages: "Writing clean, efficient code across multiple paradigms.",
  Frontend: "Building responsive, interactive UIs with modern frameworks.",
  "Backend / DB": "Designing scalable APIs and data persistence layers.",
  "AI / ML": "Architecting agent-based systems and LLM-powered tools.",
  "DevOps / Tools": "Deploying and managing cloud-native infrastructure.",
  QA: "Ensuring software quality through rigorous testing practices.",
};

export default function Skills() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cards = gsap.utils.toArray<HTMLElement>("[data-skill-card]");

    if (prefersReducedMotion()) {
      gsap.set(cards, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(cards, {
        opacity: 0,
        y: 40,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: root, start: "top 75%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="skills"
      className="relative z-10 px-6 sm:px-10 py-24"
    >
      <div className="max-w-6xl mx-auto">
        <p className="eyebrow mb-4" style={{ color: "var(--accent)" }}>
          SKILLS
        </p>
        <h2
          className="mb-12"
          style={{ color: "var(--text-primary)", fontSize: "clamp(2rem, 4vw, 3rem)" }}
        >
          The stack I build with
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((group) => (
            <div
              key={group.category}
              data-skill-card
              className="rounded-2xl p-6"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderLeft: "2px solid var(--accent)",
              }}
            >
              <p
                className="eyebrow mb-3"
                style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}
              >
                {group.category}
              </p>
              <ul className="flex flex-col gap-1.5">
                {group.items.map((item) => (
                  <li key={item} style={{ color: "var(--text-secondary)" }}>
                    {item}
                  </li>
                ))}
              </ul>
              <p
                className="mt-4 text-sm"
                style={{ color: "var(--text-muted)", lineHeight: 1.6 }}
              >
                {descriptions[group.category] ?? ""}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
