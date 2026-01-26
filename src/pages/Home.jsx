import CustomCursor from "../Component/CustomCursor";
import About from "./About";
import Contact from "./Contact";
import Hero from "./Hero";
import Projects from "./Projects";
import Skills from "./Skills";

export default function Home() {
    return (
        <section >
            <title>Aminur Rahman</title>
            {/* <CustomCursor/> */}
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

            <div id="contact" className="mt-24 mb-24">
                <Contact />
            </div>

        </section>
    )
}
