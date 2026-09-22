// "use client";

// import { AnimatePresence, motion } from "framer-motion";
// import {
//   ArrowDownRight,
//   ArrowUpRight,
//   Check,
//   Code2,
//   ExternalLink,
//   Github,
//   Layers3,
//   Mail,
//   MapPin,
// } from "lucide-react";
// import { useState } from "react";


// import Certifications from "./Certifications";

// import type {
//   AboutContent,
//   Certification,
//   Education,
//   Experience,
//   HeroContent,
//   Profile,
//   Project,
//   Resume,
//   Role,
//   Service,
//   SiteSettingsContent,
//   Skill,
//   SocialLink,
//   Testimonial,
// } from "../../types/portfolio";

// type Props = {
//   profile: Profile;
//   hero: HeroContent | null;
//   projects: Project[];
//   skills: Skill[];
//   testimonials: Testimonial[];
//   certifications: Certification[];
//   about: AboutContent | null;
//   roles: Role[];
//   experience: Experience[];
//   education: Education[];
//   services: Service[];
//   socialLinks: SocialLink[];
//   siteSettings: SiteSettingsContent | null;
//   activeResume: Resume | null;
// };

// export default function PremiumPortfolio({
//   profile,
//   hero,
//   projects,
//   skills,
//   testimonials,
//   certifications,
//   about,
//   roles,
//   experience,
//   education,
//   services,
//   socialLinks,
//   siteSettings,
//   activeResume,
// }: Props) {
//   /* -------------------------------------------------
//      FALLBACK ROLES
//   ------------------------------------------------- */

//   const fallbackRoles: Role[] = [
//     {
//       id: "engineering",
//       title: profile.title || "Full-stack engineering",
//       slug: "engineering",
//       summary:
//         "I turn complex requirements into dependable web applications, from database design to the final interface.",
//       responsibilities: [
//         "Built responsive interfaces for modern web applications",
//         "Developed reusable component-based frontend architectures",
//         "Created responsive dashboards, e-commerce interfaces, and portfolio websites",
//         "Implemented state management and API data synchronization",
//         "Improved usability through responsive layouts and interactive UI components",
//       ],
//       technologies: [],
//       achievements: [],
//       skills: [],
//       project_ids: [],
//       cta_label: "Discuss engineering",
//       cta_url: "#contact",
//     },
//     {
//       id: "product",
//       title: "Product-minded delivery",
//       slug: "product-delivery",
//       summary:
//         "I help teams move from a rough idea to a clear, useful product with an interface that earns trust.",
//       responsibilities: [
//         "Clear product thinking before code",
//         "Responsive, accessible experiences",
//         "Fast feedback and visible progress",
//       ],
//       technologies: [],
//       achievements: [],
//       skills: [],
//       project_ids: [],
//       cta_label: "Discuss a product",
//       cta_url: "#contact",
//     },
//   ];

//   const roleData = roles.length ? roles : fallbackRoles;

//   const [roleIndex, setRoleIndex] = useState(0);

//   const activeRole = roleData[roleIndex] || roleData[0];

//   const aboutPoints = about?.highlights.length
//     ? about.highlights
//     : [
//       "From idea to deployment",
//       "Interfaces people understand",
//       "Reliable APIs and data models",
//       "Long-term ownership and iteration",
//     ];

//   /* -------------------------------------------------
//      AVAILABILITY
//   ------------------------------------------------- */

//   const availabilityText =
//     hero?.availability_badge ||
//     profile.availability_status ||
//     "Available for new work";

//   /* -------------------------------------------------
//      MAIN
//   ------------------------------------------------- */

//   return (
//     <div
//       className="
//         overflow-hidden
//         bg-[#f6f6f2]
//         text-[#17211d]
//         selection:bg-[#b6d900]
//         selection:text-[#17211d]

//         dark:bg-[#101613]
//         dark:text-[#f1f4ef]
//         dark:selection:bg-[#91aa00]
//         dark:selection:text-[#101613]
//       "
//     >
//       {/* =====================================================
//           HERO
//       ===================================================== */}

//       <section
//         id="hero"
//         className="
//           relative
//           border-b
//           border-[#17211d]/10
//           dark:border-white/10
//         "
//       >
//         {/* Background Grid */}
//         <div
//           className="
//             portfolio-grid
//             absolute
//             inset-0
//             opacity-40
//             dark:opacity-20
//           "
//         />

//         <div
//           className="
//             relative
//             mx-auto
//             max-w-7xl
//             px-5
//             pb-20
//             pt-16
//             sm:px-8
//             lg:px-12
//             lg:pb-28
//             lg:pt-24
//           "
//         >
//           {/* -------------------------------------------------
//               TOP INFORMATION
//           ------------------------------------------------- */}

//           <div
//             className="
//               flex
//               items-center
//               justify-between
//               gap-4
//               text-xs
//               font-bold
//               uppercase
//               tracking-[0.2em]
//               text-[#52605a]
//               dark:text-[#aab5ad]
//             "
//           >
//             <span>Full Stack Developer / Bangladesh</span>

//             <a
//               href="#projects"
//               className="
//                 hidden
//                 rounded-full
//                 border
//                 border-[#91aa00]/40
//                 bg-[#91aa00]/5
//                 px-4
//                 py-2
//                 text-[10px]
//                 font-bold
//                 uppercase
//                 tracking-[0.14em]
//                 text-[#657b00]
//                 transition-all
//                 duration-300

//                 hover:border-[#657b00]
//                 hover:bg-[#657b00]
//                 hover:text-white

