"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export interface ClaudeSkill {
  name: string;
  type: string;
  description: string;
  tags: string[];
}

export const claudeSkills: ClaudeSkill[] = [
  {
    name: "agent-planner",
    type: "architecture",
    description:
      "Designs agents and multi-agent systems. A 5-phase workflow — problem framing, tool design, orchestration pattern, failure handling, output artifact — that guides from a vague idea to a concrete architecture.",
    tags: ["Architecture", "Tool Use", "Orchestration"],
  },
  {
    name: "ai-cost-optimizer",
    type: "cost",
    description:
      "Audits LLM spending and reduces API costs with real dollar numbers. Covers model right-sizing, prompt caching, Batch API, output length control, and semantic caching — ranked by ROI.",
    tags: ["Cost", "Token Optimization", "Model Routing"],
  },
  {
    name: "skill-forge",
    type: "automation",
    description:
      "Builds or audits Claude Code skills. BUILD mode creates a skill from scratch; AUDIT mode scores an existing skill across 9 dimensions against a quality rubric with before/after diffs.",
    tags: ["Skill Building", "Audit", "Claude Code"],
  },
  {
    name: "explain-code",
    type: "developer experience",
    description:
      "Explains any codebase using analogies, ASCII flow diagrams, and step-by-step walkthroughs — not just what the code does, but why it's built that way.",
    tags: ["Diagrams", "Analogies", "Teaching"],
  },
];

export default function ClaudeSkills() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cards = gsap.utils.toArray<HTMLElement>("[data-claude-skill]");

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
      id="claude-skills"
      className="relative z-10 px-6 sm:px-10 py-24"
    >
      <div className="max-w-6xl mx-auto">
        <p className="eyebrow mb-4" style={{ color: "var(--accent)" }}>
          CLAUDE SKILLS
        </p>
        <h2
          className="mb-3"
          style={{ color: "var(--text-primary)", fontSize: "clamp(2rem, 4vw, 3rem)" }}
        >
          Tooling I built for Claude
        </h2>
        <p
          className="mb-12 max-w-xl"
          style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.6 }}
        >
          Custom skill modules I built to extend Claude&apos;s capabilities for
          engineering workflows.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {claudeSkills.map((skill) => (
            <div
              key={skill.name}
              data-claude-skill
              className="rounded-2xl p-6"
              style={{
                backgroundColor: "var(--bg-secondary)",
                border: "1px solid var(--accent)",
                boxShadow: "0 0 40px var(--accent-glow)",
              }}
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <p
                  className="font-mono"
                  style={{ color: "var(--text-primary)", fontWeight: 500 }}
                >
                  /{skill.name}
                </p>
                <span
                  className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full"
                  style={{
                    color: "var(--accent)",
                    backgroundColor: "var(--accent-glow)",
                  }}
                >
                  {skill.type}
                </span>
              </div>
              <p
                className="text-sm mb-4"
                style={{ color: "var(--text-muted)", lineHeight: 1.6 }}
              >
                {skill.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {skill.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] px-2 py-0.5 rounded-full"
                    style={{
                      color: "var(--text-muted)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
