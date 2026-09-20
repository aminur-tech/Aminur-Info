import Contact from "../components/home/Contact";
import PremiumPortfolio from "../components/home/PremiumPortfolio";
import { getActiveResume, getApprovedTestimonials, getHero, getProfile, getPublishedAbout, getPublishedCertifications, getPublishedEducation, getPublishedExperience, getPublishedProjects, getPublishedRoles, getPublishedServices, getPublishedSkills, getPublishedSocialLinks, getSeoSettings, getSiteSettings } from "../lib/queries/portfolio";



export async function generateMetadata() {
  const seo = await getSeoSettings();
  return { title: seo?.title || "Aminur Rahman | Full-stack developer", description: seo?.description || "Aminur Rahman builds focused, reliable web products with thoughtful UX and production-ready engineering.", keywords: seo?.keywords, openGraph: { title: seo?.og_title || seo?.title, description: seo?.og_description || seo?.description, images: seo?.og_image ? [seo.og_image] : undefined }, alternates: seo?.canonical_url ? { canonical: seo.canonical_url } : undefined, robots: seo?.allow_indexing === false ? { index: false, follow: false } : undefined };
}

export default async function HomePage() {
  const [profile, hero, projects, skills, testimonials, certifications, about, roles, experience, education, services, socialLinks, siteSettings, activeResume] = await Promise.all([
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

  return <main className="portfolio-page"><PremiumPortfolio profile={profile} hero={hero} projects={projects} skills={skills} testimonials={testimonials} certifications={certifications} about={about} roles={roles} experience={experience} education={education} services={services} socialLinks={socialLinks} siteSettings={siteSettings} activeResume={activeResume} /><div id="contact"><Contact profile={profile} /></div></main>;
}
