"use client";

import { motion } from "framer-motion";
import { personal } from "@/data/content";

export default function Contact() {
  return (
    <>
      {/* Contact section */}
      <section id="contact" className="py-24 border-t border-[#e8e8e4] bg-[#f9f9f7]">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[#999] text-sm font-mono mb-3">
              That&apos;s all for now.
            </p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-[#111] leading-tight mb-14">
              Got a project in mind?
              <br />
              Let&apos;s talk
            </h2>
          </motion.div>

          {/* Horizontal line + floating button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative mb-16"
          >
            <div className="border-t border-[#bbb]" />
            <a
              href={`mailto:${personal.email}`}
              className="absolute right-0 -top-7 w-[7.5rem] h-[7.5rem] rounded-full bg-[#5855d4] text-white text-sm font-semibold flex items-center justify-center text-center leading-tight hover:bg-[#4340c0] hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Get in<br />touch
            </a>
          </motion.div>

          {/* Contact links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-8"
          >
            <div>
              <p className="text-[#999] text-xs font-mono uppercase tracking-widest mb-2">
                Email
              </p>
              <a
                href={`mailto:${personal.email}`}
                className="text-[#111] text-sm hover:text-[#5855d4] transition-colors"
              >
                {personal.email}
              </a>
            </div>
            <div>
              <p className="text-[#999] text-xs font-mono uppercase tracking-widest mb-2">
                GitHub
              </p>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#111] text-sm hover:text-[#5855d4] transition-colors"
              >
                @Jordan1881
              </a>
            </div>
            <div>
              <p className="text-[#999] text-xs font-mono uppercase tracking-widest mb-2">
                LinkedIn
              </p>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#111] text-sm hover:text-[#5855d4] transition-colors"
              >
                yarden-biton
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Massive footer */}
      <footer className="bg-[#111] text-white pt-10 pb-6" style={{ overflow: "hidden" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[#555] text-sm">your friendly ai builder</p>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-[#333] flex items-center justify-center text-white hover:border-white transition-colors duration-200 text-sm"
              aria-label="GitHub"
            >
              ↗
            </a>
          </div>
        </div>

        {/* Big overflowing name */}
        <div className="px-4 mt-2">
          <p
            className="text-white font-black leading-none tracking-tighter whitespace-nowrap"
            style={{ fontSize: "clamp(3.5rem, 14vw, 14rem)" }}
          >
            Yarden Biton
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-6 sm:px-10 mt-6 pt-4 border-t border-[#222]">
          <p className="text-[#444] text-xs">
            Built with Next.js & Tailwind · {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </>
  );
}
