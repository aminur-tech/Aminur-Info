import About from "../components/home/About";
import Certifications from "../components/home/Certifications";
import Education from "../components/home/Education";
import Experience from "../components/home/Experience";
import FinalCTA from "../components/home/FinalCTA";
import Footer from "../components/home/Footer";
import Hero from "../components/home/Hero";
import Projects from "../components/home/Projects";
import Resume from "../components/home/Resume";
import Roles from "../components/home/Roles";
import Services from "../components/home/Services";
import Skills from "../components/home/Skills";
import Contact from "../components/home/Contact";
import Testimonials from "../components/home/Testimonials";

import {
  getActiveResume,
  getApprovedTestimonials,
  getHero,
  getProfile,
  getPublishedAbout,
  getPublishedCertifications,
  getPublishedEducation,
  getPublishedExperience,
  getPublishedProjects,
  getPublishedRoles,
  getPublishedServices,
  getPublishedSkills,
  getPublishedSocialLinks,
  getSeoSettings,
  getSiteSettings,
} from "../lib/queries/portfolio";

export async function generateMetadata() {
  const seo = await getSeoSettings();

  return {
    title: seo?.title || "Aminur Rahman | Full-stack developer",

    description:
      seo?.description ||
      "Aminur Rahman builds focused, reliable web products with thoughtful UX and production-ready engineering.",

    keywords: seo?.keywords,

    openGraph: {
      title: seo?.og_title || seo?.title,
      description: seo?.og_description || seo?.description,
      images: seo?.og_image ? [seo.og_image] : undefined,
    },

    alternates: seo?.canonical_url
      ? {
          canonical: seo.canonical_url,
        }
      : undefined,

    robots:
      seo?.allow_indexing === false
        ? {
            index: false,
            follow: false,
          }
        : undefined,
  };
}

export default async function HomePage() {
  const [
    profile,
    hero,
    projects,
    skills,
    testimonials,
    certifications,
    about,
    roles,
    experience,
    education,
    services,
    socialLinks,
    siteSettings,
    activeResume,
  ] = await Promise.all([
    getProfile(),
    getHero(),
    getPublishedProjects(),
    getPublishedSkills(),
    getApprovedTestimonials(),
    getPublishedCertifications(),
    getPublishedAbout(),
    getPublishedRoles(),
    getPublishedExperience(),
    getPublishedEducation(),
    getPublishedServices(),
    getPublishedSocialLinks(),
    getSiteSettings(),
    getActiveResume(),
  ]);

  return (
    <main className="portfolio-page">
      {/* 
        This wrapper keeps the exact styling that previously
        existed inside PremiumPortfolio.
      */}
      <div
        className="
          overflow-hidden
          bg-[#f6f6f2]
          text-[#17211d]
          selection:bg-[#b6d900]
          selection:text-[#17211d]
          dark:bg-[#101613]
          dark:text-[#f1f4ef]
          dark:selection:bg-[#91aa00]
          dark:selection:text-[#101613]
        "
      >
        {/* HERO */}
        <Hero
          profile={profile}
          hero={hero}
          activeResume={activeResume}
        />

        {/* ABOUT */}
        <About
          profile={profile}
          about={about}
        />

        {/* ROLES */}
        <Roles
          profile={profile}
          roles={roles}
        />

        {/* PROJECTS */}
        <Projects projects={projects} />

        {/* SERVICES */}
        {services.length > 0 && (
          <Services services={services} />
        )}

        {/* EXPERIENCE */}
        {experience.length > 0 && (
          <Experience experience={experience} />
        )}

        {/* EDUCATION */}
        {education.length > 0 && (
          <Education education={education} />
        )}

        {/* SKILLS */}
        <Skills skills={skills} />

        {/* RESUME */}
        {activeResume && (
          <Resume activeResume={activeResume} />
        )}

        {/* CERTIFICATIONS */}
        {certifications.length > 0 && (
          <Certifications certifications={certifications} />
        )}

        {/* TESTIMONIALS */}
        {testimonials.length > 0 && (
          <Testimonials testimonials={testimonials} />
        )}

        {/* FINAL CTA */}
        <FinalCTA />

        {/* CONTACT */}
      <div id="contact">
        <Contact profile={profile} />
      </div>

        {/* FOOTER */}
        <Footer
          profile={profile}
          siteSettings={siteSettings}
        />
      </div>

      
    </main>
  );
}