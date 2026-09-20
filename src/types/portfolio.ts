export type Project = {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  full_description: string | null;
  thumbnail_url: string | null;
  demo_url: string | null;
  github_url: string | null;
  frontend_github_url: string | null;
  backend_github_url: string | null;
  server_site_url: string | null;
  local_project_url: string | null;
  technologies: string[];
  category: string | null;
  featured: boolean;
};

export type Skill = {
  id: string;
  name: string;
  category: string;
  icon: string | null;
  level: number | null;
  years: number | null;
};

export type Profile = {
  name: string;
  title: string;
  short_bio: string | null;
  long_bio: string | null;
  profile_image_url: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  resume_url: string | null;
  availability_status: string | null;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  rating: number;
  comment: string;
  featured: boolean;
};

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  credentialId: string | null;
  credentialUrl: string | null;
  imageUrl: string | null;
  description: string | null;
};

export type Role = {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
  skills: string[];
  project_ids: string[];
  cta_label: string | null;
  cta_url: string | null;
};

export type AboutContent = {
  title: string;
  description: string | null;
  image_url: string | null;
  highlights: string[];
  values: string[];
};

export type Resume = {
  id: string;
  title: string;
  file_url: string;
  summary: string | null;
  is_active: boolean;
  version: string | null;
  published: boolean;
};

export type Experience = {
  id: string;
  company: string;
  position: string;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  current_position: boolean;
  description: string | null;
  responsibilities: string[];
  technologies: string[];
};

export type Education = {
  id: string;
  institution: string;
  degree: string;
  field: string | null;
  start_date: string | null;
  end_date: string | null;
  grade: string | null;
  description: string | null;
};

export type Service = {
  id: string;
  title: string;
  short_description: string;
  full_description: string | null;
  features: string[];
  delivery_time: string | null;
};

export type SocialLink = {
  id: string;
  platform: string;
  label: string;
  url: string;
};

export type HeroContent = {
  heading: string;
  highlighted_text: string | null;
  description: string | null;
  primary_cta_label: string | null;
  primary_cta_url: string | null;
  secondary_cta_label: string | null;
  secondary_cta_url: string | null;
  availability_badge: string | null;
  image_url: string | null;
};

export type SiteSettingsContent = {
  site_name: string;
  professional_title: string | null;
  footer_text: string | null;
  copyright_text: string | null;
};

export type SeoSettingsContent = {
  title: string;
  description: string;
  keywords: string[];
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  canonical_url: string | null;
  allow_indexing: boolean;
};