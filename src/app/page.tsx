import CustomCursor from "../Component/buttons/CustomCursor";
import FloatingContact from "../Component/buttons/FloatingContact";
import ScrollToTopButton from "../Component/buttons/ScrollToTopButton";
import About from "../Component/home/About";
import Certifications from "../Component/home/Certifications";
import Contact from "../Component/home/Contact";
import Education from "../Component/home/Education";
import FAQSection from "../Component/home/FAQSection";
import Hero from "../Component/home/Hero";
import Projects from "../Component/home/Projects";
import Skills from "../Component/home/Skills";



export const metadata = {
  title: "Aminur Rahman - Portfolio",
  description: "A modern, fast, and SEO-optimized portfolio built with Next.js 16 and TypeScript.",
};

export default function HomePage() {
  return (
    <main>
      <CustomCursor />
      {/* HERO SECTION */}
      <div id="hero">
        <Hero></Hero>
      </div>

      <div id="skills" className="mt-24">
        <Skills />
      </div>

      <div id="projects" className="mt-24">
        <Projects />
      </div>

      <div id="about" className="mt-24">
        <About />
      </div>

      <div id="education" className="mt-24 mb-24">
        <Education />
      </div>

      <div id="certifications" className="mt-24 mb-24">
        <Certifications/>
      </div>
      <div id="faq" className="mt-24 mb-24">
        <FAQSection/>
      </div>

      <div id="contact" className="mt-24 mb-24">
        <Contact />
      </div>

      <FloatingContact />
      {/* scroll to top */}
      <ScrollToTopButton />

    </main>
  );
}