//                 dark:border-[#91aa00]/40
//                 dark:bg-[#91aa00]/10
//                 dark:text-[#b6c96a]
//                 dark:hover:border-[#91aa00]
//                 dark:hover:bg-[#91aa00]
//                 dark:hover:text-[#17211d]

//                 sm:block
//               "
//             >
//               My Projects
//             </a>
//           </div>

//           {/* -------------------------------------------------
//               HERO GRID
//           ------------------------------------------------- */}

//           <div
//             className="
//               mt-16
//               grid
//               items-end
//               gap-12
//               lg:grid-cols-[1.15fr_.85fr]
//               lg:gap-20
//             "
//           >
//             {/* =================================================
//                 LEFT CONTENT
//             ================================================= */}

//             <div>
//               {/* Availability */}

//               <div
//                 className="
//                   mb-7
//                   inline-flex
//                   items-center
//                   gap-2
//                   rounded-full
//                   border
//                   border-[#17211d]/15
//                   bg-white/60
//                   px-3
//                   py-2
//                   text-xs
//                   font-bold
//                   uppercase
//                   tracking-[0.16em]

//                   dark:border-white/15
//                   dark:bg-white/5
//                   dark:text-[#d9dfd5]
//                 "
//               >
//                 <span
//                   className="
//                     h-2
//                     w-2
//                     rounded-full
//                     bg-[#91aa00]
//                     shadow-[0_0_0_5px_rgba(145,170,0,.16)]
//                     dark:bg-[#b6d900]
//                     dark:shadow-[0_0_0_5px_rgba(182,217,0,.12)]
//                   "
//                 />

//                 <span>{availabilityText}</span>
//               </div>

//               {/* Main Heading */}

//               <h1
//                 className="
//                   max-w-4xl
//                   font-serif
//                   text-[clamp(3.4rem,8vw,8.6rem)]
//                   leading-[.86]
//                   tracking-[-.07em]
//                   text-[#17211d]
//                   dark:text-[#f1f4ef]
//                 "
//               >
//                 {hero?.heading || "I build useful digital products."}
//               </h1>

//               {/* Description */}

//               <p
//                 className="
//                   mt-9
//                   max-w-xl
//                   text-lg
//                   leading-8
//                   text-[#52605a]
//                   dark:text-[#aab5ad]
//                 "
//               >
//                 {hero?.description ||
//                   profile.short_bio ||
//                   "I design and develop modern web experiences that combine clean UX, reliable architecture, and measurable business value."}
//               </p>

//               {/* CTA Buttons */}

//               <div className="mt-9 flex flex-wrap gap-3">
//                 {/* Primary CTA */}

//                 <a
//                   href={hero?.primary_cta_url || "#contact"}
//                   className="
//                     inline-flex
//                     items-center
//                     gap-3
//                     rounded-full
//                     bg-[#17211d]
//                     px-6
//                     py-3.5
//                     text-sm
//                     font-bold
//                     text-white
//                     transition-all
//                     duration-300
//                     dark:bg-[#b6d900]
//                     hover:bg-[#657b00]
                    
//                   "
//                 >
//                   {hero?.primary_cta_label || "Hire me"}

//                   <ArrowUpRight size={16} />
//                 </a>

//                 {/* Secondary CTA */}

//                 <a
//                   href={hero?.secondary_cta_url || "#projects"}
//                   className="
//                     inline-flex
//                     items-center
//                     gap-3
//                     rounded-full
//                     border
//                     border-[#17211d]/20
//                     bg-white/40
//                     px-6
//                     py-3.5
//                     text-sm
//                     font-bold
//                     text-[#17211d]
//                     transition-all
//                     duration-300
//                     hover:border-[#657b00]
//                     hover:text-[#657b00]

//                     dark:border-white/20
//                     dark:bg-white/5
//                     dark:text-[#f1f4ef]
//                     dark:hover:border-[#91aa00]
//                     dark:hover:text-[#b6d900]
//                   "
//                 >
//                   {hero?.secondary_cta_label || "View my work"}

//                   <ArrowDownRight size={16} />
//                 </a>

//                 {/* Download CV */}

//                 {(profile.resume_url || activeResume?.file_url) && (
//                   <a
//                     href={
//                       profile.resume_url ||
//                       activeResume?.file_url ||
//                       "#"
//                     }
//                     target={
//                       profile.resume_url || activeResume?.file_url
//                         ? "_blank"
//                         : undefined
//                     }
//                     rel="noreferrer"
//                     download
//                     className="
//                       inline-flex
//                       items-center
//                       px-3
//                       py-3.5
//                       text-sm
//                       font-bold
//                       text-[#52605a]
//                       underline
//                       decoration-[#91aa00]
//                       decoration-2
//                       underline-offset-4
//                       transition-all
//                       duration-300
//                       hover:text-[#657b00]

//                       dark:text-[#aab5ad]
//                       dark:decoration-[#b6d900]
//                       dark:hover:text-[#b6d900]
//                     "
//                   >
//                     Download CV
//                   </a>
//                 )}
//               </div>
//             </div>

//             {/* =================================================
//                 HERO IMAGE
//             ================================================= */}

//             <div className="relative mx-auto w-full max-w-md lg:ml-auto">
//               {/* Floating Badge */}
//               <motion.div
//                 initial={{
//                   opacity: 0,
//                   scale: 0.75,
//                   rotate: 10,
//                   y: -10,
//                 }}
//                 animate={{
//                   opacity: 1,
//                   scale: 1,
//                   rotate: [5, 2, 5],
//                   y: [0, -6, 0],
//                 }}
//                 transition={{
//                   opacity: {
//                     duration: 0.6,
//                     ease: "easeOut",
//                   },
//                   scale: {
//                     duration: 0.6,
//                     ease: "easeOut",
//                   },
//                   rotate: {
//                     duration: 5,
//                     repeat: Infinity,
//                     ease: "easeInOut",
//                   },
//                   y: {
//                     duration: 3.5,
//                     repeat: Infinity,
//                     ease: "easeInOut",
//                   },
//                 }}
//                 whileHover={{
//                   scale: 1.06,
//                   rotate: 0,
//                   transition: {
//                     duration: 0.25,
//                     ease: "easeOut",
//                   },
//                 }}
//                 className="
//       absolute
//       right-1
//       top-1
//       z-20

