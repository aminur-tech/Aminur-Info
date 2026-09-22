"use client";

import React from "react";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  MessageCircle,
} from "lucide-react";

import type {
  Profile,
  SiteSettingsContent,
} from "../../types/portfolio";

type Props = {
  profile: Profile;
  siteSettings: SiteSettingsContent | null;
};

const Footer = ({
  profile,
  siteSettings,
}: Props) => {
  const currentYear = new Date().getFullYear();

  const siteName =
    siteSettings?.site_name ||
    profile.name ||
    "Portfolio";

  const professionalTitle =
    siteSettings?.professional_title ||
    profile.title ||
    "Full-stack developer";

  const footerText =
    siteSettings?.footer_text ||
    "Building thoughtful digital experiences with modern technology.";

  const copyrightText =
    siteSettings?.copyright_text ||
    `© ${currentYear} ${siteName}. All rights reserved.`;

  /*
   * Static professional connections.
   * Replace the WhatsApp placeholder with your own number.
   */
  const connectLinks = [
    {
      label: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/aminur-tech",
    },
    {
      label: "GitHub",
      icon: Github,
      url: "https://github.com/aminur-tech",
    },
    {
      label: "WhatsApp",
      icon: MessageCircle,
      url: "https://wa.me/+8801327694078",
    },
  ]

  return (
    <footer className="border-t border-[#17211d]/10 dark:border-[#f1f4ef]/10">
      <div className="mx-auto max-w-7xl px-2 py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Brand */}
          <div>
            <a
              href="#hero"
              className="group inline-flex items-center gap-3"
            >
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#b6d900] text-sm font-black text-[#17211d] dark:bg-[#91aa00]"
              >
                {profile.name?.charAt(0) || "A"}
              </span>

              <div>
                <span className="block text-base font-bold tracking-tight">
                  {siteName}
                </span>

                <span className="mt-0.5 block text-xs opacity-50">
                  {professionalTitle}
                </span>
              </div>
            </a>

            <p className="mt-6 max-w-md text-sm leading-6 text-[#17211d]/60 dark:text-[#f1f4ef]/60">
              {footerText}
            </p>

            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-60"
              >
                {profile.email}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>

          {/* Static Connections */}
          <div className="lg:ml-auto lg:w-full lg:max-w-sm">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] opacity-40">
              Connect
            </p>

            <div className="grid gap-2 sm:grid-cols-2">
              {connectLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <a
                    key={link.label}
                    href={link.url}
                    target={
                      link.url.startsWith("mailto:")
                        ? undefined
                        : "_blank"
                    }
                    rel={
                      link.url.startsWith("mailto:")
                        ? undefined
                        : "noreferrer"
                    }
                    className="group flex items-center justify-between rounded-xl border border-[#17211d]/10 px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#17211d] hover:text-[#f6f6f2] dark:border-[#f1f4ef]/10 dark:hover:bg-[#f1f4ef] dark:hover:text-[#101613]"
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />

                      <span className="text-sm font-medium">
                        {link.label}
                      </span>
                    </span>

                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-4 border-t border-[#17211d]/10 pt-6 sm:flex-row sm:items-center sm:justify-between dark:border-[#f1f4ef]/10">
          <p className="text-xs leading-5 opacity-45">
            {copyrightText}
          </p>

          <a
            href="#hero"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] opacity-50 transition-opacity hover:opacity-100"
          >
            Back to top

            <ArrowUpRight className="h-3.5 w-3.5 -rotate-45" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
