"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
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
      panels.forEach((panel) => {
        const tags = panel.querySelectorAll("[data-tag]");

        // Pin each project for a screen of scroll.
        ScrollTrigger.create({
          trigger: panel,
          start: "top top",
          end: "+=100%",
          pin: true,
          pinSpacing: true,
        });

        // Fade in as it enters, out as it leaves.
        gsap.fromTo(
          panel,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 80%",
              end: "top 30%",
              scrub: true,
            },
          }
        );
        gsap.to(panel, {
          opacity: 0,
          y: -30,
          ease: "power2.in",
          scrollTrigger: {
            trigger: panel,
            start: "bottom 60%",
            end: "bottom top",
            scrub: true,
          },
        });

        // Stagger the tech tags in.
        gsap.from(tags, {
          opacity: 0,
          y: 12,
          stagger: 0.05,
          scrollTrigger: { trigger: panel, start: "top 70%" },
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
          className="min-h-screen flex items-center"
        >
          <div className="max-w-6xl mx-auto w-full px-6 sm:px-10 grid md:grid-cols-5 gap-10 items-center">
            {/* Left column — 60% */}
            <div className="md:col-span-3">
              <h3
                style={{
                  color: "var(--text-primary)",
                  fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
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

            {/* Right column — 40% screenshot placeholder */}
            <div className="md:col-span-2">
              <div
                className="w-full rounded-2xl flex items-center justify-center"
                style={{
                  aspectRatio: "4 / 3",
                  backgroundColor: "var(--bg-secondary)",
                  border: "1px solid var(--border)",
                }}
              >
                <span
                  className="font-mono text-xs uppercase tracking-widest"
                  style={{ color: "var(--text-muted)" }}
                >
                  Screenshot
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