//       flex
//       aspect-square
//       w-[82px]
//       items-center
//       justify-center

//       rounded-[20px]

//       bg-[#b6d900]
//       text-[#17211d]

//       shadow-[0_12px_30px_rgba(23,33,29,0.18)]

//       will-change-transform

//       sm:-right-3
//       sm:-top-3
//       sm:w-[94px]
//       sm:rounded-[22px]

//       md:-right-4
//       md:-top-4
//       md:w-[104px]
//       md:rounded-[24px]

//       lg:-right-5
//       lg:-top-5
//       lg:w-[112px]

//       dark:bg-[#91aa00]
//       dark:text-[#101613]
//       dark:shadow-[0_14px_35px_rgba(0,0,0,0.35)]
//     "
//               >
//                 {/* Subtle inner border */}
//                 <div
//                   className="
//         pointer-events-none
//         absolute
//         inset-[3px]
//         rounded-[17px]
//         border
//         border-[#17211d]/10

//         sm:rounded-[19px]

//         dark:border-[#f1f4ef]/10
//       "
//                 />

//                 {/* Badge Content */}
//                 <span
//                   className="
//         relative
//         max-w-[78px]
//         px-1
//         text-center

//         text-[9px]
//         font-black
//         uppercase
//         leading-[1.35]
//         tracking-[-0.01em]

//         sm:max-w-[84px]
//         sm:text-[10px]

//         md:max-w-[90px]
//         md:text-[11px]
//       "
//                 >
//                   {hero?.availability_badge ||
//                     profile.availability_status ||
//                     "Open to Remote Opportunities"}
//                 </span>
//               </motion.div>

//               {/* Image */}
//               <motion.div
//                 initial={{
//                   opacity: 0,
//                   y: 20,
//                 }}
//                 animate={{
//                   opacity: 1,
//                   y: 0,
//                 }}
//                 transition={{
//                   duration: 0.7,
//                   delay: 0.15,
//                   ease: [0.22, 1, 0.36, 1],
//                 }}
//                 className="
//       aspect-[.86]
//       overflow-hidden
//       rounded-[2rem]
//       bg-[#d9dfd5]

//       shadow-[18px_18px_0_#cbd3b1]

//       dark:bg-[#1c2621]
//       dark:shadow-[18px_18px_0_#3c472f]
//     "
//               >
//                 <img
//                   src={
//                     hero?.image_url ||
//                     profile.profile_image_url ||
//                     "/logo.png"
//                   }
//                   alt={profile.name}
//                   className="
//         h-full
//         w-full
//         object-cover

//         grayscale-[.18]

//         transition-all
//         duration-700
//         ease-out

//         hover:scale-105
//         hover:grayscale-0
//       "
//                 />
//               </motion.div>

//               {/* Image Information */}
//               <motion.div
//                 initial={{
//                   opacity: 0,
//                   y: 10,
//                 }}
//                 animate={{
//                   opacity: 1,
//                   y: 0,
//                 }}
//                 transition={{
//                   duration: 0.5,
//                   delay: 0.4,
//                   ease: "easeOut",
//                 }}
//                 className="
//       mt-4
//       flex
//       items-center
//       justify-between
//       gap-4

//       text-xs
//       font-bold
//       uppercase
//       tracking-[.16em]

//       text-[#52605a]

//       dark:text-[#aab5ad]
//     "
//               >
//                 <span>{profile.name}</span>

//                 <span className="text-right">
//                   {profile.title}
//                 </span>
//               </motion.div>
//             </div>
//           </div>

//           {/* Scroll */}

//           <div
//             className="
//               mt-16
//               flex
//               items-center
//               gap-3
//               text-xs
//               font-bold
//               uppercase
//               tracking-[.2em]
//               text-[#52605a]

//               dark:text-[#aab5ad]
//             "
//           >
//             <span className="h-px w-10 bg-[#91aa00]" />

//             Scroll to explore
//           </div>
//         </div>
//       </section>

//       {/* =====================================================
//           ABOUT
//       ===================================================== */}

//       <section
//         id="about"
//         className="
//           mx-auto
//           max-w-7xl
//           px-5
//           py-24
//           sm:px-8
//           lg:px-12
//           lg:py-32
//         "
//       >
//         <div
//           className="
//             grid
//             gap-12
//             lg:grid-cols-[.7fr_1.3fr]
//             lg:gap-24
//           "
//         >
//           <div>
//             <p className="eyebrow">
//               01 / {about?.title || "How I work"}
//             </p>

//             <h2
//               className="
//                 section-title
//                 mt-5
//                 text-[#17211d]
//                 dark:text-[#f1f4ef]
//               "
//             >
//               Technology is only useful when it solves the right problem.
//             </h2>
//           </div>

//           <div>
//             <p
//               className="
//                 max-w-2xl
//                 text-xl
//                 leading-9
//                 text-[#52605a]
//                 dark:text-[#aab5ad]
//               "
//             >
//               {about?.description ||
//                 profile.long_bio ||
//                 "I care about the parts of product development that make a difference: a clear interface, a solid foundation, and the discipline to ship thoughtfully."}
//             </p>

