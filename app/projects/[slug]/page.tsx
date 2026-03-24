import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { caseStudies } from "@/data/content";

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

const statusStyles: Record<string, string> = {
  Live: "bg-[#dcfce7] text-[#166534]",
  "In Development": "bg-[#fef9c3] text-[#854d0e]",
  Prototype: "bg-[#f3f4f6] text-[#374151]",
};

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies[slug];

  if (!study) notFound();

  return (
    <main className="min-h-screen bg-[#f9f9f7]">
      {/* Back nav */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#999] text-sm hover:text-[#111] transition-colors duration-200"
        >
          ← Back to portfolio
        </Link>
      </div>

      {/* ── Hero ── */}
      <section className="max-w-5xl mx-auto px-6 sm:px-10 pt-10 pb-16 border-b border-[#e8e8e4]">
        <span
          className={`inline-block text-xs px-2.5 py-1 rounded-full font-mono mb-5 ${statusStyles[study.status]}`}
        >
          {study.status}
        </span>

        <h1
          className="font-black tracking-tighter text-[#111] leading-none mb-5"
          style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)" }}
        >
          {study.name}
        </h1>

        <p className="text-[#666] text-lg max-w-xl leading-relaxed mb-8">
          {study.tagline}
        </p>

        {/* Stack badges */}
        <div className="flex flex-wrap gap-2 mb-8">
          {study.stack.map((tech) => (
            <span
              key={tech}
              className="text-xs px-3 py-1.5 rounded-full bg-[#111] text-white font-mono"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-3">
          <a
            href={study.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#111] text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#5855d4] transition-colors duration-300"
          >
            GitHub ↗
          </a>
          {study.live && (
            <a
              href={study.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[#ccc] text-[#111] text-sm font-medium px-5 py-2.5 rounded-full hover:border-[#5855d4] hover:text-[#5855d4] transition-colors duration-300"
            >
              Live Demo ↗
            </a>
          )}
        </div>
      </section>

      {/* ── Content ── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10">

        {/* The Problem */}
        <section className="py-16 border-b border-[#e8e8e4]">
          <p className="text-[#999] text-xs font-mono uppercase tracking-widest mb-4">
            The Problem
          </p>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#111] mb-6">
            {study.problem.headline}
          </h2>
          <p className="text-[#555] text-base leading-relaxed max-w-2xl">
            {study.problem.body}
          </p>
        </section>

        {/* Architecture */}
        <section className="py-16 border-b border-[#e8e8e4]">
          <p className="text-[#999] text-xs font-mono uppercase tracking-widest mb-4">
            Architecture
          </p>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#111] mb-6">
            How it&apos;s built
          </h2>
          <p className="text-[#555] text-base leading-relaxed max-w-2xl mb-10">
            {study.architecture.description}
          </p>

          {/* Diagram */}
          <div className="bg-[#111] rounded-2xl p-8 overflow-x-auto">
            <p className="text-[#444] text-xs font-mono uppercase tracking-widest mb-6">
              System Flow
            </p>

            {/* Nodes */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {study.architecture.nodes.map((node, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] px-4 py-3 text-center min-w-[110px]">
                    <p className="text-white text-xs font-semibold whitespace-nowrap">
                      {node.label}
                    </p>
                    <p className="text-[#555] text-[10px] font-mono mt-0.5 whitespace-nowrap">
                      {node.sub}
                    </p>
                  </div>
                  {i < study.architecture.nodes.length - 1 && (
                    <span className="text-[#333] text-base flex-shrink-0">→</span>
                  )}
                </div>
              ))}
            </div>

            {/* Flow text */}
            <div className="border-t border-[#1e1e1e] pt-4">
              <p className="text-[#5855d4] text-xs font-mono leading-relaxed">
                {study.architecture.flow}
              </p>
            </div>
          </div>
        </section>

        {/* Tech Decisions */}
        <section className="py-16 border-b border-[#e8e8e4]">
          <p className="text-[#999] text-xs font-mono uppercase tracking-widest mb-4">
            Tech Decisions
          </p>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#111] mb-8">
            Why these choices
          </h2>
          <div className="divide-y divide-[#f0f0ec]">
            {study.techDecisions.map((item, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-2 sm:gap-8 py-5">
                <div className="sm:w-48 flex-shrink-0">
                  <p className="text-[#111] font-semibold text-sm">{item.decision}</p>
                </div>
                <p className="text-[#666] text-sm leading-relaxed">{item.reason}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Challenges */}
        <section className="py-16 border-b border-[#e8e8e4]">
          <p className="text-[#999] text-xs font-mono uppercase tracking-widest mb-4">
            Challenges &amp; Learnings
          </p>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#111] mb-8">
            What was hard
          </h2>
          <ul className="space-y-5 max-w-2xl">
            {study.challenges.map((challenge, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="text-[#5855d4] font-mono text-sm flex-shrink-0 mt-0.5">
                  {String(i + 1).padStart(2, "0")}.
                </span>
                <p className="text-[#555] text-base leading-relaxed">{challenge}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Screenshots */}
        <section className="py-16">
          <p className="text-[#999] text-xs font-mono uppercase tracking-widest mb-4">
            Screenshots / Demo
          </p>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#111] mb-8">
            In action
          </h2>
          {study.screenshot ? (
            <div className="rounded-2xl overflow-hidden border border-[#e8e8e4]">
              <Image
                src={`/projects/${study.slug}/screenshot.png`}
                alt={`${study.name} screenshot`}
                width={1280}
                height={800}
                className="w-full h-auto"
              />
            </div>
          ) : (
            /* TODO: replace with real content — add screenshot at /public/projects/{slug}/screenshot.png */
            <div className="rounded-2xl border-2 border-dashed border-[#e8e8e4] p-14 flex flex-col items-center justify-center text-center">
              <p className="text-[#bbb] text-sm font-mono mb-1">Screenshot coming</p>
              <p className="text-[#ddd] text-xs">
                Add image at /public/projects/{study.slug}/screenshot.png
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Footer nav */}
      <div className="border-t border-[#e8e8e4] py-8">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 flex items-center justify-between">
          <Link
            href="/#projects"
            className="text-[#999] text-sm hover:text-[#111] transition-colors"
          >
            ← All projects
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-[#111] text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#5855d4] transition-colors duration-300"
          >
            Let&apos;s talk →
          </Link>
        </div>
      </div>
    </main>
  );
}
