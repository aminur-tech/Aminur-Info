import CustomCursor from "../Component/CustomCursor";
import About from "./About";
import Contact from "./Contact";
import Hero from "./Hero";
import Projects from "./Projects";
import Skills from "./Skills";

export default function Home() {
    return (
        <section className="pt-10 lg:pt-20 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

            <div id="contact" className="mt-24">
                <Contact />
            </div>

        </section>
    )
}