//             <div className="mt-10 grid gap-3 sm:grid-cols-2">
//               {aboutPoints.map((point, index) => (
//                 <p
//                   key={point}
//                   className="
//                     flex
//                     gap-3
//                     border-t
//                     border-[#17211d]/15
//                     py-4
//                     text-sm
//                     font-bold

//                     dark:border-white/10
//                   "
//                 >
//                   <span className="text-[#91aa00] dark:text-[#b6d900]">
//                     {index + 1}
//                   </span>

//                   <span>{point}</span>
//                 </p>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* =====================================================
//           ROLES
//       ===================================================== */}

//       <section
//         id="roles"
//         className="
//           border-y
//           border-[#17211d]/10
//           bg-[#e9eee4]

//           dark:border-white/10
//           dark:bg-[#19211d]
//         "
//       >
//         <div
//           className="
//             mx-auto
//             max-w-7xl
//             px-5
//             py-24
//             sm:px-8
//             lg:px-12
//             lg:py-28
//           "
//         >
//           <div
//             className="
//               mb-12
//               flex
//               flex-col
//               justify-between
//               gap-6
//               md:flex-row
//               md:items-end
//             "
//           >
//             <div>
//               <p className="eyebrow">
//                 02 / Role lens
//               </p>

//               <h2
//                 className="
//                   section-title
//                   mt-5
//                   max-w-2xl
//                   text-[#17211d]
//                   dark:text-[#f1f4ef]
//                 "
//               >
//                 The same craft, tuned to the work in front of us.
//               </h2>
//             </div>

//             {/* Role Tabs */}

//             <div
//               className="
//                 flex
//                 flex-wrap
//                 rounded-full
//                 border
//                 border-[#17211d]/15
//                 bg-white/60
//                 p-1

//                 dark:border-white/10
//                 dark:bg-white/5
//               "
//               role="tablist"
//               aria-label="Role perspective"
//             >
//               {roleData.map((role, index) => (
//                 <button
//                   key={role.id}
//                   onClick={() => setRoleIndex(index)}
//                   className={`
//                     rounded-full
//                     px-4
//                     py-2
//                     text-xs
//                     font-bold
//                     uppercase
//                     tracking-[.12em]
//                     transition-all

//                     ${roleIndex === index
//                       ? "bg-[#17211d] text-white dark:bg-[#b6d900] dark:text-[#17211d]"
//                       : "text-[#52605a] hover:text-[#657b00] dark:text-[#aab5ad] dark:hover:text-[#b6d900]"
//                     }
//                   `}
//                   role="tab"
//                   aria-selected={roleIndex === index}
//                 >
//                   {role.title}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <AnimatePresence mode="wait">
//             <motion.div
//               key={activeRole.id}
//               initial={{
//                 opacity: 0,
//                 y: 12,
//               }}
//               animate={{
//                 opacity: 1,
//                 y: 0,
//               }}
//               exit={{
//                 opacity: 0,
//                 y: -12,
//               }}
//               transition={{
//                 duration: 0.25,
//               }}
//               className="
//                 grid
//                 gap-10
//                 lg:grid-cols-[.75fr_1.25fr]
//               "
//             >
//               <div>
//                 <p
//                   className="
//                     text-2xl
//                     font-serif
//                     italic
//                     text-[#657b00]

//                     dark:text-[#b6d900]
//                   "
//                 >
//                   {activeRole.title}
//                 </p>

//                 <p
//                   className="
//                     mt-5
//                     max-w-md
//                     text-lg
//                     leading-8
//                     text-[#52605a]

//                     dark:text-[#aab5ad]
//                   "
//                 >
//                   {activeRole.summary}
//                 </p>

//                 <a
//                   href={activeRole.cta_url || "#contact"}
//                   className="
//                     mt-7
//                     inline-flex
//                     items-center
//                     gap-2
//                     text-sm
//                     font-bold
//                     underline
//                     decoration-[#91aa00]
//                     decoration-2
//                     underline-offset-4
//                     transition

//                     hover:text-[#657b00]

//                     dark:decoration-[#b6d900]
//                     dark:hover:text-[#b6d900]
//                   "
//                 >
//                   {activeRole.cta_label || "Let's talk"}

//                   <ArrowUpRight size={15} />
//                 </a>
//               </div>

//               <div className="grid gap-3 sm:grid-cols-2">
//                 {activeRole.responsibilities.map(
//                   (point, index) => (
//                     <p
//                       key={point}
//                       className="
//                         flex
//                         gap-3
//                         rounded-2xl
//                         border
//                         border-[#17211d]/10
//                         bg-white/60
//                         p-5
//                         text-sm
//                         font-bold
//                         leading-6

//                         dark:border-white/10
//                         dark:bg-white/5
//                       "
//                     >
//                       <span className="text-[#91aa00] dark:text-[#b6d900]">
//                         {index + 1}
//                       </span>

//                       <span>{point}</span>
//                     </p>
//                   )
//                 )}
//               </div>
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </section>

//       {/* =====================================================
//           PROJECTS
//       ===================================================== */}

//       <section
//         id="projects"
//         className="
//           mx-auto
//           max-w-7xl
//           px-5
//           py-24
//           sm:px-8
//           lg:px-12
//           lg:py-32
//         "
//       >
//         <div
//           className="
//             mb-12
//             flex
//             items-end
//             justify-between
//             gap-6
//           "
//         >
//           <div>
//             <p className="eyebrow">
//               03 / Selected work
//             </p>

//             <h2
//               className="
//                 section-title
//                 mt-5
//                 text-[#17211d]
//                 dark:text-[#f1f4ef]
//               "
//             >
//               Built for the real world.
//             </h2>
//           </div>

