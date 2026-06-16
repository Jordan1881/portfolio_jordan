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
    status: "Live" as ProjectStatus,
    image: "/projects/questly/screenshot.png",
    highlights: [
      "Complete real Jira Cloud tickets to earn XP, level up, and redeem team rewards",
      "Full-stack React 19 + Express + PostgreSQL, deployed on Vercel & Railway",
      "Atlassian OAuth, Playwright E2E, Docker, and CI via GitHub Actions",
    ],
    description:
      "Gamified task management powered by Jira — complete real tickets, earn XP, level up, and redeem rewards as a team.",
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Jira Cloud", "Playwright"],
    github: "https://github.com/Jordan1881/Questly",
    live: "https://questly-gilt.vercel.app",
  },
  {
    name: "Finlens",
    slug: "finlens",
    status: "Live" as ProjectStatus,
    image: "/finlens-text.svg",
    highlights: [
      "Async pipeline: S3 → Step Functions → Lambda → Amazon Bedrock (Claude)",
      "Reachable via REST API, a remote MCP server, or a Next.js dashboard",
      "Multi-tenant, Hebrew/English statements, fully serverless on AWS",
    ],
    description:
      "Remote MCP product for bank-statement analysis on AWS — upload a PDF or CSV and get structured financial summaries and narrative insights.",
    stack: ["AWS", "Bedrock", "MCP", "Next.js", "TypeScript", "DynamoDB"],
    github: "https://github.com/Jordan1881/Finlens",
    live: null,
  },
  {
    name: "Nati's",
    slug: "natis",
    status: "Live" as ProjectStatus,
    image: "/natis-text.svg",
    highlights: [
      "A non-technical operator runs a real Friday lunch service on it",
      "Prints kitchen bons + customer slips; end-of-day item & payment summaries",
      "Express + Drizzle + PostgreSQL, cookie-session auth, Vitest-tested",
    ],
    description:
      "Full-stack order management for a Friday-only home restaurant — phone/WhatsApp orders, printed kitchen bons & customer slips, and end-of-day summaries.",
    stack: ["Express", "Drizzle ORM", "PostgreSQL", "TypeScript", "Vitest"],
    github: "https://github.com/Jordan1881/Nati-s-",
    live: null,
  },
  {
    name: "Notesmith AI",
    slug: "notesmith",
    status: "In Development" as ProjectStatus,
    image: "/notesmith-ai-text.svg",
    highlights: [
      "Token-aware chunking handles large documents safely",
      "Numeric word-target keeps summaries within ±10% of the requested length",
      "Hebrew RTL/LTR-aware, multi-pass consolidation, Markdown export",
    ],
    description:
      "AI exam summarizer with precise length control — token-aware chunking, multi-pass summaries, and structured Hebrew output.",
    stack: ["Python", "OpenAI API", "Streamlit", "tiktoken"],
    github: "https://github.com/Jordan1881/Notesmith-AI",
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
    tagline: "Your task list, reimagined as a Jira-powered RPG quest board",
    status: "Live",
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Jira Cloud", "Playwright"],
    github: "https://github.com/Jordan1881/Questly",
    live: "https://questly-gilt.vercel.app",
    screenshot: true,
    problem: {
      headline: "Task tools are functional but forgettable",
      body: "Most task apps show you what needs doing but give you no reason to care, and they get abandoned within weeks. Questly turns real work into a game: it connects to Jira Cloud, and completing actual tickets grants XP, levels you up, and unlocks team rewards. The same work — wrapped in a system that makes a team want to come back.",
    },
    architecture: {
      description:
        "A React 19 SPA backed by an Express API and PostgreSQL. Questly authenticates with Jira Cloud over Atlassian OAuth, syncs real tickets, and runs them through an XP engine that handles leveling, leaderboards, and reward redemption. The app is containerized with Docker, deployed across Vercel (web) and Railway (API), and covered by Playwright end-to-end tests in CI.",
      nodes: [
        { label: "React SPA", sub: "Quest board UI" },
        { label: "Express API", sub: "REST + auth" },
        { label: "Atlassian OAuth", sub: "Jira Cloud sync" },
        { label: "XP Engine", sub: "Levels & rewards" },
        { label: "PostgreSQL", sub: "Persistence" },
      ],
      flow: "Jira ticket → OAuth sync → XP Engine → Level up / reward → Quest board update",
    },
    techDecisions: [
      {
        decision: "Real Jira Cloud integration over a mock backlog",
        reason:
          "Gamifying real work is the whole point. Atlassian OAuth + ticket sync makes the rewards meaningful instead of a toy.",
      },
      {
        decision: "PostgreSQL for state",
        reason:
          "XP, levels, leaderboards, and reward ledgers are relational — a real database keeps them consistent across a team.",
      },
      {
        decision: "Playwright E2E in CI",
        reason:
          "The XP/reward flows span auth, sync, and persistence; end-to-end tests catch regressions a unit test can't.",
      },
    ],
    challenges: [
      "Designing the XP and reward economy to feel fair and motivating rather than arbitrary or gameable.",
      "Keeping Questly state in sync with Jira without double-counting tickets or losing progress on re-sync.",
    ],
  },
  finlens: {
    name: "Finlens",
    slug: "finlens",
    tagline: "Bank statements in, financial insight out — over REST, MCP, or web",
    status: "Live",
    stack: ["AWS", "Bedrock", "MCP", "Next.js", "TypeScript", "DynamoDB"],
    github: "https://github.com/Jordan1881/Finlens",
    live: null,
    problem: {
      headline: "Manual finance tracking is tedious; generic AI advice is shallow",
      body: "People don't know where their money goes, and pasting a statement into a chatbot gives vague, unreliable answers. Finlens is a proper tool-based system: upload a monthly bank statement as PDF or CSV (Hebrew or English) and an async pipeline produces structured summaries and narrative spending insights — reachable from a web dashboard, a REST API, or directly from AI tools over a remote MCP server.",
    },
    architecture: {
      description:
        "Fully serverless on AWS. Clients (web, MCP, REST) hit an API Gateway HTTP API fronting Lambda handlers. Uploaded statements land in S3, which triggers a Step Functions workflow that calls Amazon Bedrock (Claude) to analyze the document. Results and per-tenant metadata live in DynamoDB, with tenancy derived from an API key or Cognito JWT.",
      nodes: [
        { label: "Web / MCP / REST", sub: "Clients" },
        { label: "API Gateway", sub: "HTTP API" },
        { label: "Lambda", sub: "Handlers + MCP" },
        { label: "S3 + Step Functions", sub: "Async pipeline" },
        { label: "Bedrock (Claude)", sub: "Analysis" },
        { label: "DynamoDB", sub: "Multi-tenant data" },
      ],
      flow: "Upload (PDF/CSV) → S3 event → Step Functions → Bedrock → structured summary + insights",
    },
    techDecisions: [
      {
        decision: "Remote MCP server, not just a REST API",
        reason:
          "Exposing the tools over MCP lets AI clients call Finlens directly — the analysis becomes composable inside agent workflows.",
      },
      {
        decision: "Async S3 → Step Functions → Bedrock pipeline",
        reason:
          "Statement analysis is slow and bursty. Decoupling upload from analysis keeps the API responsive and the workflow observable.",
      },
      {
        decision: "Multi-tenant metadata in DynamoDB",
        reason:
          "Tenant isolation by API key or Cognito JWT keeps each user's statements separate without standing up a relational server.",
      },
    ],
    challenges: [
      "Parsing inconsistent bank statements in both Hebrew and English into a structured shape Bedrock can reason over.",
      "Keeping tenant data isolated across the REST, MCP, and web surfaces from a single backend.",
    ],
  },
  natis: {
    name: "Nati's",
    slug: "natis",
    tagline: "A real Friday-only home restaurant, run from one screen",
    status: "Live",
    stack: ["Express", "Drizzle ORM", "PostgreSQL", "TypeScript", "Vitest"],
    github: "https://github.com/Jordan1881/Nati-s-",
    live: null,
    problem: {
      headline: "A paper-notebook kitchen that needed to survive a real lunch service",
      body: "NATI's is a Friday-only home restaurant. The operator — a non-technical relative — collected orders by phone and WhatsApp in a paper notebook, then hand-wrote kitchen tickets every Friday morning. Nati's replaces that: he enters orders during the week and, on Friday, the system prints a kitchen bon for the chef and a customer slip for each bag, then produces end-of-day item quantities and a payment breakdown.",
    },
    architecture: {
      description:
        "A single-operator web app with an Express + TypeScript backend, Drizzle ORM over PostgreSQL, and cookie-session authentication. Order, customer, and menu data flow through typed routes into a print service that renders kitchen bons and customer slips, plus an end-of-day summary. The backend is covered by a Vitest suite across schema, auth, routes, and the orders service.",
      nodes: [
        { label: "Operator UI", sub: "Order entry" },
        { label: "Express API", sub: "Typed routes" },
        { label: "Drizzle + PostgreSQL", sub: "Orders & menu" },
        { label: "Print Service", sub: "Bons & slips" },
        { label: "Day Summary", sub: "Items + payments" },
      ],
      flow: "Order entry → PostgreSQL → Friday print (kitchen bon + customer slip) → end-of-day summary",
    },
    techDecisions: [
      {
        decision: "Drizzle ORM over a hand-rolled query layer",
        reason:
          "Type-safe schema and migrations keep the data model honest as orders, customers, and menu items evolve.",
      },
      {
        decision: "Server-rendered print documents",
        reason:
          "Kitchen bons and customer slips must print identically every time — rendering them on the server makes the layout deterministic.",
      },
      {
        decision: "Vitest coverage across routes and services",
        reason:
          "It runs a real Friday service; tests on auth, orders, and summaries are what make changes safe to ship mid-week.",
      },
    ],
    challenges: [
      "Designing an interface a ~60-year-old non-technical operator can use with zero training under real lunch-rush pressure.",
      "Getting print layouts for kitchen bons and customer slips reliable across his laptop and phone.",
    ],
  },
  notesmith: {
    name: "Notesmith AI",
    slug: "notesmith",
    tagline: "Summaries that respect length, structure, and Hebrew",
    status: "In Development",
    stack: ["Python", "OpenAI API", "Streamlit", "tiktoken"],
    github: "https://github.com/Jordan1881/Notesmith-AI",
    live: null,
    problem: {
      headline: "Summarization tools truncate. Notesmith understands.",
      body: "Sending a whole document to an LLM and asking it to 'make it shorter' breaks on long inputs and ignores how much summary you actually want. Notesmith is an exam-prep summarizer with precise length control: it counts tokens to decide when to chunk, summarizes in multiple passes, and expands or compresses to hit a numeric word target — producing structured Hebrew summaries optimized for studying.",
    },
    architecture: {
      description:
        "A Python pipeline with a Streamlit UI. Text is extracted from PDF/TXT/DOCX, then tiktoken counts tokens to decide between a single-pass summary and chunked summarization. Chunk summaries are consolidated in a final pass, and a length-control step expands or compresses the output to stay within ±10% of the requested word count, with automatic RTL/LTR handling for Hebrew.",
      nodes: [
        { label: "Document Input", sub: "PDF / TXT / DOCX" },
        { label: "Token Analyzer", sub: "tiktoken" },
        { label: "Chunking Strategy", sub: "Decide splits" },
        { label: "Multi-pass Summary", sub: "Consolidate" },
        { label: "Length Control", sub: "±10% target" },
        { label: "Markdown Export", sub: "Study output" },
      ],
      flow: "Document → token analysis → chunk → multi-pass summary → length control → Markdown",
    },
    techDecisions: [
      {
        decision: "Token-aware chunking instead of naive truncation",
        reason:
          "A single prompt breaks on long documents; counting tokens first lets the system handle variable-length input safely.",
      },
      {
        decision: "Numeric word target with a correction pass",
        reason:
          "'Shorter' is vague. A numeric target plus an expand/compress pass keeps output within ±10% of what the user asked for.",
      },
      {
        decision: "Streamlit for the UI",
        reason:
          "Lets the project stay focused on the summarization logic while still giving a clean, usable interface.",
      },
    ],
    challenges: [
      "Hitting an exact word-count target reliably while keeping the summary coherent across multiple passes.",
      "Handling Hebrew RTL output and mixed-direction text cleanly alongside English source material.",
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
