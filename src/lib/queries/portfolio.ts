import { unstable_cache } from "next/cache";
import { db } from "../db";
import { env } from "../env";
import type { AboutContent, Certification, Education, Experience, HeroContent, Profile, Project, Resume, Role, SeoSettingsContent, Service, SiteSettingsContent, Skill, SocialLink, Testimonial } from "../../types/portfolio";

const emptyProfile: Profile = {
  name: "Aminur Rahman", title: "MERN Stack & Full Stack Developer", short_bio: null, long_bio: null,
  profile_image_url: null, email: "aminur.programme@gmail.com", phone: "+880 1327 694078",
  location: "Satkhira, Bangladesh", resume_url: null, availability_status: "available",
};

export const getProfile = unstable_cache(async (): Promise<Profile> => {
  if (!env.DATABASE_URL || env.SKIP_DATABASE === "true") return emptyProfile;
  const profile = await db.profile.findFirst({ where: { isPublic: true } });
  if (!profile) return emptyProfile;
  return {
    name: profile.name,
    title: profile.title,
    short_bio: profile.shortBio,
    long_bio: profile.longBio,
    profile_image_url: profile.profileImageUrl,
    email: profile.email,
    phone: profile.phone,
    location: profile.location,
    resume_url: profile.resumeUrl,
    availability_status: profile.availabilityStatus,
  };
}, ["portfolio-profile"], { revalidate: 300 });

export const getHero = unstable_cache(async (): Promise<HeroContent | null> => {
  if (!env.DATABASE_URL || env.SKIP_DATABASE === "true") return null;
  const hero = await db.hero.findFirst();
  return hero ? { heading: hero.heading, highlighted_text: hero.highlightedText, description: hero.description, primary_cta_label: hero.primaryCtaLabel, primary_cta_url: hero.primaryCtaUrl, secondary_cta_label: hero.secondaryCtaLabel, secondary_cta_url: hero.secondaryCtaUrl, availabilityBadge: hero.availabilityBadge, image_url: hero.imageUrl } : null;
}, ["portfolio-hero"], { revalidate: 300 });

export const getSiteSettings = unstable_cache(async (): Promise<SiteSettingsContent | null> => {
  if (!env.DATABASE_URL || env.SKIP_DATABASE === "true") return null;
  const settings = await db.siteSettings.findFirst();
  return settings ? { site_name: settings.siteName, professional_title: settings.professionalTitle, footer_text: settings.footerText, copyright_text: settings.copyrightText } : null;
}, ["portfolio-site-settings"], { revalidate: 300 });

export const getSeoSettings = unstable_cache(async (): Promise<SeoSettingsContent | null> => {
  if (!env.DATABASE_URL || env.SKIP_DATABASE === "true") return null;
  const settings = await db.sEOSettings.findFirst();
  return settings ? { title: settings.title, description: settings.description, keywords: settings.keywords, og_title: settings.ogTitle, og_description: settings.ogDescription, og_image: settings.ogImage, canonical_url: settings.canonicalUrl, allow_indexing: settings.allowIndexing } : null;
}, ["portfolio-seo-settings"], { revalidate: 300 });

export const getPublishedProjects = unstable_cache(async (): Promise<Project[]> => {
  if (!env.DATABASE_URL || env.SKIP_DATABASE === "true") return [];
  const projects = await db.project.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } });
  return projects.map((project) => ({
    id: project.id,
    title: project.title,
    slug: project.slug,
    short_description: project.shortDescription,
    full_description: project.fullDescription,
    thumbnail_url: project.thumbnailUrl,
    demo_url: project.demoUrl,
    github_url: project.githubUrl,
    frontend_github_url: project.frontendGithubUrl,
    backend_github_url: project.backendGithubUrl,
    server_site_url: project.serverSiteUrl,
    local_project_url: project.localProjectUrl,
    technologies: project.technologies,
    category: project.category,
    featured: project.featured,
  }));
}, ["published-projects"], { revalidate: 300 });

export const getPublishedSkills = unstable_cache(async (): Promise<Skill[]> => {
  if (!env.DATABASE_URL || env.SKIP_DATABASE === "true") return [];
  const skills = await db.skill.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } });
  return skills.map((skill) => ({
    id: skill.id,
    name: skill.name,
    category: skill.category,
    icon: skill.icon,
    level: skill.level,
    years: skill.years,
  }));
}, ["published-skills"], { revalidate: 300 });

export const getPublishedCertifications = unstable_cache(async (): Promise<Certification[]> => {
  if (!env.DATABASE_URL || env.SKIP_DATABASE === "true") return [];
  const certifications = await db.certification.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } });
  return certifications.map((certification) => ({
    id: certification.id,
    title: certification.name,
    issuer: certification.issuer,
    credentialId: certification.credentialId,
    credentialUrl: certification.credentialUrl,
    imageUrl: certification.imageUrl,
    description: certification.description,
  }));
}, ["published-certifications"], { revalidate: 300 });