//           <span
//             className="
//               hidden
//               text-sm
//               text-[#52605a]
//               dark:text-[#aab5ad]
//               sm:block
//             "
//           >
//             {projects.length} published{" "}
//             {projects.length === 1 ? "project" : "projects"}
//           </span>
//         </div>

//         <div className="grid gap-6 md:grid-cols-2">
//           {projects.map((project, index) => (
//             <article
//               key={project.id}
//               className={`
//                 group
//                 overflow-hidden
//                 rounded-3xl
//                 border
//                 border-[#17211d]/10
//                 bg-white

//                 dark:border-white/10
//                 dark:bg-[#18201c]

//                 ${index === 0
//                   ? "md:col-span-2"
//                   : ""
//                 }
//               `}
//             >
//               <div
//                 className={`
//                   grid
//                   ${index === 0
//                     ? "lg:grid-cols-[1.15fr_.85fr]"
//                     : ""
//                   }
//                 `}
//               >
//                 {/* Project Image */}

//                 <div
//                   className={`
//                     relative
//                     min-h-64
//                     overflow-hidden
//                     bg-[#dce3d7]

//                     dark:bg-[#202b25]

//                     ${index === 0
//                       ? "lg:min-h-[30rem]"
//                       : ""
//                     }
//                   `}
//                 >
//                   {project.thumbnail_url ? (
//                     <img
//                       src={project.thumbnail_url}
//                       alt={project.title}
//                       loading="lazy"
//                       className="
//                         h-full
//                         w-full
//                         object-cover
//                         transition
//                         duration-700
//                         group-hover:scale-105
//                       "
//                     />
//                   ) : (
//                     <div className="grid h-full place-items-center">
//                       <Layers3
//                         size={54}
//                         className="
//                           text-[#8c9a86]
//                           dark:text-[#657b00]
//                         "
//                       />
//                     </div>
//                   )}

//                   <div
//                     className="
//                       absolute
//                       left-5
//                       top-5
//                       rounded-full
//                       bg-[#f6f6f2]/90
//                       px-3
//                       py-1.5
//                       text-[10px]
//                       font-bold
//                       uppercase
//                       tracking-[.16em]

//                       dark:bg-[#17211d]/90
//                       dark:text-[#d9dfd5]
//                     "
//                   >
//                     {project.category || "Web product"}
//                   </div>
//                 </div>

//                 {/* Project Content */}

//                 <div
//                   className="
//                     flex
//                     flex-col
//                     justify-between
//                     p-6
//                     sm:p-8
//                   "
//                 >
//                   <div>
//                     <div
//                       className="
//                         mb-10
//                         flex
//                         items-center
//                         justify-between
//                         text-xs
//                         font-bold
//                         text-[#91aa00]

//                         dark:text-[#b6d900]
//                       "
//                     >
//                       <span>
//                         0{index + 1}
//                       </span>

//                       <span>
//                         Case study
//                       </span>
//                     </div>

//                     <a
//                       href={`/projects/${project.slug}`}
//                       className="group/title"
//                     >
//                       <h3
//                         className="
//                           text-3xl
//                           font-serif
//                           leading-tight
//                           transition-colors

//                           group-hover/title:text-[#657b00]

//                           dark:group-hover/title:text-[#b6d900]
//                         "
//                       >
//                         {project.title}
//                       </h3>
//                     </a>

//                     <p
//                       className="
//                         mt-4
//                         leading-7
//                         text-[#52605a]

//                         dark:text-[#aab5ad]
//                       "
//                     >
//                       {project.short_description}
//                     </p>
//                   </div>

//                   <div className="mt-10">
//                     <div className="mb-5 flex flex-wrap gap-2">
//                       {project.technologies
//                         .slice(0, 5)
//                         .map((tech) => (
//                           <span
//                             key={tech}
//                             className="
//                               rounded-full
//                               bg-[#edf1e7]
//                               px-3
//                               py-1
//                               text-[11px]
//                               font-bold
//                               text-[#52605a]

//                               dark:bg-[#273229]
//                               dark:text-[#aab5ad]
//                             "
//                           >
//                             {tech}
//                           </span>
//                         ))}
//                     </div>

//                     <div className="flex flex-wrap gap-4 text-sm font-bold">
//                       <a
//                         href={`/projects/${project.slug}`}
//                         className="
//                           inline-flex
//                           items-center
//                           gap-2
//                           underline
//                           decoration-[#91aa00]
//                           decoration-2
//                           underline-offset-4
//                           transition

//                           hover:text-[#657b00]

//                           dark:decoration-[#b6d900]
//                           dark:hover:text-[#b6d900]
//                         "
//                       >
//                         Read case study

//                         <ArrowUpRight size={14} />
//                       </a>

//                       {project.demo_url && (
//                         <a
//                           href={project.demo_url}
//                           target="_blank"
//                           rel="noreferrer"
//                           className="
//                             inline-flex
//                             items-center
//                             gap-2
//                             text-[#52605a]
//                             transition

//                             hover:text-[#657b00]

//                             dark:text-[#aab5ad]
//                             dark:hover:text-[#b6d900]
//                           "
//                         >
//                           Live demo

//                           <ExternalLink size={14} />
//                         </a>
//                       )}

//                       {project.github_url && (
//                         <a
//                           href={project.github_url}
//                           target="_blank"
//                           rel="noreferrer"
//                           className="
//                             inline-flex
//                             items-center
//                             gap-2
//                             text-[#52605a]
//                             transition

//                             hover:text-[#657b00]

//                             dark:text-[#aab5ad]
//                             dark:hover:text-[#b6d900]
//                           "
//                         >
//                           <Github size={15} />

