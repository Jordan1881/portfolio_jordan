"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { projects, ProjectStatus } from "@/data/content";

const thumbnailStyles: Record<string, string> = {
  Questly: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f64f59 100%)",
  "Finance AI Agent": "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
  "Notesmith AI": "linear-gradient(135deg, #f7971e 0%, #ffd200 50%, #f7971e 100%)",
  ArtAffinity: "linear-gradient(135deg, #fc4a1a 0%, #f7b733 50%, #fc4a1a 100%)",
};

const thumbnailLabels: Record<string, string> = {
  Questly: "QUESTLY",
  "Finance AI Agent": "FINANCE AI",
  "Notesmith AI": "NOTESMITH",
  ArtAffinity: "ARTAFFINITY",
};

const statusStyles: Record<ProjectStatus, string> = {
  Live: "bg-[#dcfce7] text-[#166534]",
  "In Development": "bg-[#fef9c3] text-[#854d0e]",
  Prototype: "bg-[#f3f4f6] text-[#374151]",
};

export default function Projects() {
  return (
    <section id="projects" className="py-24 border-t border-[#e8e8e4]">
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-[#111]">
            Impressive Works
          </h2>
          <p className="text-[#999] text-sm mt-2 max-w-xs leading-relaxed">
            A selection of projects that showcase my work in AI and engineering.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="group"
            >
              {/* Thumbnail */}
              <a
                href={project.live ?? project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative overflow-hidden rounded-2xl mb-3"
                style={{
                  background: thumbnailStyles[project.name],
                  aspectRatio: "16/9",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="text-white/20 font-black tracking-tighter select-none"
                    style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
                  >
                    {thumbnailLabels[project.name]}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-black/30 text-white/80 backdrop-blur-sm font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="text-white text-sm">↗</span>
                </div>
              </a>

              {/* Label row */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full border border-[#ccc] flex items-center justify-center text-[#666] text-xs flex-shrink-0 mt-0.5">
                  →
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <a
                      href={project.live ?? project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#111] font-semibold hover:text-[#5855d4] transition-colors duration-200"
                    >
                      {project.name}
                    </a>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${statusStyles[project.status]}`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <p className="text-[#999] text-xs leading-relaxed mb-2">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-1 mb-3">
                    {project.highlights.map((h, idx) => (
                      <li
                        key={idx}
                        className="text-[#777] text-xs leading-relaxed flex items-start gap-1.5"
                      >
                        <span className="text-[#5855d4] flex-shrink-0 mt-px">·</span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-[#5855d4] text-xs font-medium hover:underline underline-offset-2"
                  >
                    Case Study →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
