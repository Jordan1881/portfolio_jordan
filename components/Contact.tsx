"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personal } from "@/data/content";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const links = [
  { label: "GitHub", href: personal.github, value: "github.com/Jordan1881" },
  { label: "LinkedIn", href: personal.linkedin, value: "linkedin.com/in/yarden-biton" },
  { label: "Email", href: `mailto:${personal.email}`, value: personal.email },
];

export default function Contact() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = gsap.utils.toArray<HTMLElement>("[data-contact-reveal]");

    if (prefersReducedMotion()) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(items, {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: root, start: "top 80%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const hoverIn = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefersReducedMotion()) return;
    gsap.to(e.currentTarget, {
      x: 8,
      color: "#5855d4",
      duration: 0.3,
      ease: "power2.out",
    });
  };
  const hoverOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefersReducedMotion()) return;
    gsap.to(e.currentTarget, {
      x: 0,
      color: "#e8e8e8",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={rootRef}
      id="contact"
      className="relative z-10 px-6 sm:px-10 py-32 min-h-screen flex flex-col justify-center"
    >
      <div className="max-w-4xl mx-auto w-full">
        <p
          className="eyebrow mb-4"
          data-contact-reveal
          style={{ color: "var(--accent)" }}
        >
          CONTACT
        </p>
        <h2
          data-contact-reveal
          className="mb-16"
          style={{
            color: "var(--text-primary)",
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
          }}
        >
          Let&apos;s build something.
        </h2>

        <ul className="flex flex-col">
          {links.map((link) => (
            <li
              key={link.label}
              data-contact-reveal
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <a
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={
                  link.href.startsWith("mailto:")
                    ? undefined
                    : "noopener noreferrer"
                }
                onMouseEnter={hoverIn}
                onMouseLeave={hoverOut}
                className="flex items-baseline justify-between gap-4 py-6 font-mono"
                style={{ color: "var(--text-secondary)" }}
              >
                <span className="uppercase tracking-widest text-sm">
                  {link.label}
                </span>
                <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                  {link.value}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p
          data-contact-reveal
          className="mt-20 font-mono text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          {personal.name} · Built with Next.js, Three.js & GSAP ·{" "}
          {new Date().getFullYear()}
        </p>
      </div>
    </section>
  );
}