//                           Source
//                         </a>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </article>
//           ))}
//         </div>
//       </section>

//       {/* =====================================================
//           SERVICES
//       ===================================================== */}

//       {services.length > 0 && (
//         <section
//           id="services"
//           className="
//             border-y
//             border-[#17211d]/10
//             bg-[#e9eee4]

//             dark:border-white/10
//             dark:bg-[#19211d]
//           "
//         >
//           <div
//             className="
//               mx-auto
//               max-w-7xl
//               px-5
//               py-24
//               sm:px-8
//               lg:px-12
//               lg:py-28
//             "
//           >
//             <p className="eyebrow">
//               04 / Services
//             </p>

//             <h2
//               className="
//                 section-title
//                 mt-5
//                 max-w-3xl
//                 text-[#17211d]
//                 dark:text-[#f1f4ef]
//               "
//             >
//               Useful work for teams moving forward.
//             </h2>

//             <div
//               className="
//                 mt-12
//                 grid
//                 gap-4
//                 md:grid-cols-2
//                 lg:grid-cols-3
//               "
//             >
//               {services.map((service, index) => (
//                 <article
//                   key={service.id}
//                   className="
//                     rounded-2xl
//                     border
//                     border-[#17211d]/10
//                     bg-white/60
//                     p-6

//                     dark:border-white/10
//                     dark:bg-white/5
//                   "
//                 >
//                   <p className="text-sm font-bold text-[#91aa00] dark:text-[#b6d900]">
//                     0{index + 1}
//                   </p>

//                   <h3
//                     className="
//                       mt-8
//                       text-2xl
//                       font-serif
//                     "
//                   >
//                     {service.title}
//                   </h3>

//                   <p
//                     className="
//                       mt-3
//                       leading-7
//                       text-[#52605a]

//                       dark:text-[#aab5ad]
//                     "
//                   >
//                     {service.short_description}
//                   </p>

//                   {service.features.length > 0 && (
//                     <ul
//                       className="
//                         mt-6
//                         space-y-2
//                         text-sm
//                         text-[#52605a]

//                         dark:text-[#aab5ad]
//                       "
//                     >
//                       {service.features.map(
//                         (feature) => (
//                           <li
//                             key={feature}
//                             className="flex gap-2"
//                           >
//                             <Check
//                               size={15}
//                               className="
//                                 mt-0.5
//                                 shrink-0
//                                 text-[#91aa00]

//                                 dark:text-[#b6d900]
//                               "
//                             />

//                             {feature}
//                           </li>
//                         )
//                       )}
//                     </ul>
//                   )}
//                 </article>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* =====================================================
//           EXPERIENCE
//       ===================================================== */}

//       {experience.length > 0 && (
//         <section
//           id="experience"
//           className="
//             mx-auto
//             max-w-7xl
//             px-5
//             py-24
//             sm:px-8
//             lg:px-12
//             lg:py-32
//           "
//         >
//           <div
//             className="
//               grid
//               gap-12
//               lg:grid-cols-[.7fr_1.3fr]
//             "
//           >
//             <div>
//               <p className="eyebrow">
//                 05 / Experience
//               </p>

//               <h2
//                 className="
//                   section-title
//                   mt-5
//                   text-[#17211d]
//                   dark:text-[#f1f4ef]
//                 "
//               >
//                 Work that compounds.
//               </h2>
//             </div>

//             <div className="space-y-8">
//               {experience.map((item) => (
//                 <article
//                   key={item.id}
//                   className="
//                     border-t
//                     border-[#17211d]/15
//                     pt-5

//                     dark:border-white/10
//                   "
//                 >
//                   <div
//                     className="
//                       flex
//                       flex-wrap
//                       justify-between
//                       gap-3
//                     "
//                   >
//                     <h3 className="text-2xl font-serif">
//                       {item.position}
//                     </h3>

//                     <span
//                       className="
//                         text-xs
//                         font-bold
//                         uppercase
//                         tracking-[.12em]
//                         text-[#657b00]

//                         dark:text-[#b6d900]
//                       "
//                     >
//                       {item.company}
//                     </span>
//                   </div>

//                   <p
//                     className="
//                       mt-3
//                       text-sm
//                       text-[#52605a]

//                       dark:text-[#aab5ad]
//                     "
//                   >
//                     {item.start_date
//                       ? new Date(
//                         item.start_date
//                       ).toLocaleDateString(
//                         "en-US",
//                         {
//                           month: "short",
//                           year: "numeric",
//                         }
//                       )
//                       : ""}{" "}
//                     -{" "}
//                     {item.current_position
//                       ? "Present"
//                       : item.end_date
//                         ? new Date(
//                           item.end_date
//                         ).toLocaleDateString(
//                           "en-US",
//                           {
//                             month: "short",
//                             year: "numeric",
//                           }
//                         )
//                         : ""}
//                     {item.location
//                       ? ` · ${item.location}`
//                       : ""}
//                   </p>

//                   <p
//                     className="
//                       mt-4
//                       max-w-2xl
//                       leading-7
//                       text-[#52605a]

//                       dark:text-[#aab5ad]
//                     "
//                   >
//                     {item.description}
//                   </p>
//                 </article>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* =====================================================
//           EDUCATION
//       ===================================================== */}

//       {education.length > 0 && (
//         <section
//           id="education"
//           className="
//             border-y
//             border-[#17211d]/10
//             bg-[#e9eee4]

//             dark:border-white/10
//             dark:bg-[#19211d]
//           "
//         >
//           <div
//             className="
//               mx-auto
//               max-w-7xl
//               px-5
//               py-20
//               sm:px-8
//               lg:px-12
//             "
//           >
//             <div className="grid gap-8 md:grid-cols-3">
//               <div>
//                 <p className="eyebrow">
//                   06 / Education
//                 </p>