export const getApprovedTestimonials = unstable_cache(async (): Promise<Testimonial[]> => {
  if (!env.DATABASE_URL || env.SKIP_DATABASE === "true") return [];
  const testimonials = await db.testimonial.findMany({ where: { status: "approved" }, orderBy: [{ featured: "desc" }, { createdAt: "desc" }], take: 12 });
  return testimonials.map((testimonial) => ({
    id: testimonial.id,
    name: testimonial.name,
    role: testimonial.role,
    company: testimonial.company,
    rating: testimonial.rating,
    comment: testimonial.comment,
    featured: testimonial.featured,
  }));
}, ["approved-testimonials"], { revalidate: 300 });

export const getPublishedRoles = unstable_cache(async (): Promise<Role[]> => {
  if (!env.DATABASE_URL || env.SKIP_DATABASE === "true") return [];
  const roles = await db.role.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } });
  return roles.map((role) => ({
    id: role.id, title: role.title, slug: role.slug, summary: role.summary,
    responsibilities: role.responsibilities, technologies: role.technologies,
    achievements: role.achievements, skills: role.skills, project_ids: role.projectIds,
    cta_label: role.ctaLabel, cta_url: role.ctaUrl,
  }));
}, ["published-roles"], { revalidate: 300 });

export const getPublishedAbout = unstable_cache(async (): Promise<AboutContent | null> => {
  if (!env.DATABASE_URL || env.SKIP_DATABASE === "true") return null;
  const about = await db.about.findFirst();
  return about ? { title: about.title, description: about.description, image_url: about.imageUrl, highlights: about.highlights, values: about.values } : null;
}, ["published-about"], { revalidate: 300 });

export const getActiveResume = unstable_cache(async (): Promise<Resume | null> => {
  if (!env.DATABASE_URL || env.SKIP_DATABASE === "true") return null;
  const activeResume = await db.resume.findFirst({ where: { isActive: true, published: true } });
  if (!activeResume) {
    const fallbackResume = await db.resume.findFirst({ where: { published: true }, orderBy: { sortOrder: "asc" } });
    if (!fallbackResume) return null;
    return {
      id: fallbackResume.id,
      title: fallbackResume.title,
      file_url: fallbackResume.fileUrl,
      summary: fallbackResume.summary,
      is_active: fallbackResume.isActive,
      version: fallbackResume.version,
      published: fallbackResume.published,
    };
  }
  return {
    id: activeResume.id,
    title: activeResume.title,
    file_url: activeResume.fileUrl,
    summary: activeResume.summary,
    is_active: activeResume.isActive,
    version: activeResume.version,
    published: activeResume.published,
  };
}, ["active-resume"], { revalidate: 300 });

export const getPublishedExperience = unstable_cache(async (): Promise<Experience[]> => {
  if (!env.DATABASE_URL || env.SKIP_DATABASE === "true") return [];
  const experiences = await db.experience.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } });
  return experiences.map((item) => ({ id: item.id, company: item.company, position: item.position, location: item.location, start_date: item.startDate?.toISOString() ?? null, end_date: item.endDate?.toISOString() ?? null, current_position: item.currentPosition, description: item.description, responsibilities: item.responsibilities, technologies: item.technologies }));
}, ["published-experience"], { revalidate: 300 });

export const getPublishedEducation = unstable_cache(async (): Promise<Education[]> => {
  if (!env.DATABASE_URL || env.SKIP_DATABASE === "true") return [];
  const education = await db.education.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } });
  return education.map((item) => ({ id: item.id, institution: item.institution, degree: item.degree, field: item.field, start_date: item.startDate?.toISOString() ?? null, end_date: item.endDate?.toISOString() ?? null, grade: item.grade, description: item.description }));
}, ["published-education"], { revalidate: 300 });

export const getPublishedServices = unstable_cache(async (): Promise<Service[]> => {
  if (!env.DATABASE_URL || env.SKIP_DATABASE === "true") return [];
  const services = await db.service.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } });
  return services.map((item) => ({ id: item.id, title: item.title, short_description: item.shortDescription, full_description: item.fullDescription, features: item.features, delivery_time: item.deliveryTime }));
}, ["published-services"], { revalidate: 300 });

export const getPublishedSocialLinks = unstable_cache(async (): Promise<SocialLink[]> => {
  if (!env.DATABASE_URL || env.SKIP_DATABASE === "true") return [];
  const links = await db.socialLink.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } });
  return links.map((item) => ({ id: item.id, platform: item.platform, label: item.label, url: item.url }));
}, ["published-social-links"], { revalidate: 300 });