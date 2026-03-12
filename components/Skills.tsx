"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/content";

const descriptions: Record<string, string> = {
  Languages: "Writing clean, efficient code across multiple paradigms.",
  Frontend: "Building responsive, interactive UIs with modern frameworks.",
  "Backend / DB": "Designing scalable APIs and data persistence layers.",
  "AI / ML": "Architecting agent-based systems and LLM-powered tools.",
  "DevOps / Tools": "Deploying and managing cloud-native infrastructure.",
  QA: "Ensuring software quality through rigorous testing practices.",
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-[#111] text-white">
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-black tracking-tighter leading-none">
            Skills that fuel
            <br />
            my passion
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-2xl bg-[#1a1a1a] p-6 border border-[#2a2a2a] hover:border-[#5855d4]/40 transition-colors duration-300"
            >
              <div className="flex flex-wrap gap-2 mb-5">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2.5 py-1 rounded-full bg-[#242424] text-[#aaa] border border-[#333] font-mono"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <h3 className="text-white font-semibold text-base">{group.category}</h3>
              <p className="text-[#555] text-xs mt-1 leading-relaxed">
                {descriptions[group.category] ?? ""}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
