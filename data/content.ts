export const personal = {
  name: "Yarden Biton",
  title: "AI Engineer & Full Stack Developer",
  bio: "Third-year Information Systems student at Yezreel Valley College, Israel, specializing in AI agent architectures and full-stack development.",
  focus:
    "I design tool-based AI systems including MCP server architectures and LLM-powered agents and build production-grade applications with React, TypeScript, and Python. My foundation includes strong OOP, data structures, QA methodology, and system design. Currently building toward my first role as an Applied AI Engineer.",
  email: "jordanstu21@gmail.com",
  github: "https://github.com/Jordan1881",
  linkedin: "https://www.linkedin.com/in/yarden-biton-771026215/",
};

export type ProjectStatus = "Live" | "In Development" | "Prototype";

export const projects = [
  {
    name: "Questly",
    slug: "questly",
    status: "In Development" as ProjectStatus,
    highlights: [
      "Turns tasks into RPG quests — earn XP, levels, and rewards for real work",
      "Global state via Zustand — lightweight and scalable without Redux overhead",
      "Jira API integration planned to sync real work tasks into the quest board",
    ],
    description:
      "Gamified task management system that turns your to-do list into an RPG quest board.",
    stack: ["React", "TypeScript", "Zustand", "Tailwind", "Jira API"],
    github: "https://github.com/Jordan1881/Questly",
    live: "https://questly-gilt.vercel.app/",
  },
  {
    name: "Finance AI Agent",
    slug: "finance-ai",
    status: "Live" as ProjectStatus,
    highlights: [
      "MCP tool-based agent with 5 discrete tools — the LLM orchestrates, not guesses",
      "Clean tool separation makes each function independently testable",
      "Mirrors how production AI systems are actually architected",
    ],
    description:
      "Tool-based AI agent for transaction categorization, monthly reports, and budget suggestions using MCP architecture.",
    stack: ["Python", "MCP", "AI Agents"],
    github: "https://github.com/Jordan1881/Finance-MCP-Agent-UI",
    live: "https://github.com/Jordan1881/Finance-MCP-Agent-UI",
  },
  {
    name: "Notesmith AI",
    slug: "notesmith",
    status: "In Development" as ProjectStatus,
    highlights: [
      "Agentic summarization — the LLM decides how to chunk and prioritize, not just truncate",
      "Handles variable-length documents with structured, consistent output",
      "Document-type awareness formats output based on content structure",
    ],
    description:
      "LLM-powered summarization tool built on an agentic architecture for intelligent document processing.",
    stack: ["Python", "LLM", "AI Agents"],
    github: "https://github.com/Jordan1881/Notesmith-AI",
    live: null,
  },
  {
    name: "ArtAffinity",
    slug: "artaffinity",
    status: "Prototype" as ProjectStatus,
    highlights: [
      "Combines social feed with artist profiles — discovery meets self-expression",
      "Gallery-first UI designed for independent artists and art buyers",
      "Future concept: 360° virtual gallery rooms per artist",
    ],
    description:
      "Artist marketplace with buyer profiles, social feed, and a virtual gallery concept for discovering independent creators.",
    stack: ["Full Stack"],
    github: "https://github.com/Jordan1881/ArtAffinity",
    live: null,
  },
];

export interface CaseStudy {
  name: string;
  slug: string;
  tagline: string;
  status: string;
  stack: string[];
  github: string;
  live: string | null;
  screenshot?: boolean;
  problem: { headline: string; body: string };
  architecture: {
    description: string;
    nodes: { label: string; sub: string }[];
    flow: string;
  };
  techDecisions: { decision: string; reason: string }[];
  challenges: string[];
}

