"use client";

import { motion } from "framer-motion";

const skills = [
  {
    name: "agent-planner",
    version: "v1.1.0",
    domain: "AI Engineering",
    description:
      "Designs agents and multi-agent systems. A 5-phase workflow problem framing, tool design, orchestration pattern, failure handling, output artifact that guides from a vague idea to a concrete architecture. Distinguishes when to use an agent vs. a simpler prompt chain, and surfaces latency/cost tradeoffs at every step.",
    tags: ["Architecture", "Tool Use", "Orchestration"],
  },
  {
    name: "ai-cost-optimizer",
    version: "v1.0.0",
    domain: "AI Engineering",
    description:
      "Audits LLM spending and reduces API costs with real dollar numbers. Covers model right-sizing, prompt caching, Batch API, output length control, and semantic caching. Works from a baseline cost calculation and ranks optimizations by ROI never gives a recommendation without attaching a number.",
    tags: ["Cost", "Token Optimization", "Model Routing"],
  },
  {
    name: "skill-forge",
    version: "v1.0.0",
    domain: "AI Engineering",
    description:
      "Builds or audits Claude Code skills. Two modes: BUILD (new skill from scratch with qualification gates, interview, design proposal, and CLAUDE.md integration) and AUDIT (scores an existing skill across 9 dimensions against a quality rubric, then shows before/after diffs for every gap).",
    tags: ["Skill Building", "Audit", "Claude Code"],
  },
  {
    name: "explain-code",
    version: "v1.0.0",
    domain: "Developer Experience",
    description:
      "Explains any codebase using analogies, ASCII flow diagrams, step-by-step walkthroughs, and a common gotcha. Makes complex code understandable at the right level not just what the code does, but why it's built that way.",
    tags: ["Diagrams", "Analogies", "Teaching"],
  },
];

export default function ClaudeSkills() {
  return (
    <section className="py-24 bg-[#111] text-white">
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-[#444] text-xs font-mono uppercase tracking-widest mb-4">
            AI Tooling
          </p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tighter leading-none mb-4">
            Beyond using AI 
            <br />
            <span className="text-[#5855d4]">building the tools</span>
            <br />
            that make AI more capable.
          </h2>
          <p className="text-[#555] text-sm max-w-lg leading-relaxed">
            I design and build{" "}
            <span className="text-[#888] font-mono bg-[#1a1a1a] px-1.5 py-0.5 rounded text-xs">
              SKILL.md
            </span>{" "}
            files structured instruction sets that give Claude Code a specialized mode for a
            given domain. Each skill encodes a workflow, quality bar, and output standard.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="rounded-2xl border border-[#1e1e1e] bg-[#161616] p-6 hover:border-[#5855d4]/30 transition-colors duration-300 group"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <p className="text-white font-semibold text-sm font-mono group-hover:text-[#5855d4] transition-colors duration-200">
                    /{skill.name}
                  </p>
                  <p className="text-[#444] text-[10px] font-mono mt-0.5">{skill.domain}</p>
                </div>
                <span className="text-[#333] text-[10px] font-mono flex-shrink-0 mt-0.5">
                  {skill.version}
                </span>
              </div>

              {/* Description */}
              <p className="text-[#666] text-xs leading-relaxed mb-4">
                {skill.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {skill.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-[#1e1e1e] border border-[#2a2a2a] text-[#555] font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-[#333] text-xs font-mono mt-8 text-center"
        >
          This reflects a tooling-level understanding of AI systems not just prompt-level
          interaction.
        </motion.p>
      </div>
    </section>
  );
}