//                 <h2
//                   className="
//                     mt-5
//                     font-serif
//                     text-4xl
//                   "
//                 >
//                   Foundations matter.
//                 </h2>
//               </div>

//               {education.map((item) => (
//                 <article
//                   key={item.id}
//                   className="
//                     border-t
//                     border-[#17211d]/15
//                     pt-4

//                     dark:border-white/10
//                   "
//                 >
//                   <h3 className="text-xl font-serif">
//                     {item.degree}
//                   </h3>

//                   <p className="mt-2 text-sm font-bold">
//                     {item.institution}
//                   </p>

//                   <p
//                     className="
//                       mt-1
//                       text-sm
//                       text-[#52605a]

//                       dark:text-[#aab5ad]
//                     "
//                   >
//                     {item.field}
//                     {item.grade
//                       ? ` · ${item.grade}`
//                       : ""}
//                   </p>
//                 </article>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* =====================================================
//           SKILLS
//       ===================================================== */}

//       <section
//         id="skills"
//         className="
//           bg-[#17211d]
//           text-[#f6f6f2]
//           dark:bg-[#0c110e]
//         "
//       >
//         <div
//           className="
//             mx-auto
//             max-w-7xl
//             px-5
//             py-24
//             sm:px-8
//             lg:px-12
//             lg:py-28
//           "
//         >
//           <div
//             className="
//               grid
//               gap-12
//               lg:grid-cols-[.8fr_1.2fr]
//             "
//           >
//             <div>
//               <p
//                 className="
//                   eyebrow
//                   text-[#b6d900]
//                 "
//               >
//                 07 / Working toolkit
//               </p>

//               <h2
//                 className="
//                   section-title
//                   mt-5
//                   text-[#f6f6f2]
//                 "
//               >
//                 The tools behind the outcome.
//               </h2>

//               <p
//                 className="
//                   mt-6
//                   max-w-md
//                   leading-7
//                   text-[#aab5ad]
//                 "
//               >
//                 A practical stack, chosen for the job. No badges for the sake of badges.
//               </p>
//             </div>

//             <div
//               className="
//                 grid
//                 grid-cols-2
//                 gap-x-8
//                 gap-y-8
//                 sm:grid-cols-3
//               "
//             >
//               {skills.map((skill) => (
//                 <div
//                   key={skill.id}
//                   className="
//                     border-t
//                     border-white/15
//                     pt-4
//                   "
//                 >
//                   <p className="text-sm font-bold">
//                     {skill.name}
//                   </p>

//                   <p
//                     className="
//                       mt-2
//                       text-xs
//                       uppercase
//                       tracking-[.14em]
//                       text-[#91aa00]

//                       dark:text-[#b6d900]
//                     "
//                   >
//                     {skill.category}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* =====================================================
//           RESUME
//       ===================================================== */}

//       {activeResume && (
//         <section
//           id="resume"
//           className="
//             border-y
//             border-[#17211d]/10
//             bg-[#e9eee4]

//             dark:border-white/10
//             dark:bg-[#19211d]
//           "
//         >
//           <div
//             className="
//               mx-auto
//               max-w-7xl
//               px-5
//               py-24
//               sm:px-8
//               lg:px-12
//               lg:py-28
//             "
//           >
//             <div
//               className="
//                 grid
//                 gap-8
//                 lg:grid-cols-[.75fr_1.25fr]
//                 lg:items-center
//               "
//             >
//               <div>
//                 <p className="eyebrow">
//                   08 / Resume
//                 </p>

//                 <h2
//                   className="
//                     section-title
//                     mt-5
//                     text-[#17211d]
//                     dark:text-[#f1f4ef]
//                   "
//                 >
//                   A concise snapshot of my experience.
//                 </h2>
//               </div>

//               <div
//                 className="
//                   rounded-3xl
//                   border
//                   border-[#17211d]/10
//                   bg-white/80
//                   p-6
//                   shadow-sm

//                   dark:border-white/10
//                   dark:bg-white/5
//                 "
//               >
//                 <div
//                   className="
//                     flex
//                     flex-col
//                     gap-6
//                     sm:flex-row
//                     sm:items-center
//                     sm:justify-between
//                   "
//                 >
//                   <div>
//                     <p
//                       className="
//                         text-sm
//                         font-bold
//                         uppercase
//                         tracking-[0.16em]
//                         text-[#657b00]

//                         dark:text-[#b6d900]
//                       "
//                     >
//                       Current resume
//                     </p>

//                     <h3 className="mt-2 text-2xl font-serif">
//                       {activeResume.title}
//                     </h3>

//                     {activeResume.summary && (
//                       <p
//                         className="
//                           mt-3
//                           max-w-xl
//                           text-[#52605a]

//                           dark:text-[#aab5ad]
//                         "
//                       >
//                         {activeResume.summary}
//                       </p>
//                     )}
//                   </div>

//                   <div className="flex flex-wrap gap-3">
//                     <a
//                       href={activeResume.file_url}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="
//                         inline-flex
//                         items-center
//                         gap-2
//                         rounded-full
//                         bg-[#17211d]
//                         px-5
//                         py-3
//                         text-sm
//                         font-bold
//                         text-white
//                         transition

//                         hover:bg-[#657b00]

//                         dark:bg-[#f1f4ef]
//                         dark:text-[#17211d]
//                         dark:hover:bg-[#b6d900]
//                       "
//                     >
//                       View resume
//                     </a>

