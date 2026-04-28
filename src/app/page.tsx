import CustomCursor from "../component/buttons/CustomCursor";
import FloatingContact from "../component/buttons/FloatingContact";
import Projects from "../component/home/Projects";
import Skills from "../component/home/Skills";
import Hero from "../component/home/Hero";
import About from "../component/home/About";
import Contact from "../component/home/Contact";
import ScrollToTopButton from "../component/buttons/ScrollToTopButton";
import Education from "../component/home/Education";
import Certifications from "../component/home/Certifications";
import FAQSection from "../component/home/FAQSection";


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
        <FAQSection />
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
