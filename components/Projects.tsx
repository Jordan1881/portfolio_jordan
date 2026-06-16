"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/content";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const panels = gsap.utils.toArray<HTMLElement>("[data-project]");

    if (prefersReducedMotion()) {
      panels.forEach((p) => gsap.set(p, { opacity: 1, y: 0 }));
      return;
    }

    const ctx = gsap.context(() => {
      // Natural continuous flow: each project fades + slides up as it enters
      // the viewport. No pinning, no sticking.
      panels.forEach((panel) => {
        const tags = panel.querySelectorAll("[data-tag]");

        gsap.from(panel, {
          opacity: 0,
          y: 60,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.from(tags, {
          opacity: 0,
          y: 12,
          stagger: 0.05,
          scrollTrigger: { trigger: panel, start: "top 72%" },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="projects" className="relative z-10">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 pt-24">
        <p className="eyebrow mb-4" style={{ color: "var(--accent)" }}>
          PROJECTS
        </p>
      </div>

      {projects.map((project) => (
        <div
          key={project.slug}
          data-project={project.slug}
          className="py-16 sm:py-24"
        >
          <div className="max-w-6xl mx-auto w-full px-6 sm:px-10 grid md:grid-cols-5 gap-10 items-center">
            {/* Left column — 60% */}
            <div className="md:col-span-3">
              <h3
                style={{
                  color: "var(--text-primary)",
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  lineHeight: 1.05,
                }}
              >
                {project.name}
              </h3>

              <p
                className="mt-4 max-w-md"
                style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}
              >
                {project.description}
              </p>

              <ul className="mt-5 flex flex-col gap-2 max-w-md">
                {project.highlights.map((h, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <span style={{ color: "var(--accent)" }}>·</span>
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    data-tag
                    className="font-mono text-xs px-3 py-1 rounded-full"
                    style={{
                      color: "var(--text-secondary)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-5">
                <a
                  href={project.live ?? project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm"
                  style={{ color: "var(--accent)" }}
                >
                  View Project →
                </a>
                <Link
                  href={`/projects/${project.slug}`}
                  className="font-mono text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  Case Study →
                </Link>
              </div>
            </div>

            {/* Right column — 40% project preview */}
            <div className="md:col-span-2">
              <div
                className="relative w-full overflow-hidden rounded-2xl"
                style={{
                  aspectRatio: "4 / 3",
                  backgroundColor: "var(--bg-secondary)",
                  border: "1px solid var(--border)",
                }}
              >
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`${project.name} preview`}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="font-mono text-xs uppercase tracking-widest"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Screenshot
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
