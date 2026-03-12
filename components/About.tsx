"use client";

import { motion } from "framer-motion";
import { personal } from "@/data/content";

export default function About() {
  return (
    <section id="about" className="py-24 border-t border-[#e8e8e4]">
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <div className="grid sm:grid-cols-2 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[#999] text-xs font-mono uppercase tracking-widest mb-4">
              About me
            </p>
            <p className="text-[#111] text-xl font-semibold leading-snug">
              {personal.bio}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="sm:pt-10"
          >
            <p className="text-[#666] text-base leading-relaxed mb-8">
              {personal.focus}
            </p>

            <div className="border-t border-[#e8e8e4] pt-6">
              <p className="text-[#999] text-xs font-mono uppercase tracking-widest mb-3">
                Education
              </p>
              <p className="text-[#111] font-semibold">B.Sc. Information Systems</p>
              <p className="text-[#666] text-sm mt-1">
                Yezreel Valley College, Israel · 3rd Year
              </p>
            </div>

            <div className="border-t border-[#e8e8e4] pt-6 mt-6">
              <p className="text-[#999] text-xs font-mono uppercase tracking-widest mb-3">
                Based in
              </p>
              <p className="text-[#111] font-semibold">Israel 🇮🇱</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
