import Navbar from "@/components/Navbar";
import Scene3D from "@/components/Scene3D";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import ClaudeSkills from "@/components/ClaudeSkills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      {/* Persistent 3D background canvas (fixed, behind everything). */}
      <Scene3D />

      <Navbar />

      {/* Content sits above the canvas. */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <ClaudeSkills />
        <Contact />
      </main>
    </>
  );
}
