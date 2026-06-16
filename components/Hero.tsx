"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { personal } from "@/data/content";
import { prefersReducedMotion } from "@/lib/motion";

const TAGLINE = "I design and build AI-powered systems that solve real problems.";

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero-name]", { y: 40, opacity: 0, duration: 0.8 })
        .from(
          "[data-hero-title]",
          { y: 24, opacity: 0, duration: 0.6 },
          "-=0.3"
        )
        .from(
          "[data-hero-tagline]",
          { y: 20, opacity: 0, duration: 0.5 },
          "-=0.2"
        )
        .from(
          "[data-hero-scroll]",
          { opacity: 0, duration: 0.4 },
          "-=0.1"
        );

      // Looping bounce on the scroll indicator.
      gsap.to("[data-hero-chevron]", {
        y: 8,
        duration: 0.9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6"
    >
      {/* Profile portrait — centered behind the name, softly faded into the bg.
          Above the 3D canvas, below the hero text. Decorative only. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
      >
        <div
          className="relative"
          style={{
            height: "82vh",
            width: "min(620px, 88vw)",
            opacity: 0.6,
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 60% at 50% 45%, #000 35%, transparent 78%)",
            maskImage:
              "radial-gradient(ellipse 60% 60% at 50% 45%, #000 35%, transparent 78%)",
          }}
        >
          <Image
            src="/image-no-background.png"
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 88vw, 620px"
            className="object-contain object-bottom"
          />
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <h1
          data-hero-name
          className="font-bold tracking-tight"
          style={{
            color: "var(--text-primary)",
            fontSize: "clamp(3.5rem, 9vw, 6.5rem)",
            lineHeight: 1.02,
          }}
        >
          {personal.name}
        </h1>

        <p
          data-hero-title
          className="mt-5 font-mono uppercase tracking-[0.08em]"
          style={{ color: "var(--text-muted)", fontSize: "clamp(0.95rem, 2vw, 1.25rem)" }}
        >
          {personal.title}
        </p>

        <p
          data-hero-tagline
          className="mt-8 max-w-2xl"
          style={{
            color: "var(--text-secondary)",
            fontSize: "clamp(1.25rem, 3vw, 1.625rem)",
            lineHeight: 1.5,
          }}
        >
          {TAGLINE}
        </p>
      </div>

      <a
        href="#about"
        data-hero-scroll
        aria-label="Scroll to about section"
        className="absolute bottom-10 z-10 flex flex-col items-center gap-2 font-mono text-xs uppercase tracking-widest"
        style={{ color: "var(--text-muted)" }}
      >
        Scroll
        <span data-hero-chevron aria-hidden="true" className="text-lg leading-none">
          ↓
        </span>
      </a>
    </section>
  );
}
