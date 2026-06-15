"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { navLinks, personal } from "@/data/content";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const headerRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  // --- Hidden → reveal on scroll past the hero -------------------------------
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const reduce = prefersReducedMotion();

    if (reduce) {
      gsap.set(header, { yPercent: 0, opacity: 1 });
      return;
    }

    gsap.set(header, { yPercent: -100, opacity: 0 });
    const tween = gsap.to(header, {
      yPercent: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
      paused: true,
    });

    const trigger = ScrollTrigger.create({
      start: () => window.innerHeight * 0.9,
      onEnter: () => tween.play(),
      onLeaveBack: () => tween.reverse(),
    });

    return () => {
      trigger.kill();
      tween.kill();
    };
  }, []);

  // --- Overlay: animation, focus management, Escape --------------------------
  useEffect(() => {
    if (!open) return;
    const overlay = overlayRef.current;
    const reduce = prefersReducedMotion();

    if (overlay && !reduce) {
      const links = overlay.querySelectorAll("[data-nav-link]");
      gsap.fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        links,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.1 }
      );
    }

    // Move focus into the overlay.
    const first = overlay?.querySelector<HTMLElement>("[data-nav-link]");
    first?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      // Simple focus trap.
      if (e.key === "Tab" && overlay) {
        const focusable = Array.from(
          overlay.querySelectorAll<HTMLElement>(
            "a[href], button:not([disabled])"
          )
        );
        if (focusable.length === 0) return;
        const firstEl = focusable[0];
        const lastEl = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 py-4 flex items-center justify-between"
        style={{
          backgroundColor: "var(--bg-tertiary)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <a
          href="#home"
          className="font-mono text-sm tracking-wide"
          style={{ color: "var(--text-primary)" }}
        >
          {personal.name}
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-controls="nav-overlay"
          className="flex flex-col gap-1.5 p-2"
        >
          <span
            className="block h-px w-6 transition-transform"
            style={{ backgroundColor: "var(--text-primary)" }}
          />
          <span
            className="block h-px w-6"
            style={{ backgroundColor: "var(--text-primary)" }}
          />
        </button>
      </header>

      {open && (
        <div
          ref={overlayRef}
          id="nav-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8"
          style={{ backgroundColor: "var(--bg-primary)" }}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close navigation"
            className="absolute top-5 right-6 sm:right-10 font-mono text-sm uppercase tracking-widest"
            style={{ color: "var(--text-muted)" }}
          >
            Close ✕
          </button>

          <nav className="flex flex-col items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-nav-link
                onClick={() => setOpen(false)}
                className="font-mono text-2xl sm:text-4xl uppercase tracking-widest transition-colors"
                style={{ color: "var(--text-primary)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--accent)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-primary)")
                }
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="/cv/yarden-biton-cv.pdf"
            download
            data-nav-link
            className="font-mono text-sm uppercase tracking-widest"
            style={{ color: "var(--accent)" }}
          >
            Download CV ↓
          </a>
        </div>
      )}
    </>
  );
}