export const caseStudies: Record<string, CaseStudy> = {
  questly: {
    name: "Questly",
    slug: "questly",
    tagline: "Your to-do list, reimagined as an RPG quest board",
    status: "In Development",
    stack: ["React", "TypeScript", "Zustand", "Tailwind", "Jira API"],
    github: "https://github.com/Jordan1881/Questly",
    live: "https://questly-gilt.vercel.app/",
    screenshot: true,
    problem: {
      headline: "Task management tools are functional but forgettable",
      body: "Most to-do apps get abandoned within weeks. They show you what needs to be done but give you no reason to care. Questly transforms your task list into an RPG quest board — completing tasks grants XP, levels you up, and unlocks rewards. The same work, wrapped in a system that makes you want to come back.",
    },
    architecture: {
      description:
        "Component-based React SPA with Zustand for global state. Each 'task' is modeled as a 'quest' with metadata: difficulty tier, XP value, category, and deadline. The Zustand store manages the full quest lifecycle — creation, completion, XP calculation, and level progression.",
      nodes: [
        { label: "Quest Board UI", sub: "React Components" },
        { label: "Zustand Store", sub: "Global State" },
        { label: "XP Engine", sub: "Level & Reward Logic" },
        { label: "Jira Sync", sub: "API Integration (planned)" },
      ],
      flow: "Quest Input → Zustand Store → XP Engine → Level Up / Reward → Quest Board Update",
    },
    techDecisions: [
      {
        decision: "Zustand over Redux",
        reason:
          "Lighter API, sufficient for this scope. No boilerplate, no action creators — just a store that scales with the app.",
      },
      {
        decision: "TypeScript throughout",
        reason:
          "Type safety on quest metadata prevents subtle bugs. Also produces portfolio-ready, production-grade code.",
      },
      {
        decision: "Tailwind for styling",
        reason:
          "Rapid iteration on UI without writing custom CSS. Consistent design tokens with zero configuration overhead.",
      },
    ],
    challenges: [
      "Designing the XP/reward system logic to feel fair and genuinely motivating — not arbitrary or gameable.",
      "Structuring the Zustand store to handle growing complexity as quest categories, filters, and history are added.",
    ],
  },
  "finance-ai": {
    name: "Finance AI Agent",
    slug: "finance-ai",
    tagline: "A tool-based AI agent that actually understands your money",
    status: "Live",
    stack: ["Python", "MCP", "AI Agents"],
    github: "https://github.com/Jordan1881/Finance-MCP-Agent-UI",
    live: "https://github.com/Jordan1881/Finance-MCP-Agent-UI",
    problem: {
      headline: "Manual finance tracking is tedious. Generic AI advice is shallow.",
      body: "Most people don't know where their money goes. Spreadsheets require constant effort, and generic AI chat gives vague, one-size-fits-all advice. Finance AI Agent uses a proper tool-based architecture — the LLM orchestrates purpose-built tools rather than trying to do everything in a single prompt. The result is accurate categorization, real monthly reports, and actionable budget suggestions.",
    },
    architecture: {
      description:
        "Built on MCP (Model Context Protocol) architecture. The LLM acts as an orchestrator: it reads user intent, selects the correct tool, and calls it with the right parameters. Each of the 5 tools has a single, well-defined responsibility. No tool does more than one job — making the system testable, debuggable, and extensible.",
      nodes: [
        { label: "User Input", sub: "Natural language" },
        { label: "LLM Orchestrator", sub: "Intent → Tool Selection" },
        { label: "upload_transactions", sub: "Ingest CSV/data" },
        { label: "categorize_transactions", sub: "Tag & classify" },
        { label: "monthly_report", sub: "Generate summary" },
        { label: "budget_suggestions", sub: "AI recommendations" },
      ],
      flow: "User Input → LLM → Tool Selection → Tool Execution → Structured Response",
    },
    techDecisions: [
      {
        decision: "MCP over a monolithic AI call",
        reason:
          "Separates concerns cleanly. Each tool is independently testable and mirrors how production AI systems are actually built at scale.",
      },
      {
        decision: "Python for backend",
        reason:
          "Rich data processing ecosystem. Pandas for transaction handling, clean integration with LLM APIs, fast iteration.",
      },
      {
        decision: "5 discrete tools (not more)",
        reason:
          "Deliberately scoped. Every tool boundary was a design decision — deciding what logic belongs in the agent vs. in the tool itself.",
      },
    ],
    challenges: [
      "Designing tool boundaries: deciding what logic belongs in the LLM orchestration layer vs. the tool implementation.",
      "Prompt engineering to ensure the LLM selects the correct tool without over-calling or hallucinating tool inputs.",
    ],
  },
  notesmith: {
    name: "Notesmith AI",
    slug: "notesmith",
    tagline: "Intelligent document summarization — not just shorter, actually better",
    status: "In Development",
    stack: ["Python", "LLM", "AI Agents"],
    github: "https://github.com/Jordan1881/Notesmith-AI",
    live: null,
    problem: {
      headline: "Summarization tools truncate. Notesmith understands.",
      body: "Long documents and notes are hard to process quickly. Simple summarization — send everything to an LLM and ask it to shorten — breaks down on variable-length inputs and loses important structure. Notesmith uses an agentic pipeline where the LLM decides how to chunk, what to prioritize, and how to format output based on document type.",
    },
    architecture: {
      description:
        "Agentic summarization pipeline with document-type awareness. The agent first analyzes document structure, then decides on a chunking strategy, then summarizes with awareness of what's important vs. filler. Output format adapts to content — bullet points for notes, narrative for articles, key facts for reports.",
      nodes: [
        { label: "Document Input", sub: "Raw text / file" },
        { label: "Structure Analyzer", sub: "Type detection" },
        { label: "Chunking Strategy", sub: "LLM decides splits" },
        { label: "Priority Ranker", sub: "What matters most" },
        { label: "Formatted Output", sub: "Type-aware summary" },
      ],
      flow: "Document → Structure Analysis → Chunking → Priority Ranking → Formatted Summary",
    },
    techDecisions: [
      {
        decision: "Agentic approach over a simple prompt",
        reason:
          "Handles variable-length input better. A single prompt breaks on long documents; an agent adapts its strategy to the content.",
      },
      {
        decision: "Document-type awareness",
        reason:
          "A meeting note and a research paper need different summaries. Detecting type first improves output quality significantly.",
      },
    ],
    challenges: [
      "Handling edge cases in document length and structure — badly formatted inputs, code-heavy docs, multi-language content.",
      "Making the output genuinely useful, not just shorter. Shorter is easy. Useful requires judgment about what matters.",
    ],
  },
  artaffinity: {
    name: "ArtAffinity",
    slug: "artaffinity",
    tagline: "A social marketplace where art discovery feels like a gallery visit",
    status: "Prototype",
    stack: ["Full Stack"],
    github: "https://github.com/Jordan1881/ArtAffinity",
    live: null,
    problem: {
      headline: "Independent artists have no platform that's both social and gallery-like",
      body: "Existing art marketplaces feel transactional. Social platforms feel chaotic. ArtAffinity sits in between — a feed-first platform where art buyers discover work organically, and artists can build a presence that feels like their own gallery, not just a shop.",
    },
    architecture: {
      description:
        "Full-stack CRUD application with distinct user roles: artists and buyers. Artists get profile pages that function as mini-galleries. Buyers see a discovery feed with filtering by style, medium, and price range. The future concept includes 360° virtual gallery rooms per artist — an immersive browsing experience.",
      nodes: [
        { label: "Artist Profiles", sub: "Gallery-style pages" },
        { label: "Buyer Discovery", sub: "Social feed + filters" },
        { label: "Art Listings", sub: "CRUD operations" },
        { label: "Virtual Gallery", sub: "360° rooms (concept)" },
      ],
      flow: "Artist Upload → Listing Created → Buyer Feed → Profile Visit → Gallery Room",
    },
    techDecisions: [
      {
        decision: "UI/UX-first approach",
        reason:
          "The product's value is in the browsing experience. Backend complexity was deliberately kept minimal to prioritize the frontend feel.",
      },
      {
        decision: "Feed-based discovery",
        reason:
          "Mirrors social patterns users already understand, lowering the learning curve while surfacing art naturally.",
      },
    ],
    challenges: [
      "Designing a feed that serves two very different goals: discovery for buyers and self-expression for artists.",
      "Balancing the social feel (engagement, follows, likes) with the commerce layer (pricing, inquiries, purchases).",
    ],
  },
};

export const skills = [
  { category: "Languages", items: ["Python", "Java", "JavaScript", "TypeScript"] },
  { category: "Frontend", items: ["React", "Tailwind CSS"] },
  { category: "Backend / DB", items: ["Node.js", "MongoDB", "SQL"] },
  { category: "AI / ML", items: ["AI Agents", "Prompt Engineering", "LLM"] },
  { category: "DevOps / Tools", items: ["Git", "Linux", "GCP"] },
  { category: "QA", items: ["JUnit 5", "QA Engineering"] },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Claude Skills", href: "#claude-skills" },
  { label: "Contact", href: "#contact" },
];