//                     <a
//                       href={activeResume.file_url}
//                       download
//                       className="
//                         inline-flex
//                         items-center
//                         gap-2
//                         rounded-full
//                         border
//                         border-[#17211d]/15
//                         bg-white
//                         px-5
//                         py-3
//                         text-sm
//                         font-bold
//                         transition

//                         hover:border-[#657b00]

//                         dark:border-white/15
//                         dark:bg-white/5
//                         dark:hover:border-[#91aa00]
//                       "
//                     >
//                       Download
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* =====================================================
//           CERTIFICATIONS
//       ===================================================== */}

//       {certifications.length > 0 && (
//         <Certifications certifications={certifications} />
//       )}

//       {/* =====================================================
//           TESTIMONIALS
//       ===================================================== */}

//       {testimonials.length > 0 && (
//         <section
//           id="proof"
//           className="
//             mx-auto
//             max-w-7xl
//             px-5
//             py-24
//             sm:px-8
//             lg:px-12
//             lg:py-32
//           "
//         >
//           <div
//             className="
//               grid
//               gap-12
//               lg:grid-cols-[.7fr_1.3fr]
//             "
//           >
//             <div>
//               <p className="eyebrow">
//                 09 / Proof of work
//               </p>

//               <h2
//                 className="
//                   section-title
//                   mt-5
//                   text-[#17211d]
//                   dark:text-[#f1f4ef]
//                 "
//               >
//                 Good work leaves a trace.
//               </h2>
//             </div>

//             <div className="space-y-6">
//               {testimonials
//                 .slice(0, 2)
//                 .map((item) => (
//                   <blockquote
//                     key={item.id}
//                     className="
//                       border-l-2
//                       border-[#91aa00]
//                       pl-6
//                       text-xl
//                       leading-8

//                       dark:border-[#b6d900]
//                     "
//                   >
//                     “{item.comment}”

//                     <footer
//                       className="
//                         mt-4
//                         text-xs
//                         font-bold
//                         uppercase
//                         tracking-[.14em]
//                         text-[#52605a]

//                         dark:text-[#aab5ad]
//                       "
//                     >
//                       {item.name}

//                       {item.company
//                         ? ` / ${item.company}`
//                         : ""}
//                     </footer>
//                   </blockquote>
//                 ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* =====================================================
//           FINAL CTA
//       ===================================================== */}

//       <section
//         className="
//           bg-[#b6d900]
//           text-[#17211d]

//           dark:bg-[#91aa00]
//         "
//       >
//         <div
//           className="
//             mx-auto
//             flex
//             max-w-7xl
//             flex-col
//             justify-between
//             gap-10
//             px-5
//             py-20
//             sm:px-8
//             lg:flex-row
//             lg:items-end
//             lg:px-12
//             lg:py-28
//           "
//         >
//           <div>
//             <p className="eyebrow text-[#17211d]/70">
//               10 / Start a conversation
//             </p>

//             <h2
//               className="
//                 mt-5
//                 max-w-3xl
//                 font-serif
//                 text-5xl
//                 leading-[.95]
//                 tracking-tighter
//                 sm:text-7xl
//               "
//             >
//               Have a product idea?
//               <br />

//               <em>Let&apos;s build it.</em>
//             </h2>
//           </div>

//           <a
//             href="#contact"
//             className="
//               inline-flex
//               w-fit
//               items-center
//               gap-3
//               rounded-full
//               bg-[#17211d]
//               px-6
//               py-4
//               text-sm
//               font-bold
//               text-white
//               transition-all
//               duration-300
//               hover:bg-[#52605a]
//             "
//           >
//             Let&apos;s discuss your project

//             <ArrowUpRight size={17} />
//           </a>
//         </div>
//       </section>

//       {/* =====================================================
//           FOOTER
//       ===================================================== */}

//       <div
//         className="
//           mx-auto
//           flex
//           max-w-7xl
//           flex-wrap
//           items-center
//           gap-5
//           px-5
//           py-8
//           text-sm
//           text-[#52605a]
//           sm:px-8
//           lg:px-12

//           dark:text-[#aab5ad]
//         "
//       >
//         {/* Location */}

//         <span className="inline-flex items-center gap-2">
//           <MapPin size={15} />

//           {profile.location || "Available remotely"}
//         </span>

//         {/* Email */}

//         {profile.email && (
//           <a
//             href={`mailto:${profile.email}`}
//             className="
//               inline-flex
//               items-center
//               gap-2
//               transition

//               hover:text-[#657b00]

//               dark:hover:text-[#b6d900]
//             "
//           >
//             <Mail size={15} />

//             {profile.email}
//           </a>
//         )}

//         {/* Social Links */}

//         {socialLinks.map((link) => (
//           <a
//             key={link.id}
//             href={link.url}
//             target="_blank"
//             rel="noreferrer"
//             className="
//               transition
//               hover:text-[#657b00]

//               dark:hover:text-[#b6d900]
//             "
//           >
//             {link.label || link.platform}
//           </a>
//         ))}

//         {/* Professional Title */}

//         <span
//           className="
//             ml-auto
//             inline-flex
//             items-center
//             gap-2
//           "
//         >
//           <Code2 size={15} />

//           {siteSettings?.professional_title ||
//             profile.title}
//         </span>

//         {/* Copyright */}

//         <span
//           className="
//             w-full
//             border-t
//             border-[#17211d]/10
//             pt-5

//             dark:border-white/10
//           "
//         >
//           {siteSettings?.footer_text ||
//             siteSettings?.copyright_text ||
//             `© ${new Date().getFullYear()} ${siteSettings?.site_name ||
//             profile.name
//             }`}
//         </span>
//       </div>
//     </div>
//   );
// }