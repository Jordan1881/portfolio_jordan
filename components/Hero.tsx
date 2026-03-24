"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-end pb-20 relative overflow-hidden">
      {/* Photo — right-aligned, fades into the page background */}
      <div className="absolute inset-0 flex justify-end items-end pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative h-[90%] w-[45%] max-w-[600px]"
        >
          <Image
            src="/image-no-background.png"
            alt="Yarden Biton"
            fill
            className="object-contain object-bottom"
            priority
          />
        </motion.div>
      </div>

      {/* Text content */}
      <div className="max-w-5xl mx-auto w-full px-6 sm:px-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[#999] text-sm mb-6 font-mono tracking-widest">
            available for opportunities ↗
          </p>

          <h1
            className="font-black leading-[0.88] tracking-tighter text-[#111] lowercase"
            style={{ fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)" }}
          >
            building
            <br />
            <span className="text-[#5855d4]">ai systems</span>
            <br />
            & real products
          </h1>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-12">
            <p className="text-[#666] text-base max-w-sm leading-relaxed">
              Third-year Information Systems student at Yezreel Valley College.
              Specializing in AI agent architectures and full-stack development.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 bg-[#111] text-white text-sm font-medium px-5 py-3 rounded-full hover:bg-[#5855d4] transition-colors duration-300 whitespace-nowrap"
              >
                See my work ↓
              </a>
              <a
                href="/cv/yarden-biton-cv.pdf"
                download
                className="inline-flex items-center gap-2 border border-[#ccc] text-[#111] text-sm font-medium px-5 py-3 rounded-full hover:border-[#5855d4] hover:text-[#5855d4] transition-colors duration-300 whitespace-nowrap"
              >
                Resume ↓
              </a>
            </div>
          </div>

          {/* Currently Building */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 flex items-center gap-3 flex-wrap"
          >
            <span className="text-[#bbb] text-xs font-mono tracking-wide">
              currently building →
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[#666]">
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: "#5855d4" }}
              />
              Questly
              <span className="text-[#bbb] font-mono ml-0.5">React/TS</span>
            </span>
            <span className="text-[#ddd] text-xs">·</span>
            <span className="flex items-center gap-1.5 text-xs text-[#666]">
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: "#22c55e" }}
              />
              Finance AI Agent
              <span className="text-[#bbb] font-mono ml-0.5">Python/MCP</span>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
